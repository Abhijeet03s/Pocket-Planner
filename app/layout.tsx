import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "../app/components/SessionProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'PockerPlanner',
  description: 'Manage your expenses with ease and take control of your finances',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
