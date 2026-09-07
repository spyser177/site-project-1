"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";

/** Контактная форма с honeypot-защитой и клиентской валидацией */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error || "Ошибка отправки. Попробуйте позже.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();

      if (typeof window !== "undefined" && "ym" in window) {
        (window as unknown as { ym: (...args: unknown[]) => void }).ym(
          undefined,
          "reachGoal",
          "contact_form_submit"
        );
      }
    } catch {
      setErrorMsg("Не удалось отправить форму. Проверьте соединение и попробуйте снова.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] p-8 text-center">
        <Icon name="check" className="w-10 h-10 mx-auto text-[var(--color-success)] mb-3" />
        <p className="font-semibold text-[var(--color-primary)]">Заявка отправлена</p>
        <p className="text-sm text-[var(--color-muted)] mt-1">
          Мы свяжемся с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot-поле — скрыто визуально и от скринридеров, боты его заполняют */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-[var(--color-text)]">
          Имя *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={100}
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1.5 text-[var(--color-text)]">
          Телефон *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          maxLength={30}
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-[var(--color-text)]">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          maxLength={150}
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-[var(--color-text)]">
          Сообщение *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          maxLength={2000}
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none resize-none text-sm"
        />
      </div>

      {status === "error" && (
        <p className="text-[var(--color-danger)] text-sm">{errorMsg}</p>
      )}

      <Button type="submit" variant="accent" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Отправка..." : "Отправить"}
      </Button>

      <p className="text-xs text-[var(--color-muted)]">
        Отправляя форму, вы соглашаетесь на обработку персональных данных для связи с вами.
      </p>
    </form>
  );
}
