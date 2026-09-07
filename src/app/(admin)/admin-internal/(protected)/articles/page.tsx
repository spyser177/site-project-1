import { ArticlesManager } from "@/components/admin/ArticlesManager";

export default function AdminArticlesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--color-primary)] mb-6">Статьи</h1>
      <ArticlesManager />
    </div>
  );
}
