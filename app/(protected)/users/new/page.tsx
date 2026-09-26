import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { isAdmin } from "@/lib/roles";
import { ModuleCard } from "@/components/ModuleCard";
import { UserCreateForm } from "@/components/users/UserCreateForm";
import { createUser } from "@/lib/actions/users";

export default async function NewUserPage() {
  const session = await getSession();
  if (!session || !isAdmin(session.user.roles)) redirect("/");

  return (
    <ModuleCard title="Nuevo usuario">
      <UserCreateForm action={createUser} />
    </ModuleCard>
  );
}
