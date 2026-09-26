import { notFound, redirect } from "next/navigation";
import { adminFetch, AdminApiError } from "@/lib/adminApi";
import { getSession } from "@/lib/session";
import { isAdmin } from "@/lib/roles";
import { ModuleCard } from "@/components/ModuleCard";
import { UserEditForm } from "@/components/users/UserEditForm";
import { updateUser } from "@/lib/actions/users";
import type { UserDetail } from "@/types/user";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session || !isAdmin(session.user.roles)) redirect("/");

  const { id } = await params;

  let user: UserDetail;
  try {
    user = await adminFetch<UserDetail>(`/api/admin/users/${id}`);
  } catch (err) {
    if (err instanceof AdminApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <ModuleCard title={`Editar usuario: ${user.email}`}>
      <UserEditForm user={user} action={updateUser.bind(null, user.id, user.levelId)} />
    </ModuleCard>
  );
}
