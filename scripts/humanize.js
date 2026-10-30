/**
 * Humanize script: removes AI-sounding phrasing, em-dashes, promo/clickbait language
 * from Lexical JSON content stored in Payload CMS (articles, pages tables).
 *
 * Runs against Postgres via DATABASE_URL. Only touches "text" fields inside
 * Lexical nodes (paragraph/heading/listitem/quote children). Link nodes and
 * link text are left untouched. Numbers, drug names and dates are preserved
 * (replacements are phrase-based, not digit-based).
 *
 * Usage: node humanize.js [--dry-run]
 */

const { Client } = require("pg");

const DRY_RUN = process.argv.includes("--dry-run");

// ---- Replacement rules -----------------------------------------------

// Phrase/word level replacements, safe for RU medical text. (word/phrase -> replacement), case-preserving not needed much in RU medical texts
const SIMPLE_REPLACEMENTS = [
  [/инновационн(ый|ая|ое|ые)/gi, (m, p1) => "нов" + p1],
  [/уникальн(ый|ая|ое|ые)/gi, (m, p1) => "особенн" + p1],
  [/революционн(ый|ая|ое|ые)/gi, (m, p1) => "нов" + p1],
  [/является одним из ключевых факторов/gi, "сильно влияет"],
  [/один из ключевых факторов/gi, "фактор, который сильно влияет"],
  [/ключев(ой|ая|ое|ые)\s+фактор(ы|ов)?/gi, "важн$1 фактор$2"],
  [/важнейш(ий|ая|ее|ие)/gi, (m, p1) => "важн" + p1],
  [/\bв рамках\b/gi, "в ходе"],
  [/,?\s*стоит отметить,?\s*что\s*/gi, ", "],
  [/,?\s*следует отметить,?\s*что\s*/gi, ", "],
  [/,?\s*необходимо отметить,?\s*что\s*/gi, ", "],
  [/,?\s*важно понимать,?\s*что\s*/gi, ", "],
  [/,?\s*важно помнить,?\s*что\s*/gi, ", "],
  [/,?\s*важно знать,?\s*что\s*/gi, ", "],
  [/полное излечение/gi, "улучшение состояния"],
  [/навсегда забудете о болезни/gi, "почувствуете улучшение"],
  [/забудете о болезни/gi, "почувствуете улучшение"],
  [/проконсультируйтесь с врачом\.?/gi, "обратитесь к врачу."],
  [/обязательно проконсультируйтесь со специалистом\.?/gi, "обратитесь к специалисту."],
];

// Deepричастные обороты-пустышки — удаляем вместе с запятой перед ними
const PARTICIPLE_FILLERS = [
  /,\s*свидетельству(я|ющий|ющая|ющее|ющие)[^,.;]*/gi,
  /,\s*обеспечива(я|ющий|ющая|ющее|ющие)[^,.;]*/gi,
  /,\s*подчёркива(я|ющий|ющая|ющее|ющие)[^,.;]*/gi,
  /,\s*гаранти(руя|рующий|рующая|рующее|рующие)[^,.;]*/gi,
];

// Fancy quotes -> remove/normalize (keep meaning, avoid breaking markup)
function normalizeQuotesAndEmoji(text) {
  // Remove emoji (basic ranges)
  text = text.replace(
    /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/gu,
    ""
  );
  return text;
}

// Replace em-dash (—) with hyphen (-) or restructure lightly.
// Rule: keep "—" only in short standalone summary clauses (very rare here),
// otherwise convert "X — Y" to "X - Y" (with regular spaces) which is the
// safe, non-breaking approach requested when full restructuring is risky.
function replaceEmDash(text) {
  // En-dash and em-dash both get normalized to a short hyphen.
  // Keep a space on each side ("X - Y") so words don't glue together;
  // numeric ranges ("1–2") are fixed back to a tight hyphen afterwards.
  return text.replace(/\s*[\u2014\u2013]\s*/g, " - ");
}

function fixNumericRanges(text) {
  // "1-2" ranges should have no spaces: convert "1 - 2" -> "1-2" if produced by replaceEmDash
  return text.replace(/(\d)\s*-\s*(\d)/g, "$1-$2");
}

function applyPhraseRules(text) {
  let out = text;
  for (const [re, rep] of SIMPLE_REPLACEMENTS) {
    out = out.replace(re, rep);
  }
  for (const re of PARTICIPLE_FILLERS) {
    out = out.replace(re, "");
  }
  return out;
}

function cleanupSpacing(text) {
  return text
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .trim();
}

function humanizeText(text) {
  if (!text || typeof text !== "string") return text;
  let out = text;
  out = normalizeQuotesAndEmoji(out);
  out = applyPhraseRules(out);
  out = replaceEmDash(out);
  out = fixNumericRanges(out);
  out = cleanupSpacing(out);
  return out;
}

// Title Case -> sentence case for headings (h1/h2/h3), RU text rarely has
// Title Case but keep this safe no-op guard for Latin headings if any.
function fixHeadingCase(text) {
  // Only acts if text looks like ALL-WORDS-CAPITALIZED Latin title case.
  const words = text.trim().split(/\s+/);
  const isLatinTitleCase =
    words.length > 2 &&
    words.every((w) => /^[A-ZА-Я]/.test(w)) &&
    /[a-zA-Z]/.test(text);
  if (isLatinTitleCase) {
    return text[0] + text.slice(1).toLowerCase();
  }
  return text;
}

// ---- Lexical tree walker ------------------------------------------------

let changesCount = 0;

function walkNode(node, parentType) {
  if (!node || typeof node !== "object") return;

  if (Array.isArray(node)) {
    node.forEach((n) => walkNode(n, parentType));
    return;
  }

  // Never descend into link nodes' structure differently - but we DO need to
  // skip modifying text that is the anchor text of a link, per instructions
  // ("не трогает узлы-ссылки"). So if this node is a link, skip its children entirely.
  if (node.type === "link") {
    return;
  }

  const isHeading = node.type === "heading";

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      if (child && child.type === "text" && typeof child.text === "string") {
        const before = child.text;
        let after = humanizeText(before);
        if (isHeading) {
          after = fixHeadingCase(after);
        }
        if (after !== before) {
          changesCount++;
          child.text = after;
        }
      } else {
        walkNode(child, node.type);
      }
    }
  }

  // also walk any other nested structures just in case (defensive)
  for (const key of Object.keys(node)) {
    if (key === "children") continue;
    const val = node[key];
    if (val && typeof val === "object") {
      walkNode(val, node.type);
    }
  }
}

function humanizeContent(content) {
  if (!content || typeof content !== "object") return content;
  const clone = JSON.parse(JSON.stringify(content));
  if (clone.root) {
    walkNode(clone.root, "root");
  }
  return clone;
}

function diffPairs(before, after) {
  // Walk both trees in lockstep collecting text node pairs that changed.
  const pairs = [];
  function walk(a, b) {
    if (!a || !b || typeof a !== "object" || typeof b !== "object") return;
    if (Array.isArray(a)) {
      for (let i = 0; i < a.length; i++) walk(a[i], b[i]);
      return;
    }
    if (a.type === "link") return;
    if (Array.isArray(a.children) && Array.isArray(b.children)) {
      for (let i = 0; i < a.children.length; i++) {
        const ca = a.children[i];
        const cb = b.children[i];
        if (ca && ca.type === "text" && cb && cb.type === "text") {
          if (ca.text !== cb.text) pairs.push({ before: ca.text, after: cb.text });
        } else {
          walk(ca, cb);
        }
      }
    }
  }
  walk(before.root, after.root);
  return pairs;
}

// ---- Main ---------------------------------------------------------------

const DIFF_ARG = process.argv.find((a) => a.startsWith("--diff="));

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  if (DIFF_ARG) {
    const slug = DIFF_ARG.slice("--diff=".length);
    let res = await client.query("SELECT content FROM articles WHERE slug=$1", [slug]);
    if (res.rows.length === 0) {
      res = await client.query("SELECT content FROM pages WHERE slug=$1", [slug]);
    }
    if (res.rows.length === 0) {
      console.log("NOT FOUND:", slug);
    } else {
      const original = res.rows[0].content;
      const updated = humanizeContent(original);
      const pairs = diffPairs(original, updated);
      for (const p of pairs) {
        console.log("--- BEFORE ---\n" + p.before);
        console.log("--- AFTER  ---\n" + p.after);
        console.log("");
      }
      console.log(`${pairs.length} text node(s) changed.`);
    }
    await client.end();
    return;
  }

  const tables = ["articles", "pages"];
  const summary = [];

  for (const table of tables) {
    const { rows } = await client.query(
      `SELECT id, slug, content FROM ${table} ORDER BY id`
    );
    for (const row of rows) {
      changesCount = 0;
      const original = row.content;
      if (!original) continue;
      const updated = humanizeContent(original);
      const changed = changesCount > 0;
      if (changed) {
        summary.push({
          table,
          id: row.id,
          slug: row.slug,
          textNodesChanged: changesCount,
        });
        if (!DRY_RUN) {
          await client.query(`UPDATE ${table} SET content = $1 WHERE id = $2`, [
            JSON.stringify(updated),
            row.id,
          ]);
        }
      }
    }
  }

  await client.end();

  console.log(JSON.stringify({ dryRun: DRY_RUN, summary }, null, 2));
  console.log(
    `\nTotal rows changed: ${summary.length} (${summary
      .filter((s) => s.table === "articles").length} articles, ${summary
      .filter((s) => s.table === "pages").length} pages)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
