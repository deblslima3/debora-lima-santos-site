import { env } from "cloudflare:workers";
import { isAdminRequest } from "@/lib/admin-auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminRequest())) {
    return Response.json({ error: "Acesso não autorizado." }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = (await request.json()) as Record<string, unknown>;
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const year = typeof body.year === "string" ? body.year.trim() : "";
    const location = typeof body.location === "string" ? body.location.trim() : "";
    const caption = typeof body.caption === "string" ? body.caption.trim() : "";

    if (!title) {
      return Response.json({ error: "Informe um título para a fotografia." }, { status: 400 });
    }

    const item = await env.DB.prepare(
      "SELECT created_at AS createdAt FROM gallery_items WHERE id = ?",
    )
      .bind(id)
      .first<{ createdAt: string }>();

    if (!item) {
      return Response.json({ error: "Fotografia não encontrada." }, { status: 404 });
    }

    await env.DB.prepare(
      `UPDATE gallery_items
       SET title = ?, year = ?, location = ?, caption = ?
       WHERE id = ?`,
    )
      .bind(title, year, location, caption, id)
      .run();

    return Response.json({
      item: { id, title, year, location, caption, createdAt: item.createdAt },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado.";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminRequest())) {
    return Response.json({ error: "Acesso não autorizado." }, { status: 403 });
  }

  try {
    const { id } = await params;
    const item = await env.DB.prepare(
      "SELECT object_key AS objectKey FROM gallery_items WHERE id = ?",
    )
      .bind(id)
      .first<{ objectKey: string }>();

    if (!item) {
      return Response.json({ error: "Fotografia não encontrada." }, { status: 404 });
    }

    await env.BUCKET.delete(item.objectKey);
    await env.DB.prepare("DELETE FROM gallery_items WHERE id = ?").bind(id).run();

    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado.";
    return Response.json({ error: message }, { status: 500 });
  }
}
