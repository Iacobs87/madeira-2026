import Link from "next/link";
import { CATEGORY, dayHref, dayNumber, formatDate, mapsSearch } from "@/lib/trip";
import type { Category } from "@/lib/types";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`print-break rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-5 ${className}`}>{children}</div>
  );
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ocean-900 sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-3xl text-sm text-stone-600">{subtitle}</p>}
    </div>
  );
}

export function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="mb-3 mt-10 scroll-mt-28 font-display text-xl font-semibold text-ocean-900">
      {children}
    </h2>
  );
}

export function Note({ children, tone = "info" }: { children: React.ReactNode; tone?: "info" | "warn" }) {
  const cls = tone === "warn" ? "border-amber-300 bg-amber-50 text-amber-950" : "border-ocean-200 bg-ocean-50 text-ocean-900";
  return <div className={`rounded-xl border px-3 py-2 text-sm ${cls}`}>{children}</div>;
}

export function ExtLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-ocean-700 underline underline-offset-2 hover:text-ocean-900 ${className}`}
    >
      {children}
      <span className="sr-only"> (se deschide într-o filă nouă)</span>
    </a>
  );
}

export function MapsLink({ query, label = "Google Maps" }: { query: string; label?: string }) {
  return (
    <ExtLink href={mapsSearch(query)} className="inline-flex items-center gap-1 text-xs">
      <span aria-hidden>📍</span>
      {label}
    </ExtLink>
  );
}

export function CategoryBadge({ category }: { category: Category }) {
  const c = CATEGORY[category];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${c.cls}`}>
      <span aria-hidden>{c.icon}</span>
      {c.label}
    </span>
  );
}

export function VerifyBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-900 ring-1 ring-inset ring-amber-300">
      <span aria-hidden>!</span>De verificat
    </span>
  );
}

export function DayRef({ date }: { date: string }) {
  return (
    <Link href={dayHref(date)} className="text-ocean-700 underline underline-offset-2 hover:text-ocean-900">
      Ziua {dayNumber(date)} · {formatDate(date, true)}
    </Link>
  );
}
