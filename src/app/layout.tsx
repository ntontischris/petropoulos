import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "greek"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Group 110 | Real Estate & Consulting",
    template: "%s | Group 110",
  },
  description: "Smart Real Estate Investments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // html lang is set in [locale]/layout.tsx
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
