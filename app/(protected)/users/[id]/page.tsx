import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { adminFetch, AdminApiError } from "@/lib/adminApi";
import { getSession } from "@/lib/session";
import { isAdmin, ROLE_LABELS } from "@/lib/roles";
import { ModuleCard } from "@/components/ModuleCard";
import type { UserDetail, UserListItem } from "@/types/user";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 px-4 sm:px-6 py-4 border-b last:border-0"
      style={{ borderColor: "var(--color-line)" }}
    >
      <dt className="sm:col-span-1 text-sm font-semibold text-[var(--color-ink-soft)]">{label}</dt>
      <dd className="sm:col-span-3 text-[var(--color-ink)]">{children}</dd>
    </div>
  );
}

export default async function UserShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session || !isAdmin(session.user.roles)) redirect("/");

  const { id } = await params;

  let user: UserDetail;
  let list: UserListItem[];
  try {
    [user, list] = await Promise.all([
      adminFetch<UserDetail>(`/api/admin/users/${id}`),
      adminFetch<UserListItem[]>("/api/admin/users"),
    ]);
  } catch (err) {
    if (err instanceof AdminApiError && err.status === 404) notFound();
    throw err;
  }

  const profile = list.find((u) => u.id === user.id);
  const fullName = profile ? `${profile.profileName} ${profile.profileLastName}`.trim() : "";
  const role = user.roles[0];

  return (
    <ModuleCard title={fullName || user.email}>
      <dl>
        <Row label="#">
          <span className="font-tabular">{user.id}</span>
        </Row>
        <Row label="Nombre">{fullName || <span className="italic text-[var(--color-ink-soft)]">Sin nombre</span>}</Row>
        <Row label="Correo">{user.email}</Row>
        <Row label="Rol">{role ? ROLE_LABELS[role] ?? role : "—"}</Row>
        <Row label="Cuenta habilitada">
          <span
            className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold"
            style={
              user.isEnabled
                ? { background: "var(--color-success-tint)", color: "var(--color-success)" }
                : { background: "var(--color-danger-tint)", color: "var(--color-danger)" }
            }
          >
            {user.isEnabled ? "Habilitado" : "Deshabilitado"}
          </span>
        </Row>
        <Row label="Correo verificado">{user.isVerified ? "Sí" : "No"}</Row>
      </dl>

      <div className="flex flex-wrap gap-3 px-4 sm:px-6 py-6 border-t" style={{ borderColor: "var(--color-line)" }}>
        <Link
          href={`/users/${user.id}/edit`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-semibold cursor-pointer"
          style={{ background: "var(--color-cta)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Modificar
        </Link>

        <Link
          href="/users"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold border-2 cursor-pointer"
          style={{ borderColor: "var(--color-input-border)", color: "var(--color-ink)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Volver a usuarios
        </Link>
      </div>
    </ModuleCard>
  );
}
