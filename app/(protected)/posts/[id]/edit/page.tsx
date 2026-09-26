import { notFound, redirect } from "next/navigation";
import { adminFetch, AdminApiError } from "@/lib/adminApi";
import { getSession } from "@/lib/session";
import { canEditPost } from "@/lib/roles";
import { ModuleCard } from "@/components/ModuleCard";
import { PostForm } from "@/components/posts/PostForm";
import { updatePost } from "@/lib/actions/posts";
import type { Category } from "@/types/category";
import type { PostDetail } from "@/types/post";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();

  let post: PostDetail;
  let categories: Category[];
  try {
    [post, categories] = await Promise.all([
      adminFetch<PostDetail>(`/api/admin/posts/${id}`),
      adminFetch<Category[]>("/api/admin/categories"),
    ]);
  } catch (err) {
    if (err instanceof AdminApiError && err.status === 404) notFound();
    throw err;
  }

  if (!canEditPost(session?.user.roles ?? [], session?.user.id ?? -1, post.userId)) {
    redirect(`/posts/${post.id}`);
  }

  return (
    <ModuleCard title={`Editar noticia: ${post.title}`}>
      <PostForm
        post={post}
        categories={categories}
        action={updatePost.bind(null, post.id)}
        buttonLabel="Actualizar"
      />
    </ModuleCard>
  );
}
