"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const NAV_ITEMS = [
  { href: "/", label: "Acasă", icon: "🏠" },
  { href: "/itinerar/", label: "Itinerar", icon: "📅" },
  { href: "/harta/", label: "Hartă", icon: "🗺️" },
  { href: "/optionale/", label: "Opționale", icon: "💡" },
  { href: "/de-verificat/", label: "De verificat", icon: "⚠️" },
  { href: "/print/", label: "Print", icon: "🖨️" },
];

const norm = (p: string) => (p.endsWith("/") ? p : `${p}/`);

export function Nav() {
  const pathname = norm(usePathname() || "/");
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href) || (href === "/itinerar/" && pathname.startsWith("/zi/"));

  const links = (mobile: boolean) =>
    NAV_ITEMS.map((item) => {
      const active = isActive(item.href);
      return (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition ${
              active ? "bg-white font-medium text-ocean-900" : "text-ocean-50 hover:bg-white/10"
            } ${mobile ? "py-2.5 text-base" : ""}`}
          >
            <span aria-hidden>{item.icon}</span>
            {item.label}
          </Link>
        </li>
      );
    });

  return (
    <header className="no-print sticky top-0 z-[1000] bg-ocean-900/95 text-white shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2 font-display text-lg font-semibold tracking-tight">
          Madeira <span className="font-sans text-sm font-normal text-ocean-200">· 6–17 dec. 2026</span>
        </Link>
        <nav aria-label="Navigare principală" className="hidden md:block">
          <ul className="flex gap-1">{links(false)}</ul>
        </nav>
        <button
          type="button"
          className="rounded-lg px-3 py-1.5 text-sm ring-1 ring-white/30 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕ Închide" : "☰ Meniu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Navigare principală" className="border-t border-white/10 px-4 pb-3 md:hidden">
          <ul className="grid gap-1 pt-2">{links(true)}</ul>
        </nav>
      )}
    </header>
  );
}
