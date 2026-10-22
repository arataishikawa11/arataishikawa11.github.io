import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorHalo from "@/components/CursorHalo";
import AntigravityParticles from "@/components/AntigravityParticles";
import AsciiCursorTrail from "@/components/AsciiCursorTrail";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Arata Ishikawa",
  description: "Personal academic website of Arata Ishikawa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html:
              "<!-- ASCII cursor trail & effects powered by asciify.org (https://asciify.org) -->",
          }}
        />
        <AntigravityParticles />
        <AsciiCursorTrail />
        <Navbar />
        <main className="flex-1 w-full relative z-10">{children}</main>
        <Footer />
        <CursorHalo />
      </body>
    </html>
  );
}
