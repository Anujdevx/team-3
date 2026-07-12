import type { Metadata } from "next";
import {
  Inter,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Xebia Exam Platform",
  description: "Assessment and Certification Platform",
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        inter.variable,
        hanken.variable,
        mono.variable
      )}
    >
      <body className="min-h-screen bg-background font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}