import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma Client — предотвращает создание множества соединений
 * при hot-reload в режиме разработки Next.js.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
