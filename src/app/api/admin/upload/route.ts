import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { uploadImageToS3 } from "@/lib/s3";

export async function POST(request: NextRequest) {
  const check = await requireAdmin(request, "upload");
  if ("response" in check) return check.response;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Файл не найден в запросе" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadImageToS3(buffer, file.type, file.name);
    return NextResponse.json({ url: result.url, key: result.key });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ошибка загрузки файла";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
