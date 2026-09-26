import { adminFetch } from "@/lib/adminApi";
import { ModuleCard } from "@/components/ModuleCard";
import { PostForm } from "@/components/posts/PostForm";
import { createPost } from "@/lib/actions/posts";
import type { Category } from "@/types/category";

export default async function NewPostPage() {
  const categories = await adminFetch<Category[]>("/api/admin/categories");

  return (
    <ModuleCard title="Crear noticia">
      <PostForm categories={categories} action={createPost} />
    </ModuleCard>
  );
}
