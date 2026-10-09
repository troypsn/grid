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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://troypineda.vercel.app/"
  ),
  title: "Grid By Troy Pineda",
  description: "A personal portfolio and web space by Troy Pineda.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Grid By Troy Pineda",
    description: "A personal portfolio and web space by Troy Pineda.",
    url: "/",
    siteName: "Grid By Troy Pineda",
    images: [
      {
        url: "/grid-preview.png",
        width: 1200,
        height: 630,
        alt: "Grid By Troy Pineda - Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grid By Troy Pineda",
    description: "A personal portfolio and web space by Troy Pineda.",
    images: ["/grid-preview.png"],
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