import { days, places, TRIP } from "@/data/itinerary";
import type { Category, Day, DayKind, Item, Place } from "./types";

export { days, places, TRIP };

export const CATEGORY: Record<Category, { label: string; icon: string; cls: string; color: string }> = {
  drumetie: { label: "Drumeții & levade", icon: "🥾", cls: "bg-laurel-100 text-laurel-900 ring-laurel-200", color: "#2f6b45" },
  viewpoint: { label: "Viewpoint", icon: "🌄", cls: "bg-sky-100 text-sky-900 ring-sky-200", color: "#1d6fa3" },
  oras: { label: "Oraș & localități", icon: "🏘️", cls: "bg-violet-100 text-violet-900 ring-violet-200", color: "#7046a8" },
  transport: { label: "Transport", icon: "🚗", cls: "bg-stone-100 text-stone-800 ring-stone-200", color: "#57534e" },
  masa: { label: "Masă", icon: "🍽️", cls: "bg-amber-100 text-amber-900 ring-amber-200", color: "#b45309" },
  activitate: { label: "Activități", icon: "✨", cls: "bg-pink-100 text-pink-900 ring-pink-200", color: "#be185d" },
};

export const KIND: Record<DayKind, { label: string; cls: string } | null> = {
  normal: null,
  sosire: { label: "Sosire", cls: "bg-ocean-100 text-ocean-900" },
  plecare: { label: "Plecare", cls: "bg-ocean-100 text-ocean-900" },
  alternative: { label: "Variante A / B", cls: "bg-flame-100 text-flame-800" },
  liber: { label: "Zi liberă", cls: "bg-stone-200 text-stone-800" },
  tampon: { label: "Zi tampon", cls: "bg-stone-200 text-stone-800" },
};

const DATE_FMT = new Intl.DateTimeFormat("ro-RO", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
const SHORT_FMT = new Intl.DateTimeFormat("ro-RO", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
const DAYNUM_FMT = new Intl.DateTimeFormat("ro-RO", { day: "numeric", timeZone: "UTC" });
const WEEKDAY_FMT = new Intl.DateTimeFormat("ro-RO", { weekday: "short", timeZone: "UTC" });

const asDate = (iso: string) => new Date(`${iso}T00:00:00Z`);
export const formatDate = (iso: string, short = false) => (short ? SHORT_FMT : DATE_FMT).format(asDate(iso));
export const dayOfMonth = (iso: string) => DAYNUM_FMT.format(asDate(iso));
export const weekday = (iso: string) => WEEKDAY_FMT.format(asDate(iso)).replace(".", "");

export const totalDays = days.length;
export const dayNumber = (iso: string) => days.findIndex((d) => d.date === iso) + 1;
export const dayHref = (iso: string) => `/zi/${iso}/`;

/** Today's date (YYYY-MM-DD) in a time zone. */
export function todayIn(tz: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

export const placeById = (id: string): Place | undefined => places.find((p) => p.id === id);

export function mapsSearch(q: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export function timeLabel(item: Item): string | null {
  if (item.startTime && item.endTime) return `${item.startTime} → ${item.endTime}`;
  return item.startTime ?? null;
}

export function dayCategories(day: Day): Category[] {
  return [...new Set(day.items.map((i) => i.category))];
}

/** Every activity that the source marks as unclear, in trip order. */
export function verificationItems() {
  return days.flatMap((d) => d.items.filter((i) => i.needsVerification).map((i) => ({ day: d, item: i })));
}

/** Which days (and activities) use a given place. */
export function usesOfPlace(placeId: string) {
  return days.flatMap((d) => d.items.filter((i) => i.placeIds?.includes(placeId)).map((i) => ({ day: d, item: i })));
}
