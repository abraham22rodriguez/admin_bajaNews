import Link from "next/link";
import { redirect } from "next/navigation";
import { adminFetch } from "@/lib/adminApi";
import { getSession } from "@/lib/session";
import { isAdmin } from "@/lib/roles";
import { ModuleCard } from "@/components/ModuleCard";
import { FlashBanner } from "@/components/FlashBanner";
import { UsersTable } from "@/components/users/UsersTable";
import type { UserListItem } from "@/types/user";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const session = await getSession();
  if (!session || !isAdmin(session.user.roles)) redirect("/");

  const { ok, error } = await searchParams;
  const users = await adminFetch<UserListItem[]>("/api/admin/users");

  return (
    <ModuleCard
      title="Usuarios"
      subtitle="Administra las cuentas del equipo editorial y sus roles"
      actions={
        <Link
          href="/users/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-semibold cursor-pointer"
          style={{ background: "var(--color-cta)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nuevo usuario
        </Link>
      }
    >
      <FlashBanner ok={ok} error={error} />
      <UsersTable users={users} />
    </ModuleCard>
  );
}
