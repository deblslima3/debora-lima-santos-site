import { env } from "cloudflare:workers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const item = await env.DB.prepare(
      "SELECT object_key AS objectKey, content_type AS contentType FROM gallery_items WHERE id = ?",
    )
      .bind(id)
      .first<{ objectKey: string; contentType: string }>();

    if (!item) return new Response("Not found", { status: 404 });

    const object = await env.BUCKET.get(item.objectKey);
    if (!object) return new Response("Not found", { status: 404 });

    return new Response(object.body, {
      headers: {
        "Content-Type": item.contentType,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        ETag: object.httpEtag,
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
