import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

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
    <html lang="en" suppressHydrationWarning>
      <body className={jetbrainsMono.variable}>{children}</body>
    </html>
  );
}
