import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * A diferencia de xolos-noticias, aquí NO usamos NEXT_PUBLIC_API_URL.
   * Todo el tráfico hacia el backend pasa por Route Handlers/Server
   * Components (server-side) — el navegador nunca le habla directo al
   * backend ni necesita saber su URL. Ver lib/backend.ts.
   */
};

export default nextConfig;
