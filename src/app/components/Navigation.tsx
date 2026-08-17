"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Sun, X } from "lucide-react";
import { NAV_ITEMS } from "../../constants/site";
import SocialIconLinks from "./SocialIconLinks";

export default function Navigation() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Үндсэн цэс"
      className="fixed top-0 z-[100] flex w-full justify-between border-b border-white/5 bg-black/70 p-4 backdrop-blur-md md:p-6"
    >
      <div className="relative">
        <button
          type="button"
          aria-label="Сайтын хэсгүүд"
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
          aria-controls="site-sections"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex items-center gap-2 transition-transform active:scale-95"
        >
          <Sun size={22} className="animate-spin-slow text-amber-500" />
          <span className="text-white font-bold tracking-tighter text-2xl">290</span>
          <ChevronDown
            size={16}
            className={`text-zinc-500 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div
          id="site-sections"
          className={`absolute left-0 top-full z-50 mt-2 w-60 transition-all duration-300 ${
            isMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible translate-y-2 opacity-0"
          }`}
        >
          <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/Merch" && pathname.startsWith("/product/"));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-lg px-4 py-3 text-sm transition-colors hover:bg-white/5 hover:text-amber-500 active:bg-amber-500/10 ${
                    isActive ? "bg-amber-500/10 text-amber-500" : "text-zinc-400"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label={isMobileMenuOpen ? "Сошиал цэс хаах" : "Сошиал цэс нээх"}
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((open) => !open)}
        className="md:hidden text-zinc-400 p-2 active:text-amber-500"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <SocialIconLinks
        className={`fixed inset-0 left-0 top-16 flex flex-col items-center justify-center gap-10 bg-black/95 backdrop-blur-xl transition-all duration-300 md:relative md:inset-auto md:flex-row md:gap-6 md:bg-transparent md:backdrop-blur-none ${
          isMobileMenuOpen
            ? "visible opacity-100"
            : "invisible opacity-0 md:visible md:opacity-100"
        }`}
        linkClassName="p-3 text-zinc-500 transition-all duration-500 hover:text-amber-500 active:scale-95"
        onLinkClick={closeMenus}
      />
    </nav>
  );
}
