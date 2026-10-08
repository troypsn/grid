import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Kode_Mono,
  Kulim_Park,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kodeMono = Kode_Mono({
  variable: "--font-kode-mono",
  subsets: ["latin"],
});

const kulimPark = Kulim_Park({
  weight: "300",
  variable: "--font-kulim-park",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Portfolio",
  description: "Your portfolio website",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${kodeMono.variable}
        ${kulimPark.variable}
        h-full
        antialiased
      `}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}