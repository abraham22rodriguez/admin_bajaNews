"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminFetch, AdminApiError } from "@/lib/adminApi";

export interface CustomerActionState {
  error?: string;
}

export async function createCustomer(
  _prevState: CustomerActionState,
  formData: FormData
): Promise<CustomerActionState> {
  try {
    await adminFetch("/api/admin/customers", { method: "POST", body: formData });
  } catch (err) {
    return { error: err instanceof AdminApiError ? err.message : "No se pudo guardar el cliente" };
  }

  revalidatePath("/customers");
  redirect("/customers?ok=" + encodeURIComponent("Cliente guardado correctamente"));
}

export async function updateCustomer(
  id: number,
  _prevState: CustomerActionState,
  formData: FormData
): Promise<CustomerActionState> {
  try {
    await adminFetch(`/api/admin/customers/${id}`, { method: "PUT", body: formData });
  } catch (err) {
    return { error: err instanceof AdminApiError ? err.message : "No se pudo actualizar el cliente" };
  }

  revalidatePath("/customers");
  redirect("/customers?ok=" + encodeURIComponent("Cliente actualizado correctamente"));
}

export async function deleteCustomer(id: number) {
  try {
    await adminFetch(`/api/admin/customers/${id}`, { method: "DELETE" });
  } catch (err) {
    const message =
      err instanceof AdminApiError ? err.message : "No se pudo eliminar el cliente";
    redirect("/customers?error=" + encodeURIComponent(message));
  }

  revalidatePath("/customers");
  redirect("/customers?ok=" + encodeURIComponent("Cliente eliminado"));
}
