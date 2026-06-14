import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CMSProvider } from "@/context/CMSContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Riverside Villa - Ketenangan di Tepi Sungai",
  description: "Riverside Villa menawarkan pengalaman menginap eksklusif dengan suasana alam yang menenangkan. Didesain minimalis modern.",
  keywords: ["villa", "homestay", "riverside", "penginapan", "liburan", "minimalis"],
  openGraph: {
    title: "Riverside Villa - Ketenangan di Tepi Sungai",
    description: "Riverside Villa menawarkan pengalaman menginap eksklusif.",
    url: "https://riversidevilla.com",
    siteName: "Riverside Villa",
    images: [
      {
        url: "/images/hero.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F9F8F6] text-[#1A1A1A]`}
      >
        <CMSProvider>
          {children}
        </CMSProvider>
      </body>
    </html>
  );
}
