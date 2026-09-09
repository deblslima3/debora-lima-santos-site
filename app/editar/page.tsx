import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { ADMIN_EMAIL } from "@/lib/admin-auth";
import { getEditableContent, getGalleryItems } from "@/lib/content";
import EditorClient from "./editor-client";

export const dynamic = "force-dynamic";

export default async function EditarPage() {
  const user = await requireChatGPTUser("/editar");

  if (user.email.toLowerCase() !== ADMIN_EMAIL) {
    return (
      <main className="admin-shell admin-message">
        <ShieldCheck size={36} />
        <h1>Área reservada</h1>
        <p>Esta área de edição está disponível somente para a proprietária do portfólio.</p>
        <Link href="/"><ArrowLeft size={16} /> Voltar ao site</Link>
      </main>
    );
  }

  const [content, gallery] = await Promise.all([
    getEditableContent(),
    getGalleryItems(),
  ]);

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="admin-kicker">Painel do portfólio</p>
          <h1>Olá, Débora.</h1>
          <p>Atualize sua apresentação e construa uma memória visual dos seus 15 anos de carreira.</p>
        </div>
        <Link className="admin-back" href="/"><ArrowLeft size={16} /> Ver site</Link>
      </header>
      <EditorClient initialContent={content} initialGallery={gallery} />
    </main>
  );
}
