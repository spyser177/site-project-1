import { getPayload, type BasePayload } from "payload";
import config from "@payload-config";

/**
 * Единый кэшированный клиент Payload Local API.
 *
 * Local API обращается к БД напрямую (минуя HTTP/REST), поэтому его можно
 * безопасно использовать в серверных компонентах Next.js (RSC) для чтения
 * контента из админки — глобалов (Header/Footer/SiteSettings/HomePage) и
 * коллекций (Articles, Pages, Media).
 *
 * Промис инициализации кэшируется на уровне модуля, чтобы при повторных
 * запросах (в рамках одного процесса Node) не создавать новое подключение.
 */
let cached: Promise<BasePayload> | null = null;

export function getPayloadClient(): Promise<BasePayload> {
  if (!cached) {
    cached = getPayload({ config });
  }
  return cached;
}
