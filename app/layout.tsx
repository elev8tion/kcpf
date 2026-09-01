import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/liquid-glass.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KC | elev8tion - Full-Stack Developer & AI Engineer",
  description: "Portfolio of KC - Specialized in Flutter, React, AI/ML, and cloud solutions",
  keywords: ["developer", "AI", "Flutter", "React", "portfolio", "elev8tion"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
