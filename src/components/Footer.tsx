import Link from "next/link";
import { Icon } from "./Icon";
import { siteConfig, phoneHref } from "@/lib/config";

/** Футер сайта: контакты, навигация, реквизиты компании-заглушки */
export function Footer() {
  return (
    <footer className="bg-[var(--color-primary-dark)] text-white mt-auto">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-serif text-lg font-semibold mb-3">
              Мед<span className="text-[var(--color-accent-light)]">Информ</span>
            </p>
            <p className="text-sm text-white/70 leading-relaxed">
              Информационный портал о медикаментозном прерывании беременности:
              мифепристон, мизопростол, подготовка и восстановление.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-4">
              Навигация
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/" className="hover:text-white">Главная</Link></li>
              <li><Link href="/stati" className="hover:text-white">Статьи</Link></li>
              <li><Link href="/o-nas" className="hover:text-white">О нас</Link></li>
              <li><Link href="/kontakty" className="hover:text-white">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-4">
              Контакты
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a href={phoneHref()} className="flex items-center gap-2 hover:text-white" data-ym-goal="phone_click">
                  <Icon name="phone" className="w-4 h-4" /> {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-white" data-ym-goal="email_click">
                  <Icon name="mail" className="w-4 h-4" /> {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-4">
              Мы в сети
            </h3>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="p-2.5 rounded-full bg-[#26A5E4] hover:opacity-85 transition-opacity"
                data-ym-goal="telegram_click"
              >
                <Icon name="telegram" className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2.5 rounded-full bg-[#25D366] hover:opacity-85 transition-opacity"
                data-ym-goal="whatsapp_click"
              >
                <Icon name="whatsapp" className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email"
                className="p-2.5 rounded-full bg-[#EA4335] hover:opacity-85 transition-opacity"
                data-ym-goal="email_click"
              >
                <Icon name="mail" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. Информационный портал.</p>
          <Link href="/privacy-policy" className="hover:text-white/80 underline underline-offset-2">
            Политика обработки персональных данных
          </Link>
        </div>
        <p className="text-xs text-white/40 mt-3 max-w-3xl">
          Материалы сайта носят общеинформационный характер и не являются публичной офертой
          или медицинской консультацией. Перед принятием решений рекомендуется очная
          консультация специалиста.
        </p>
      </div>
    </footer>
  );
}
