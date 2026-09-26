import { getSession } from "@/lib/session";
import AdminShellClient from "@/components/AdminShellClient";

export default async function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <AdminShellClient userEmail={session?.user.email} roles={session?.user.roles ?? []}>
      {children}
    </AdminShellClient>
  );
}
