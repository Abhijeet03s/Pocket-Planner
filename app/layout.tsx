import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "../app/components/SessionProvider";
import { Toaster } from "@/app/components/ui/toaster";
import { initializeCategories } from '@/lib/initializeDb';

export const metadata: Metadata = {
  title: 'PockerPlanner',
  description: 'Manage your expenses with ease and take control of your finances',
};

if (process.env.NODE_ENV !== 'production') {
  initializeCategories();
}

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
