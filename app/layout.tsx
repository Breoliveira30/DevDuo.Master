import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ProjectProvider } from "@/lib/project-context";
import { AuthProvider } from "@/components/admin/auth-context";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "DevDuo",
  description: "Transforme sua presença digital com Landing Pages extraordinárias",
  icons: {
    icon: "/favicon-32x32.png", // <- favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <ProjectProvider>
            {children}
            <Toaster />
          </ProjectProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
