import { env } from "cloudflare:workers";
import { isAdminRequest } from "@/lib/admin-auth";

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function safeFilename(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 90);
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return Response.json({ error: "Acesso não autorizado." }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("photo");
    const title = String(formData.get("title") ?? "").trim();
    const year = String(formData.get("year") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const caption = String(formData.get("caption") ?? "").trim();

    if (!(file instanceof File) || !ACCEPTED_IMAGE_TYPES.has(file.type)) {
      return Response.json({ error: "Selecione uma imagem JPG, PNG ou WebP válida." }, { status: 400 });
    }
    if (!title) {
      return Response.json({ error: "Informe um título para a fotografia." }, { status: 400 });
    }
    if (file.size > MAX_IMAGE_BYTES) {
      return Response.json({ error: "A versão otimizada da imagem deve ter no máximo 4 MB." }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const objectKey = `career/${Date.now()}-${id}-${safeFilename(file.name || "foto")}`;

    await env.BUCKET.put(objectKey, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type },
      customMetadata: { title },
    });

    try {
      await env.DB.prepare(
        `INSERT INTO gallery_items
          (id, object_key, title, year, location, caption, content_type, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
      )
        .bind(id, objectKey, title, year, location, caption, file.type)
        .run();
    } catch (error) {
      await env.BUCKET.delete(objectKey);
      throw error;
    }

    return Response.json(
      {
        item: {
          id,
          title,
          year,
          location,
          caption,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado.";
    return Response.json({ error: message }, { status: 500 });
  }
}
