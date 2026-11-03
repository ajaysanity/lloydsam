import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin sign in | Lloyd & Sam",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
