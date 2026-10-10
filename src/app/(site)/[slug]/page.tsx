import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SerializedEditorState } from "lexical";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { RichText } from "@/components/RichText";
import { getPayloadClient } from "@/lib/payload";
import { getMediaUrl } from "@/lib/media";

/**
 * Универсальный шаблон для НОВЫХ страниц, созданных в Payload (коллекция
 * Pages) без выделенного маршрута в приложении.
 *
 * Next.js отдаёт приоритет статическим сегментам маршрута (/o-nas,
 * /kontakty, /privacy-policy, /stati и т.д.) перед этим динамическим
 * [slug] — поэтому страницы с собственным кастомным дизайном продолжают
 * обслуживаться своими файлами, а здесь рендерятся только остальные
 * записи Pages, у которых нет отдельного шаблона.
 */

// Контент редактируется из админ-панели, поэтому страница рендерится
// динамически на каждый запрос.
export const dynamic = "force-dynamic";

interface PageDoc {
  title?: string | null;
  subtitle?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  content?: SerializedEditorState | null;
  image?: { url?: string | null } | number | string | null;
}

interface PagePageProps {
  params: Promise<{ slug: string }>;
}

async function findPage(slug: string): Promise<PageDoc | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return (result.docs[0] as PageDoc) ?? null;
}

export async function generateMetadata({ params }: PagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await findPage(slug);
  if (!page) return {};

  return {
    title: page.metaTitle || page.title || undefined,
    description: page.metaDescription || undefined,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function GenericPage({ params }: PagePageProps) {
  const { slug } = await params;
  const page = await findPage(slug);
  if (!page) notFound();

  const imageUrl = getMediaUrl(page.image ?? null);

  return (
    <>
      <Section animate={false} className="pt-14 sm:pt-20">
        <SectionHeading
          as="h1"
          title={page.title ?? ""}
          description={page.subtitle ?? undefined}
        />
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="" className="mt-8 w-full rounded-2xl object-cover max-h-96" />
        )}
      </Section>

      {page.content && (
        <Section animate={false} className="pt-0">
          <div className="max-w-3xl">
            <RichText data={page.content} />
          </div>
        </Section>
      )}
    </>
  );
}
