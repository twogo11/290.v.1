"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu, Sun, X } from "lucide-react";
import { NAV_ITEMS, SOCIAL_LINKS } from "../../constants/site";

const chapters = [
  ["YASHA", "story"],
  ["Хөгжим", "music"],
  ["Ярилцлага", "interviews"],
  ["Хүрээлэл", "collective"],
  ["Дурсамж", "memories"],
];

export default function Navigation() {
  const pathname = usePathname();
  const [active, setActive] = useState("story");
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const home = pathname === "/";
  const currentChapter = home
    ? active
    : ["/Album0", "/Album9"].includes(pathname)
      ? "music"
      : pathname === "/digital-archive"
        ? "interviews"
        : pathname === "/Tuguldur"
          ? "story"
          : "";

  useEffect(() => {
    if (!home) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(["top", "today"].includes(entry.target.id) ? "story" : entry.target.id);
      }
    }, { rootMargin: "-20% 0px -55% 0px" });
    ["top", "today", ...chapters.map(([, id]) => id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [home]);

  useEffect(() => {
    if (!open) return;
    const el = dialog.current;
    el?.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { el?.close(); document.body.style.overflow = before; };
  }, [open]);

  return <>
    <header className={"memory-header " + (home ? "" : "memory-header-inner")}>
      <Link href="/" className="memory-logo" aria-label="290 — Нүүр хуудас">
        <Sun size={22} strokeWidth={1.3} /><span>290</span>
      </Link>
      <span className="header-dedication">МӨНХБААТАРЫН ТӨГӨЛДӨР<span>ХАЙРЛАН ДУРСАХУЙ</span></span>
      <button type="button" className="memory-menu-button" aria-label="Бүх хэсгийг нээх" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <span>Цэс</span><Menu size={19} />
      </button>
    </header>
    <nav className="memory-dock" aria-label="Үндсэн цэс">
      {chapters.map(([label, id]) => {
        const selected = currentChapter === id;
        return <Link key={id} href={"/#" + id} className={(selected ? "dock-active " : "") + (id === "memories" ? "dock-memory" : "")} aria-current={selected ? "location" : undefined}>
          {selected && <motion.span className="dock-current-light" layoutId="memory-dock-light" initial={false} transition={{ type: "spring", stiffness: 420, damping: 40, mass: 0.55 }} aria-hidden="true" />}
          <span className="dock-label">{label}</span>
        </Link>;
      })}
    </nav>
    <dialog ref={dialog} className="memory-menu-dialog" aria-labelledby="memory-menu-title" onClose={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="memory-menu-sheet">
        <div className="menu-heading"><span id="memory-menu-title">290 / DIGITAL MEMORY</span><button type="button" aria-label="Цэс хаах" onClick={() => setOpen(false)}><X size={25} /></button></div>
        <Link href="/" className="menu-home" onClick={() => setOpen(false)}>Нүүр хуудас <ArrowUpRight /></Link>
        {NAV_ITEMS.map((item, i) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><small>{"0" + (i + 1)}</small><span>{item.label}</span><ArrowUpRight size={20} /></Link>)}
        <div className="menu-socials">{SOCIAL_LINKS.map((item) => <a href={item.url} key={item.name} target="_blank" rel="noreferrer">{item.name}<ArrowUpRight size={13} /></a>)}</div>
      </div>
    </dialog>
  </>;
}
