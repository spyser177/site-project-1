"use client";

import { useEffect, useState } from "react";

const ICONS = [
  "molecule",
  "calendar",
  "shield",
  "pulse",
  "check",
  "list",
  "chart",
  "chat",
  "clipboard",
  "help",
  "clock",
  "pill",
  "flask",
  "heart",
] as const;

interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  metaTitle: string | null;
  metaDescription: string | null;
  description: string;
  content: string;
  imageUrl: string | null;
  icon: string;
  keywords: string[];
  published: boolean;
  createdAt: string;
}

const emptyForm = {
  slug: "",
  title: "",
  metaTitle: "",
  metaDescription: "",
  description: "",
  content: "",
  imageUrl: "",
  icon: "molecule",
  keywords: "",
  published: false,
};

/** Управление дополнительными статьями (создание/редактирование/удаление) */
export function ArticlesManager() {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/articles");
      if (res.ok) {
        const json = await res.json();
        setArticles(json.articles ?? []);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(article: ArticleRow) {
    setEditingId(article.id);
    setForm({
      slug: article.slug,
      title: article.title,
      metaTitle: article.metaTitle ?? "",
      metaDescription: article.metaDescription ?? "",
      description: article.description,
      content: article.content,
      imageUrl: article.imageUrl ?? "",
      icon: article.icon ?? "molecule",
      keywords: (article.keywords ?? []).join(", "),
      published: article.published,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        title: form.title,
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        description: form.description,
        content: form.content,
        imageUrl: form.imageUrl,
        icon: form.icon,
        keywords: form.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
        published: form.published,
      };
      const res = editingId
        ? await fetch(`/api/admin/articles/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/articles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...payload, slug: form.slug }),
          });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Ошибка сохранения");
        return;
      }

      resetForm();
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Удалить статью?")) return;
    await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    await load();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const json = await res.json();

      if (!res.ok) {
        setUploadError(json.error || "Ошибка загрузки файла");
        return;
      }

      setForm((prev) => ({ ...prev, imageUrl: json.url }));
    } catch {
      setUploadError("Не удалось загрузить файл. Проверьте соединение.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <h2 className="font-semibold text-[var(--color-primary)] mb-4">
          {editingId ? "Редактирование статьи" : "Новая статья"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 bg-white rounded-2xl border border-[var(--color-border)] p-5">
          {!editingId && (
            <input
              placeholder="slug (латиница, дефисы)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
            />
          )}
          <input
            placeholder="Заголовок"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
          />
          <textarea
            placeholder="Краткое описание"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
          />
          <textarea
            placeholder="Текст статьи — поддерживается простая разметка: ## заголовок H2, ### H3, строки с «- » для списка, «> » для цитаты/врезки, «Q: »/«A: » для пар вопрос-ответ (FAQ). Абзацы разделяйте пустой строкой."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={10}
            className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm font-mono"
          />
          <input
            placeholder="SEO: meta title (необязательно, иначе используется заголовок)"
            value={form.metaTitle}
            onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
          />
          <textarea
            placeholder="SEO: meta description (необязательно, иначе используется краткое описание)"
            value={form.metaDescription}
            onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
            >
              {ICONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
            <input
              placeholder="Ключевые слова, через запятую"
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
            />
          </div>
          <input
            placeholder="URL изображения (необязательно)"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
          />
          <div>
            <label className="inline-flex items-center gap-2 text-xs text-[var(--color-primary)] cursor-pointer hover:underline">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
              {uploading ? "Загрузка в S3..." : "Загрузить изображение в S3"}
            </label>
            {uploadError && (
              <p className="text-xs text-[var(--color-danger)] mt-1">{uploadError}</p>
            )}
            {form.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.imageUrl}
                alt="Превью"
                className="mt-2 h-20 w-32 object-cover rounded-lg border border-[var(--color-border)]"
              />
            )}
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Опубликована
          </label>

          {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-full bg-[var(--color-primary)] text-white text-sm font-medium disabled:opacity-50"
            >
              {saving ? "Сохранение..." : editingId ? "Сохранить" : "Создать"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="px-4 py-2 rounded-full border border-[var(--color-border)] text-sm">
                Отмена
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="font-semibold text-[var(--color-primary)] mb-4">Список статей</h2>
        {loading ? (
          <p className="text-sm text-[var(--color-muted)]">Загрузка...</p>
        ) : articles.length === 0 ? (
          <p className="text-sm text-[var(--color-muted)]">
            Пока нет дополнительных статей, либо БД недоступна в этой среде.
          </p>
        ) : (
          <ul className="space-y-2">
            {articles.map((a) => (
              <li key={a.id} className="bg-white rounded-xl border border-[var(--color-border)] p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{a.title}</p>
                  <p className="text-xs text-[var(--color-muted)]">
                    /{a.slug} · {a.published ? "опубликована" : "черновик"}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => startEdit(a)} className="text-xs text-[var(--color-primary)] hover:underline">
                    Изменить
                  </button>
                  <button onClick={() => handleDelete(a.id)} className="text-xs text-[var(--color-danger)] hover:underline">
                    Удалить
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
