import { notFound } from "next/navigation";
import { adminFetch, AdminApiError } from "@/lib/adminApi";
import { ModuleCard } from "@/components/ModuleCard";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { updateCategory } from "@/lib/actions/categories";
import type { Category } from "@/types/category";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let category: Category;
  try {
    category = await adminFetch<Category>(`/api/admin/categories/${id}`);
  } catch (err) {
    if (err instanceof AdminApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <ModuleCard title={`Editar categoría: ${category.name}`}>
      <CategoryForm
        category={category}
        action={updateCategory.bind(null, category.id)}
        buttonLabel="Actualizar"
      />
    </ModuleCard>
  );
}
