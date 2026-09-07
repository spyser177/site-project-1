"use client";

import { useEffect, useState } from "react";

const fields: { key: string; label: string; fallback: string; multiline?: boolean }[] = [
  {
    key: "hero_title",
    label: "Заголовок главной страницы (H1)",
    fallback: "Медикаментозное прерывание беременности",
  },
  {
    key: "hero_subtitle",
    label: "Подзаголовок главной страницы",
    fallback:
      "Мифепристон и мизопростол — препараты для прерывания беременности на ранних сроках.",
    multiline: true,
  },
];

/** Редактирование текстовых настроек сайта (SiteSetting) */
export function SettingsManager() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((json) => setValues(json.settings ?? {}))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(key: string) {
    setSavingKey(key);
    setSavedKey(null);
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: values[key] ?? "" }),
      });
      setSavedKey(key);
    } finally {
      setSavingKey(null);
    }
  }

  if (loading) {
    return <p className="text-sm text-[var(--color-muted)]">Загрузка...</p>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {fields.map((field) => (
        <div key={field.key} className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
          <label className="block text-sm font-medium mb-2">{field.label}</label>
          {field.multiline ? (
            <textarea
              rows={3}
              value={values[field.key] ?? field.fallback}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
            />
          ) : (
            <input
              value={values[field.key] ?? field.fallback}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
            />
          )}
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => handleSave(field.key)}
              disabled={savingKey === field.key}
              className="px-4 py-2 rounded-full bg-[var(--color-primary)] text-white text-sm font-medium disabled:opacity-50"
            >
              {savingKey === field.key ? "Сохранение..." : "Сохранить"}
            </button>
            {savedKey === field.key && (
              <span className="text-xs text-[var(--color-success)]">Сохранено</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
