"use client";

import { useEffect, useState } from "react";

interface PageRow {
  id: string | null;
  slug: string;
  title: string | null;
  description: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  content: string;
  updatedAt: string | null;
}

const PAGE_LABELS: Record<string, string> = {
  home: "Главная (доп. блок)",
  "o-nas": "О нас",
  kontakty: "Контакты",
  "privacy-policy": "Политика конфиденциальности",
};

type FormState = {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
};

function toForm(page: PageRow): FormState {
  return {
    title: page.title ?? "",
    description: page.description ?? "",
    metaTitle: page.metaTitle ?? "",
    metaDescription: page.metaDescription ?? "",
    content: page.content ?? "",
  };
}

/** Редактирование контента статичных страниц сайта (Page) */
export function PagesManager() {
  const [pages, setPages] = useState<PageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [forms, setForms] = useState<Record<string, FormState>>({});
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const [errorSlug, setErrorSlug] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((res) => res.json())
      .then((json) => {
        const list: PageRow[] = json.pages ?? [];
        setPages(list);
        setForms(Object.fromEntries(list.map((p) => [p.slug, toForm(p)])));
        if (list.length > 0) setActiveSlug(list[0].slug);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(slug: string) {
    setSavingSlug(slug);
    setSavedSlug(null);
    setErrorSlug(null);
    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forms[slug]),
      });
      if (!res.ok) {
        setErrorSlug(slug);
        return;
      }
      setSavedSlug(slug);
    } catch {
      setErrorSlug(slug);
    } finally {
      setSavingSlug(null);
    }
  }

  if (loading) {
    return <p className="text-sm text-[var(--color-muted)]">Загрузка...</p>;
  }

  if (pages.length === 0) {
    return (
      <p className="text-sm text-[var(--color-muted)]">
        Страницы не найдены, либо БД недоступна в этой среде.
      </p>
    );
  }

  const active = activeSlug ? forms[activeSlug] : undefined;

  return (
    <div className="grid lg:grid-cols-[200px_1fr] gap-6">
      <nav className="space-y-1">
        {pages.map((p) => (
          <button
            key={p.slug}
            onClick={() => setActiveSlug(p.slug)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSlug === p.slug
                ? "bg-[var(--color-primary)] text-white"
                : "hover:bg-[var(--color-surface-muted)] text-[var(--color-text)]"
            }`}
          >
            {PAGE_LABELS[p.slug] ?? p.slug}
          </button>
        ))}
      </nav>

      {activeSlug && active && (
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 space-y-3 max-w-2xl">
          <h2 className="font-semibold text-[var(--color-primary)]">
            {PAGE_LABELS[activeSlug] ?? activeSlug}
          </h2>

          {activeSlug !== "home" && (
            <>
              <label className="block text-sm font-medium">
                Заголовок (H1)
                <input
                  value={active.title}
                  onChange={(e) =>
                    setForms((prev) => ({ ...prev, [activeSlug]: { ...prev[activeSlug], title: e.target.value } }))
                  }
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm font-normal"
                />
              </label>
              <label className="block text-sm font-medium">
                Подзаголовок (под H1)
                <textarea
                  value={active.description}
                  onChange={(e) =>
                    setForms((prev) => ({
                      ...prev,
                      [activeSlug]: { ...prev[activeSlug], description: e.target.value },
                    }))
                  }
                  rows={2}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm font-normal"
                />
              </label>
              <label className="block text-sm font-medium">
                SEO: meta title
                <input
                  value={active.metaTitle}
                  onChange={(e) =>
                    setForms((prev) => ({
                      ...prev,
                      [activeSlug]: { ...prev[activeSlug], metaTitle: e.target.value },
                    }))
                  }
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm font-normal"
                />
              </label>
              <label className="block text-sm font-medium">
                SEO: meta description
                <textarea
                  value={active.metaDescription}
                  onChange={(e) =>
                    setForms((prev) => ({
                      ...prev,
                      [activeSlug]: { ...prev[activeSlug], metaDescription: e.target.value },
                    }))
                  }
                  rows={2}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm font-normal"
                />
              </label>
            </>
          )}

          <label className="block text-sm font-medium">
            Текст страницы
            <p className="text-xs text-[var(--color-muted)] font-normal mb-1">
              Простая разметка: ## заголовок H2, ### H3, строки с «- » для списка,
              «&gt; » для цитаты/врезки. Абзацы разделяйте пустой строкой.
            </p>
            <textarea
              value={active.content}
              onChange={(e) =>
                setForms((prev) => ({ ...prev, [activeSlug]: { ...prev[activeSlug], content: e.target.value } }))
              }
              rows={14}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm font-mono"
            />
          </label>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSave(activeSlug)}
              disabled={savingSlug === activeSlug}
              className="px-4 py-2 rounded-full bg-[var(--color-primary)] text-white text-sm font-medium disabled:opacity-50"
            >
              {savingSlug === activeSlug ? "Сохранение..." : "Сохранить"}
            </button>
            {savedSlug === activeSlug && (
              <span className="text-xs text-[var(--color-success)]">Сохранено</span>
            )}
            {errorSlug === activeSlug && (
              <span className="text-xs text-red-600">
                Ошибка сохранения. Попробуйте снова или войдите заново.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
