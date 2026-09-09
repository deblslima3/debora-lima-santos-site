"use client";

import { useState, type FormEvent } from "react";
import { ImagePlus, LoaderCircle, Pencil, Save, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { EditableContent, GalleryItem } from "@/lib/content";

type EditorClientProps = {
  initialContent: EditableContent;
  initialGallery: GalleryItem[];
};

type ContentField = {
  key: keyof EditableContent;
  label: string;
  hint: string;
  rows?: number;
};

const MAX_SOURCE_IMAGE_BYTES = 25 * 1024 * 1024;
const MAX_IMAGE_EDGE = 1600;
const WEBP_QUALITY = 0.82;

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

async function decodePhoto(file: File) {
  if (typeof createImageBitmap === "function") {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    return {
      source: bitmap as CanvasImageSource,
      width: bitmap.width,
      height: bitmap.height,
      release: () => bitmap.close(),
    };
  }

  const objectUrl = URL.createObjectURL(file);
  const image = new Image();
  image.decoding = "async";

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Não foi possível abrir esta imagem."));
    image.src = objectUrl;
  });

  return {
    source: image as CanvasImageSource,
    width: image.naturalWidth,
    height: image.naturalHeight,
    release: () => URL.revokeObjectURL(objectUrl),
  };
}

async function optimizePhoto(file: File) {
  if (file.size > MAX_SOURCE_IMAGE_BYTES) {
    throw new Error("A fotografia original deve ter no máximo 25 MB.");
  }

  let decoded: Awaited<ReturnType<typeof decodePhoto>> | undefined;

  try {
    decoded = await decodePhoto(file);

    if (!decoded.width || !decoded.height) {
      throw new Error("A fotografia selecionada não possui dimensões válidas.");
    }

    const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(decoded.width, decoded.height));
    const width = Math.max(1, Math.round(decoded.width * scale));
    const height = Math.max(1, Math.round(decoded.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Seu navegador não conseguiu preparar a fotografia.");
    }

    context.drawImage(decoded.source, 0, 0, width, height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => result ? resolve(result) : reject(new Error("Não foi possível otimizar a fotografia.")),
        "image/webp",
        WEBP_QUALITY,
      );
    });

    const extension = blob.type === "image/webp" ? "webp" : blob.type === "image/png" ? "png" : "jpg";
    const baseName = file.name.replace(/\.[^.]+$/, "") || "fotografia";

    return new File([blob], `${baseName}.${extension}`, {
      type: blob.type || "image/webp",
      lastModified: Date.now(),
    });
  } catch (error) {
    if (error instanceof Error && error.message) {
      throw error;
    }

    throw new Error("Use uma fotografia nos formatos JPG, PNG ou WebP.");
  } finally {
    decoded?.release();
  }
}

const contentGroups: Array<{
  title: string;
  description: string;
  fields: ContentField[];
}> = [
  {
    title: "Abertura e posicionamento",
    description: "Os primeiros textos que apresentam seu tema central e sua identidade profissional.",
    fields: [
      { key: "heroKicker", label: "Identificação profissional", hint: "Texto pequeno acima do título principal." },
      { key: "heroTitle", label: "Título principal", hint: "Primeira parte da mensagem de abertura." },
      { key: "heroEmphasis", label: "Síntese do tema", hint: "Trecho complementar em destaque no título." },
      { key: "heroIntro", label: "Apresentação inicial", hint: "Resumo curto que aparece na primeira tela.", rows: 5 },
      { key: "themeTitle", label: "Título do tema central", hint: "A lógica que integra suas diferentes frentes de pesquisa." },
      { key: "themeSubtitle", label: "Explicação do tema central", hint: "Explique como o grande tema reúne organismos, escalas e soluções.", rows: 6 },
    ],
  },
  {
    title: "Perfil, expertises e diferenciais",
    description: "Sua biografia, a integração entre áreas e o valor singular da sua atuação.",
    fields: [
      { key: "aboutTitle", label: "Título da seção Perfil", hint: "Síntese da sua identidade profissional." },
      { key: "aboutLead", label: "Abertura da biografia", hint: "Parágrafo de maior destaque.", rows: 4 },
      { key: "aboutBody", label: "Biografia profissional", hint: "Formação, experiência e atuação atual.", rows: 8 },
      { key: "researchTitle", label: "Título das expertises", hint: "Mensagem que conecta suas áreas de pesquisa." },
      { key: "researchBody", label: "Introdução às expertises", hint: "Contextualize a amplitude e a integração das áreas.", rows: 5 },
      { key: "differentialsTitle", label: "Título dos diferenciais", hint: "O que torna sua forma de trabalhar singular." },
      { key: "differentialsBody", label: "Introdução aos diferenciais", hint: "Integre métodos, escalas e capacidade de aplicação.", rows: 5 },
    ],
  },
  {
    title: "Produção e trajetória",
    description: "Contexto para as publicações, os projetos e a linha do tempo profissional.",
    fields: [
      { key: "publicationsTitle", label: "Título da produção selecionada", hint: "Como sua produção contribui para ciência e decisão." },
      { key: "publicationsBody", label: "Introdução às publicações", hint: "Temas e alcance da sua produção científica recente.", rows: 5 },
      { key: "trajectoryTitle", label: "Título da trajetória", hint: "Mensagem da seção sobre formação e prática científica." },
      { key: "trajectoryBody", label: "Texto da trajetória", hint: "Campo, laboratório, geotecnologias, dados e formação de pessoas.", rows: 6 },
      { key: "insectaTitle", label: "Título da atuação no INSECTA", hint: "Título exibido no primeiro projeto da seção de experiências." },
      { key: "insectaBody", label: "Descrição da atuação no INSECTA", hint: "Pesquisa em biodiversidade, métodos, competências e aplicações.", rows: 6 },
    ],
  },
  {
    title: "Origem, divulgação e colaboração",
    description: "Sua história com a educação e seu compromisso com uma ciência acessível e coletiva.",
    fields: [
      { key: "originTitle", label: "Título da sua história", hint: "A ideia central que conecta educação e transformação." },
      { key: "originBody", label: "Trajetória pessoal", hint: "Escola pública, descoberta da ciência e propósito.", rows: 7 },
      { key: "outreachTitle", label: "Título de ciência e sociedade", hint: "Sua visão sobre popularização da ciência." },
      { key: "outreachBody", label: "Texto de ciência e sociedade", hint: "Formatos, públicos e objetivos da comunicação.", rows: 6 },
      { key: "collaborationTitle", label: "Título de redes e colaboração", hint: "Sua visão sobre pesquisa interdisciplinar e parcerias." },
      { key: "collaborationBody", label: "Texto de redes e colaboração", hint: "Instituições, setores e públicos conectados pela sua atuação.", rows: 5 },
    ],
  },
];

export default function EditorClient({ initialContent, initialGallery }: EditorClientProps) {
  const [content, setContent] = useState(initialContent);
  const [gallery, setGallery] = useState(initialGallery);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [updatingPhoto, setUpdatingPhoto] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<GalleryItem | null>(null);
  const [message, setMessage] = useState("");

  async function saveContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    const result = (await response.json()) as { error?: string };

    setMessage(response.ok ? "Textos atualizados com sucesso." : result.error ?? "Não foi possível salvar.");
    setSaving(false);
  }

  async function uploadPhoto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const originalPhoto = formData.get("photo");

    if (!(originalPhoto instanceof File) || !originalPhoto.size) {
      setMessage("Selecione uma fotografia para enviar.");
      return;
    }

    setUploading(true);
    setMessage("Otimizando a fotografia para a web...");

    try {
      const optimizedPhoto = await optimizePhoto(originalPhoto);
      formData.set("photo", optimizedPhoto, optimizedPhoto.name);

      const response = await fetch("/api/admin/photos", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { item?: GalleryItem; error?: string };

      if (response.ok && result.item) {
        setGallery((items) => [result.item as GalleryItem, ...items]);
        form.reset();
        setMessage(
          `Fotografia otimizada de ${formatBytes(originalPhoto.size)} para ${formatBytes(optimizedPhoto.size)} e adicionada à galeria.`,
        );
      } else {
        setMessage(result.error ?? "Não foi possível enviar a fotografia.");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível preparar a fotografia.");
    } finally {
      setUploading(false);
    }
  }

  async function updatePhoto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingPhoto) return;

    setUpdatingPhoto(true);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/photos/${editingPhoto.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingPhoto.title,
          year: editingPhoto.year,
          location: editingPhoto.location,
          caption: editingPhoto.caption,
        }),
      });
      const result = (await response.json()) as { item?: GalleryItem; error?: string };

      if (response.ok && result.item) {
        setGallery((items) => items.map((item) => item.id === result.item?.id ? result.item : item));
        setEditingPhoto(null);
        setMessage("Informações da fotografia atualizadas.");
      } else {
        setMessage(result.error ?? "Não foi possível atualizar a fotografia.");
      }
    } catch {
      setMessage("Não foi possível atualizar a fotografia.");
    } finally {
      setUpdatingPhoto(false);
    }
  }

  async function removePhoto(id: string) {
    setMessage("");
    const response = await fetch(`/api/admin/photos/${id}`, { method: "DELETE" });
    const result = (await response.json()) as { error?: string };
    if (response.ok) {
      setGallery((items) => items.filter((item) => item.id !== id));
      setMessage("Fotografia removida.");
    } else {
      setMessage(result.error ?? "Não foi possível remover a fotografia.");
    }
  }

  return (
    <Tabs defaultValue="textos" className="admin-tabs">
      <TabsList variant="line" className="admin-tabs-list">
        <TabsTrigger value="textos">Textos do site</TabsTrigger>
        <TabsTrigger value="fotos">Fotos da carreira</TabsTrigger>
      </TabsList>

      {message ? <p className="admin-status" role="status">{message}</p> : null}

      <TabsContent value="textos">
        <form className="editor-form" onSubmit={saveContent}>
          <div className="editor-intro">
            <h2>Conteúdo público</h2>
            <p>As alterações salvas serão exibidas no portfólio. Você poderá revisá-las e editar novamente quando quiser.</p>
          </div>
          <div className="editor-groups">
            {contentGroups.map((group) => (
              <section className="editor-group" key={group.title}>
                <div className="editor-group-heading">
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                <div className="editor-fields">
                  {group.fields.map((field) => (
                    <div className="editor-field" key={field.key}>
                      <Label htmlFor={field.key}>{field.label}</Label>
                      <small>{field.hint}</small>
                      {field.rows ? (
                        <Textarea
                          id={field.key}
                          rows={field.rows}
                          value={content[field.key]}
                          onChange={(event) => setContent((current) => ({ ...current, [field.key]: event.target.value }))}
                          required
                        />
                      ) : (
                        <Input
                          id={field.key}
                          value={content[field.key]}
                          onChange={(event) => setContent((current) => ({ ...current, [field.key]: event.target.value }))}
                          required
                        />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <Button type="submit" size="lg" disabled={saving} className="admin-save">
            {saving ? <LoaderCircle className="animate-spin" /> : <Save />}
            {saving ? "Salvando..." : "Salvar alterações"}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="fotos">
        <div className="photo-admin-grid">
          <form className="photo-upload" onSubmit={uploadPhoto}>
            <div className="editor-intro">
              <h2>Adicionar fotografia</h2>
              <p>Envie uma imagem por vez para registrar corretamente o projeto, o ano e o contexto.</p>
            </div>
            <div className="photo-optimization-note">
              <strong>Otimização automática</strong>
              <p>A imagem será reduzida para até 1.600 px no lado maior e convertida para WebP. Assim, ela mantém boa qualidade visual sem deixar o site pesado.</p>
            </div>
            <div className="editor-field">
              <Label htmlFor="photo">Arquivo da imagem</Label>
              <Input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" required />
              <small>JPG, PNG ou WebP, com até 25 MB antes da otimização.</small>
            </div>
            <div className="editor-field">
              <Label htmlFor="title">Título</Label>
              <Input id="title" name="title" placeholder="Ex.: Monitoramento na Mata Atlântica" required />
            </div>
            <div className="photo-meta-row">
              <div className="editor-field">
                <Label htmlFor="year">Ano</Label>
                <Input id="year" name="year" placeholder="2024" />
              </div>
              <div className="editor-field">
                <Label htmlFor="location">Local</Label>
                <Input id="location" name="location" placeholder="Sul da Bahia" />
              </div>
            </div>
            <div className="editor-field">
              <Label htmlFor="caption">Legenda</Label>
              <Textarea id="caption" name="caption" rows={4} placeholder="Descreva a atividade, o projeto e sua participação." />
            </div>
            <Button type="submit" size="lg" disabled={uploading}>
              {uploading ? <LoaderCircle className="animate-spin" /> : <ImagePlus />}
              {uploading ? "Enviando..." : "Adicionar à galeria"}
            </Button>
          </form>

          <section className="photo-library" aria-label="Fotografias publicadas">
            <div className="editor-intro">
              <h2>Galeria publicada</h2>
              <p>{gallery.length ? `${gallery.length} fotografia(s) na sua trajetória.` : "Nenhuma fotografia adicionada ainda."}</p>
            </div>
            <div className="photo-library-list">
              {gallery.map((item) => (
                <article className="photo-library-card" key={item.id}>
                  <img src={`/media/${item.id}`} alt={item.title} />
                  <div className="photo-library-copy">
                    <strong>{item.title}</strong>
                    <span>{[item.year, item.location].filter(Boolean).join(" · ")}</span>
                  </div>
                  <div className="photo-card-actions">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Editar informações de ${item.title}`}
                      onClick={() => setEditingPhoto(item)}
                    >
                      <Pencil />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button type="button" variant="ghost" size="icon" aria-label={`Remover ${item.title}`}><Trash2 /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remover esta fotografia?</AlertDialogTitle>
                          <AlertDialogDescription>Ela será retirada da galeria e não poderá ser recuperada.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => removePhoto(item.id)}>Remover</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </TabsContent>

      <Dialog
        open={Boolean(editingPhoto)}
        onOpenChange={(open) => {
          if (!open && !updatingPhoto) setEditingPhoto(null);
        }}
      >
        {editingPhoto ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar fotografia</DialogTitle>
              <DialogDescription>Atualize as informações exibidas junto à imagem na galeria.</DialogDescription>
            </DialogHeader>
            <form className="photo-edit-form" onSubmit={updatePhoto}>
              <div className="editor-field">
                <Label htmlFor="edit-photo-title">Título</Label>
                <Input
                  id="edit-photo-title"
                  value={editingPhoto.title}
                  onChange={(event) => setEditingPhoto((current) => current ? { ...current, title: event.target.value } : current)}
                  required
                />
              </div>
              <div className="photo-meta-row">
                <div className="editor-field">
                  <Label htmlFor="edit-photo-year">Ano</Label>
                  <Input
                    id="edit-photo-year"
                    value={editingPhoto.year}
                    onChange={(event) => setEditingPhoto((current) => current ? { ...current, year: event.target.value } : current)}
                  />
                </div>
                <div className="editor-field">
                  <Label htmlFor="edit-photo-location">Local</Label>
                  <Input
                    id="edit-photo-location"
                    value={editingPhoto.location}
                    onChange={(event) => setEditingPhoto((current) => current ? { ...current, location: event.target.value } : current)}
                  />
                </div>
              </div>
              <div className="editor-field">
                <Label htmlFor="edit-photo-caption">Legenda</Label>
                <Textarea
                  id="edit-photo-caption"
                  rows={4}
                  value={editingPhoto.caption}
                  onChange={(event) => setEditingPhoto((current) => current ? { ...current, caption: event.target.value } : current)}
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditingPhoto(null)} disabled={updatingPhoto}>Cancelar</Button>
                <Button type="submit" disabled={updatingPhoto}>
                  {updatingPhoto ? <LoaderCircle className="animate-spin" /> : <Save />}
                  {updatingPhoto ? "Salvando..." : "Salvar informações"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        ) : null}
      </Dialog>
    </Tabs>
  );
}
