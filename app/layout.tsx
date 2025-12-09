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
    icon: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-23GK10YM0V"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-23GK10YM0V');
            `,
          }}
        />
      </head>

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
