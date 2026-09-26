import Link from "next/link";
import { notFound } from "next/navigation";
import { adminFetch, AdminApiError } from "@/lib/adminApi";
import { getSession } from "@/lib/session";
import { canDeletePosts, canEditPost } from "@/lib/roles";
import { uploadUrl } from "@/lib/assets";
import { ModuleCard } from "@/components/ModuleCard";
import { ConfirmDeleteForm } from "@/components/ConfirmDeleteForm";
import { deletePost } from "@/lib/actions/posts";
import type { PostDetail } from "@/types/post";

function Row({ label, children, muted }: { label: string; children: React.ReactNode; muted?: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 px-4 sm:px-6 py-4 border-b last:border-0" style={{ borderColor: "var(--color-line)" }}>
      <dt className="sm:col-span-1 text-sm font-semibold text-[var(--color-ink-soft)]">{label}</dt>
      <dd className={`sm:col-span-3 text-[var(--color-ink)] ${muted ? "text-[var(--color-ink-soft)]" : ""}`}>{children}</dd>
    </div>
  );
}

export default async function PostShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();

  let post: PostDetail;
  try {
    post = await adminFetch<PostDetail>(`/api/admin/posts/${id}`);
  } catch (err) {
    if (err instanceof AdminApiError && err.status === 404) notFound();
    throw err;
  }

  const roles = session?.user.roles ?? [];
  const canEdit = canEditPost(roles, session?.user.id ?? -1, post.userId);
  const canDelete = canDeletePosts(roles);

  const imgSrc = uploadUrl("posts", post.image);

  return (
    <ModuleCard title={post.title}>
      <dl>
        <Row label="#">
          <span className="font-tabular">{post.id}</span>
        </Row>
        <Row label="Estatus" muted>
          {post.status} · {post.newsType || "NOTICIA"} · {post.section || "GENERAL"}
        </Row>
        <Row label="Imagen">
          {imgSrc ? (
            <img className="w-full max-w-xs aspect-video object-cover rounded-md" src={imgSrc} alt={post.photoDescription || ""} />
          ) : (
            <span className="text-[var(--color-ink-soft)]">Sin imagen</span>
          )}
        </Row>
        <Row label="Pie de foto" muted>
          {post.photoDescription || <span className="italic">Sin especificar</span>}
        </Row>
        <Row label="Sub título">{post.subtitle}</Row>
        <Row label="Nota">
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: post.body }} />
        </Row>
        <Row label="Corresponsal" muted>{post.authorEmail}</Row>
        <Row label="Categoría">{post.categoryName}</Row>
        <Row label="Creado" muted>
          <span className="font-tabular">{post.createdAt ? post.createdAt.slice(0, 10) : ""}</span>
        </Row>
        <Row label="Actualizado" muted>
          <span className="font-tabular">{post.updatedAt ? post.updatedAt.slice(0, 10) : "—"}</span>
        </Row>
      </dl>

      <div className="flex flex-wrap gap-3 px-4 sm:px-6 py-6 border-t" style={{ borderColor: "var(--color-line)" }}>
        {canEdit && (
          <Link
            href={`/posts/${post.id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-semibold cursor-pointer"
            style={{ background: "var(--color-cta)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Modificar
          </Link>
        )}

        {canDelete && (
          <ConfirmDeleteForm
            action={deletePost.bind(null, post.id, "/posts")}
            confirmMessage={`¿Borrar la noticia "${post.title}"? Esta acción no se puede deshacer.`}
          >
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-semibold cursor-pointer"
              style={{ background: "var(--color-danger)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Borrar
            </button>
          </ConfirmDeleteForm>
        )}

        <Link
          href="/posts"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold border-2 cursor-pointer"
          style={{ borderColor: "var(--color-input-border)", color: "var(--color-ink)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Volver a noticias
        </Link>
      </div>
    </ModuleCard>
  );
}
