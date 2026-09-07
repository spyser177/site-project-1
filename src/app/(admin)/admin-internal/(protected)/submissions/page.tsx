import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getSubmissions() {
  try {
    return await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
  } catch {
    return [];
  }
}

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--color-primary)] mb-6">Заявки</h1>

      {submissions.length === 0 ? (
        <p className="text-sm text-[var(--color-muted)]">
          Заявок пока нет, либо соединение с базой данных недоступно в этой среде.
        </p>
      ) : (
        <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left text-[var(--color-muted)]">
                <th className="px-4 py-3">Дата</th>
                <th className="px-4 py-3">Имя</th>
                <th className="px-4 py-3">Телефон</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Сообщение</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="px-4 py-3 whitespace-nowrap text-[var(--color-muted)]">
                    {s.createdAt.toLocaleDateString("ru-RU")}
                  </td>
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3">{s.phone}</td>
                  <td className="px-4 py-3">{s.email}</td>
                  <td className="px-4 py-3 max-w-xs truncate" title={s.message}>
                    {s.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
