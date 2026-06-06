import type { Metadata } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AVINESH | Developer & AI Enthusiast",
  description:
    "Portfolio of Avinesh — a passionate software engineer dedicated to crafting efficient solutions at the intersection of web technology and Artificial Intelligence.",
  keywords: [
    "Avinesh",
    "Developer",
    "AI",
    "Machine Learning",
    "Portfolio",
    "Full Stack",
    "Python",
    "React",
    "Next.js",
  ],
  openGraph: {
    title: "AVINESH | Developer & AI Enthusiast",
    description:
      "Crafting efficient solutions at the intersection of web technology and AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
