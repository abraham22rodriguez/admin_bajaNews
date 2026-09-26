import { ModuleCard } from "@/components/ModuleCard";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { createCategory } from "@/lib/actions/categories";

export default function NewCategoryPage() {
  return (
    <ModuleCard title="Agregar categoría">
      <CategoryForm action={createCategory} />
    </ModuleCard>
  );
}
