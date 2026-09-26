import "server-only";
import { BACKEND_URL } from "@/lib/backend";
import { getSession } from "@/lib/session";

export class AdminApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}


export async function adminFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const session = await getSession();
  if (!session) throw new AdminApiError(401, "No hay sesión activa");


  const isFormData = typeof FormData !== "undefined" && init.body instanceof FormData;

  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers: {
      ...(!isFormData && init.body ? { "Content-Type": "application/json" } : {}),
      Authorization: `Bearer ${session.accessToken}`,
      ...init.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new AdminApiError(res.status, data.errors ?? `Error ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
