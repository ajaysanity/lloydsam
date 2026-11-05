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

function toSiteUrl(value: string | undefined) {
  const raw = value?.trim() || "http://localhost:3000";
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/$/, "");
}

const siteUrl = toSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

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
        url: "/gallery/invited.jpg",
        width: 3281,
        height: 1875,
        alt: "Lloyd and Sam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "You're Invited — Lloyd & Sam",
    description:
      "We're getting married on December 29, 2026. Open our invitation for details and RSVP.",
    images: ["/gallery/invited.jpg"],
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
