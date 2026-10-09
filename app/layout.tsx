import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Kode_Mono,
  Kulim_Park,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import PageTransition from "./components/PageTransition";

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
  title: "Grid By Troy Pineda",
  description: "A personal portfolio and web space by Troy Pineda.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
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
        antialiased
      `}
    >
      <body className="flex flex-col min-h-screen">
        <SmoothScroll />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}