import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoCripto - AI-Powered Crypto Analysis Platform",
  description: "AI-Powered Crypto Analysis Platform with real-time data and SMARTSIGNALS.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>)
{
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}


