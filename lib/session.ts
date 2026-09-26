import "server-only";
import { cookies } from "next/headers";

const TOKEN_COOKIE = "bn_token";
const USER_COOKIE = "bn_user";
const REFRESH_COOKIE = "bn_refresh";

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  lastName: string;
  roles: string[];
}

export interface Session {
  accessToken: string;
  user: SessionUser;
}

const cookieDefaults = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function createSession(params: {
  accessToken: string;
  refreshToken: string;
  expiresAtUtc: string;
  user: SessionUser;
}) {
  const store = await cookies();
  const secondsUntilExpiry = Math.floor(
    (new Date(params.expiresAtUtc).getTime() - Date.now()) / 1000
  );
  const maxAge = Math.max(60, secondsUntilExpiry);

  store.set(TOKEN_COOKIE, params.accessToken, { ...cookieDefaults, maxAge });
  store.set(USER_COOKIE, JSON.stringify(params.user), { ...cookieDefaults, maxAge });
  store.set(REFRESH_COOKIE, params.refreshToken, {
    ...cookieDefaults,
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(TOKEN_COOKIE);
  store.delete(USER_COOKIE);
  store.delete(REFRESH_COOKIE);
}

/** Para leer la sesión desde Server Components o Route Handlers. */
export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const token = store.get(TOKEN_COOKIE)?.value;
  const userRaw = store.get(USER_COOKIE)?.value;
  if (!token || !userRaw) return null;

  try {
    return { accessToken: token, user: JSON.parse(userRaw) as SessionUser };
  } catch {
    return null;
  }
}
