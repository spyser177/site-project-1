"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  panelPath: string;
}

/** Форма входа в админ-панель */
export function LoginForm({ panelPath }: LoginFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.get("username"),
          password: data.get("password"),
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Ошибка входа");
        setStatus("error");
        return;
      }

      router.push(panelPath);
      router.refresh();
    } catch {
      setError("Не удалось связаться с сервером. Попробуйте позже.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm p-8">
        <h1 className="font-serif text-2xl font-semibold text-[var(--color-primary)] mb-1">
          Админ-панель
        </h1>
        <p className="text-sm text-[var(--color-muted)] mb-6">Вход для редакции</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1.5">
              Логин
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1.5">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-[var(--color-danger)]">{error}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-[var(--color-primary)] text-white py-2.5 text-sm font-medium hover:bg-[var(--color-primary-dark)] disabled:opacity-50 transition-colors"
          >
            {status === "loading" ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
