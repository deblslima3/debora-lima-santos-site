import { env } from "cloudflare:workers";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  DEFAULT_CONTENT,
  isEditableKey,
  type EditableContent,
} from "@/lib/content";

export async function PUT(request: Request) {
  if (!(await isAdminRequest())) {
    return Response.json({ error: "Acesso não autorizado." }, { status: 403 });
  }

  try {
    const payload = (await request.json()) as Partial<EditableContent>;
    const entries = Object.entries(payload).filter(
      ([key, value]) => isEditableKey(key) && typeof value === "string",
    );

    if (entries.length !== Object.keys(DEFAULT_CONTENT).length) {
      return Response.json(
        { error: "Preencha todos os campos antes de salvar." },
        { status: 400 },
      );
    }

    const statements = entries.map(([key, value]) =>
      env.DB.prepare(
        `INSERT INTO site_content (key, value, updated_at)
         VALUES (?, ?, CURRENT_TIMESTAMP)
         ON CONFLICT(key) DO UPDATE SET
           value = excluded.value,
           updated_at = CURRENT_TIMESTAMP`,
      ).bind(key, value.trim()),
    );

    await env.DB.batch(statements);
    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado.";
    return Response.json({ error: message }, { status: 500 });
  }
}
