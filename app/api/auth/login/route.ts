import { NextRequest, NextResponse } from "next/server";
import { BACKEND_URL } from "@/lib/backend";
import { createSession } from "@/lib/session";


export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.email || !body?.password) {
    return NextResponse.json({ error: "Falta correo o contraseña" }, { status: 400 });
  }

  let backendRes: Response;
  try {
    backendRes = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: body.email, password: body.password }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { error: `No se pudo conectar con el backend en ${BACKEND_URL}. ¿Está corriendo?` },
      { status: 502 }
    );
  }

  if (!backendRes.ok) {
    const data = await backendRes.json().catch(() => ({}));
    return NextResponse.json(
      { error: data.errors ?? "Credenciales inválidas" },
      { status: backendRes.status }
    );
  }

  const data = await backendRes.json();
  await createSession({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    expiresAtUtc: data.expiresAtUtc,
    user: data.user,
  });

  return NextResponse.json({ user: data.user });
}
