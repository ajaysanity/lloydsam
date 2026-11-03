import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Lato } from "next/font/google";
import ConditionalFloatingMusicPlayer from "@/components/music-player/ConditionalFloatingMusicPlayer";
import "./globals.css";

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "You're Invited — Lloyd & Sam",
  description:
    "We're getting married on December 29, 2026. Open our invitation for details, RSVP, and everything you need to celebrate with us.",
  openGraph: {
    title: "You're Invited — Lloyd & Sam",
    description:
      "We're getting married on December 29, 2026. Open our invitation for details and RSVP.",
    type: "website",
    images: [
      {
        url: "/gallery/1.JPG",
        alt: "Lloyd and Sam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "You're Invited — Lloyd & Sam",
    description:
      "We're getting married on December 29, 2026. Open our invitation for details and RSVP.",
    images: ["/gallery/1.JPG"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${greatVibes.variable} ${playfairDisplay.variable} ${lato.variable} antialiased`}>
        <ConditionalFloatingMusicPlayer />
        {children}
      </body>
    </html>
  );
}
