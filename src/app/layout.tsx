import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Generador de Rifas | Sistema Profesional de Tickets",
  description:
    "Genera rifas y tickets de sorteos de forma profesional. Optimizado para impresión A4 con diseño premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-gradient-dark antialiased">
        {children}
      </body>
    </html>
  );
}
