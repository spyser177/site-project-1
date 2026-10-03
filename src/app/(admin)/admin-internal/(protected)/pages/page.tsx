import { PagesManager } from "@/components/admin/PagesManager";

export default function AdminPagesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--color-primary)] mb-6">Страницы</h1>
      <PagesManager />
    </div>
  );
}
