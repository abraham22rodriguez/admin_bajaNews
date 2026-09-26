import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Baja News — Admin",
  description: "Panel de administración de Baja News",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
