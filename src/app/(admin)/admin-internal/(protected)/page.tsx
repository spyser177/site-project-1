import { prisma } from "@/lib/prisma";

async function getCounts() {
  try {
    const [submissions, articles, newSubmissions] = await Promise.all([
      prisma.contactSubmission.count(),
      prisma.article.count(),
      prisma.contactSubmission.count({
        where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      }),
    ]);
    return { submissions, articles, newSubmissions };
  } catch {
    return { submissions: 0, articles: 0, newSubmissions: 0 };
  }
}

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--color-primary)] mb-6">Дашборд</h1>
      <div className="grid sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
          <p className="text-sm text-[var(--color-muted)]">Всего заявок</p>
          <p className="text-3xl font-semibold text-[var(--color-primary)] mt-1">
            {counts.submissions}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
          <p className="text-sm text-[var(--color-muted)]">Заявок за 7 дней</p>
          <p className="text-3xl font-semibold text-[var(--color-primary)] mt-1">
            {counts.newSubmissions}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
          <p className="text-sm text-[var(--color-muted)]">Дополнительных статей в БД</p>
          <p className="text-3xl font-semibold text-[var(--color-primary)] mt-1">
            {counts.articles}
          </p>
        </div>
      </div>
      <p className="text-xs text-[var(--color-muted)] mt-6 max-w-xl">
        10 основных статей раздела «Статьи» подготовлены редакцией и хранятся в коде
        проекта для гарантии качества SEO. Раздел «Статьи» в админ-панели управляет
        дополнительными материалами.
      </p>
    </div>
  );
}
