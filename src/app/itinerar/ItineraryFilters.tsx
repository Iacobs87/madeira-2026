"use client";
import { useMemo, useState } from "react";
import { DayCard } from "@/components/DayCard";
import { CATEGORY, days } from "@/lib/trip";
import type { Category } from "@/lib/types";

type Filter = "toate" | "flexibile" | Category;

const FILTERS: { id: Filter; label: string; icon: string }[] = [
  { id: "toate", label: "Toate zilele", icon: "📅" },
  { id: "drumetie", label: CATEGORY.drumetie.label, icon: CATEGORY.drumetie.icon },
  { id: "viewpoint", label: CATEGORY.viewpoint.label, icon: CATEGORY.viewpoint.icon },
  { id: "oras", label: CATEGORY.oras.label, icon: CATEGORY.oras.icon },
  { id: "transport", label: CATEGORY.transport.label, icon: CATEGORY.transport.icon },
  { id: "masa", label: CATEGORY.masa.label, icon: CATEGORY.masa.icon },
  { id: "flexibile", label: "Zile flexibile", icon: "🌦️" },
];

export function ItineraryFilters() {
  const [filter, setFilter] = useState<Filter>("toate");

  const shown = useMemo(() => {
    if (filter === "toate") return days;
    if (filter === "flexibile") return days.filter((d) => d.flexible);
    return days.filter((d) => d.items.some((i) => i.category === filter));
  }, [filter]);

  const highlight = filter !== "toate" && filter !== "flexibile" ? filter : null;

  return (
    <>
      <div role="group" aria-label="Filtrează zilele" className="no-print mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ${
              filter === f.id ? "bg-ocean-700 text-white" : "border border-stone-300 bg-white text-stone-800 hover:border-ocean-500"
            }`}
          >
            <span aria-hidden>{f.icon}</span>
            {f.label}
          </button>
        ))}
      </div>

      <p className="mb-3 text-sm text-stone-600" aria-live="polite">
        {shown.length} {shown.length === 1 ? "zi" : "zile"}
        {highlight && " · activitățile din alte categorii apar estompate"}
      </p>

      {shown.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-sm text-stone-600">
          Nicio zi nu are activități în această categorie.
          <button type="button" onClick={() => setFilter("toate")} className="ml-1 text-ocean-700 underline underline-offset-2">
            Arată toate zilele
          </button>
        </div>
      ) : (
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((d) => (
            <li key={d.date}>
              <DayCard day={d} highlight={highlight} />
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
