"use client";

import { usePathname } from "next/navigation";
import FloatingMusicPlayer from "./FloatingMusicPlayer";

export default function ConditionalFloatingMusicPlayer() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname.startsWith("/dashboard")) {
    return null;
  }
  return <FloatingMusicPlayer />;
}
