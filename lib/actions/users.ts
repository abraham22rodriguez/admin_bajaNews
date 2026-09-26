"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminFetch, AdminApiError } from "@/lib/adminApi";

export interface UserActionState {
  error?: string;
}

export async function createUser(
  _prevState: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  const body = JSON.stringify({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    name: String(formData.get("name") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    role: String(formData.get("role") ?? ""),
  });

  try {
    // El alta vive en /api/auth/register (no /api/admin/users) — ahí es
    // donde el backend también genera los tokens; solo ROLE_ADMIN puede
    // llamarlo, igual que el resto de este panel.
    await adminFetch("/api/auth/register", { method: "POST", body });
  } catch (err) {
    return { error: err instanceof AdminApiError ? err.message : "No se pudo crear el usuario" };
  }

  revalidatePath("/users");
  redirect("/users?ok=" + encodeURIComponent("Usuario creado correctamente"));
}

export async function updateUser(
  id: number,
  currentLevelId: number | null,
  _prevState: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  const newPassword = String(formData.get("newPassword") ?? "").trim();

  const body = JSON.stringify({
    role: String(formData.get("role") ?? ""),
    isEnabled: formData.get("isEnabled") === "on",
    isVerified: formData.get("isVerified") === "on",
    levelId: currentLevelId,
    newPassword: newPassword ? newPassword : null,
  });

  try {
    await adminFetch(`/api/admin/users/${id}`, { method: "PUT", body });
  } catch (err) {
    return { error: err instanceof AdminApiError ? err.message : "No se pudo actualizar el usuario" };
  }

  revalidatePath("/users");
  redirect(`/users/${id}?ok=` + encodeURIComponent("Usuario actualizado correctamente"));
}
