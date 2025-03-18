import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "next-auth/react";

import { cn } from "@/lib/utils";

import { auth } from "@/auth";

import { Toaster } from "@/components/ui/sonner";

import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const font = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jotion",
  description: "Individual development plan system SaaS",
  icons: {
    icon: "/logo.svg",
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "antialiased")}>
          <QueryProvider>
            <ThemeProvider>
              {children}
              <ModalProvider />
              <Toaster richColors />
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
