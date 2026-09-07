import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123456!";

  const existingAdmin = await prisma.admin.findUnique({ where: { username: adminUsername } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.admin.create({ data: { username: adminUsername, passwordHash } });
    console.log(`✔ Создан администратор "${adminUsername}"`);
  } else {
    console.log(`ℹ Администратор "${adminUsername}" уже существует`);
  }

  const defaultSettings: Record<string, string> = {
    hero_title: "Медикаментозное прерывание беременности",
    hero_subtitle:
      "Мифепристон и мизопростол — препараты для прерывания беременности на ранних сроках. Рассказываем, как действует медикаментозный аборт, какова его эффективность и что важно знать перед началом процесса.",
  };

  for (const [key, value] of Object.entries(defaultSettings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }
  console.log("✔ Настройки по умолчанию проверены/созданы");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
