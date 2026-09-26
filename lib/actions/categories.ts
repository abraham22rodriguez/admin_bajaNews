"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminFetch, AdminApiError } from "@/lib/adminApi";

export interface CategoryActionState {
  error?: string;
}

function toJson(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const slugRaw = formData.get("slug");
  const slug = slugRaw ? String(slugRaw) : null;
  return JSON.stringify({ name, slug });
}

export async function createCategory(
  _prevState: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  try {
    await adminFetch("/api/admin/categories", { method: "POST", body: toJson(formData) });
  } catch (err) {
    return { error: err instanceof AdminApiError ? err.message : "No se pudo guardar la categoría" };
  }

  revalidatePath("/categories");
  redirect("/categories?ok=" + encodeURIComponent("Categoría guardada correctamente"));
}

export async function updateCategory(
  id: number,
  _prevState: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  try {
    await adminFetch(`/api/admin/categories/${id}`, { method: "PUT", body: toJson(formData) });
  } catch (err) {
    return { error: err instanceof AdminApiError ? err.message : "No se pudo actualizar la categoría" };
  }

  revalidatePath("/categories");
  redirect("/categories?ok=" + encodeURIComponent("Categoría actualizada correctamente"));
}

export async function deleteCategory(id: number) {
  try {
    await adminFetch(`/api/admin/categories/${id}`, { method: "DELETE" });
  } catch (err) {
    const message =
      err instanceof AdminApiError ? err.message : "No se pudo eliminar la categoría";
    redirect("/categories?error=" + encodeURIComponent(message));
  }

  revalidatePath("/categories");
  redirect("/categories?ok=" + encodeURIComponent("Categoría eliminada"));
}
