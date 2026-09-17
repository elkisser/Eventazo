import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MobileBottomNav } from "@/components/MobileBottomNav";

export const metadata: Metadata = {
  title: "Eventazo | Generador de Rifas Profesional",
  description:
    "Generá rifas y tickets de sorteos de forma profesional. Optimizado para impresión A4 con diseño premium.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-gradient-dark antialiased pb-16 sm:pb-0">
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}
