"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface HeaderShellProps {
  children: React.ReactNode;
}

export function HeaderShell({ children }: HeaderShellProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        isScrolled
          ? "border-b border-secondary-100/80 bg-white/98 shadow-lg backdrop-blur-md"
          : "border-b border-transparent bg-white/95 backdrop-blur-sm",
      )}
    >
      {children}
    </header>
  );
}
