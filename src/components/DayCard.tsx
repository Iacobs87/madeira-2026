import Link from "next/link";
import { CATEGORY, dayHref, dayNumber, formatDate, KIND, timeLabel } from "@/lib/trip";
import type { Category, Day } from "@/lib/types";

/** Summary card for one day: date, title, activities in Excel order, flags. */
export function DayCard({ day, highlight }: { day: Day; highlight?: Category | null }) {
  const kind = KIND[day.kind];
  const toVerify = day.items.filter((i) => i.needsVerification).length;
  return (
    <Link
      href={dayHref(day.date)}
      className={`group flex h-full flex-col rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-ocean-500 hover:shadow-md ${
        day.flexible ? "border-dashed border-stone-300" : "border-stone-200"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-flame-600">
          Ziua {dayNumber(day.date)} · {formatDate(day.date, true)}
        </p>
        {kind && <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${kind.cls}`}>{kind.label}</span>}
      </div>
      <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-ocean-900 group-hover:text-ocean-700">{day.title}</h3>

      {day.items.length === 0 ? (
        <p className="mt-2 text-sm italic text-stone-500">{day.summary ?? "Nicio activitate în Excel."}</p>
      ) : (
        <ul className="mt-2 space-y-1 text-sm">
          {day.items.map((i) => {
            const t = timeLabel(i);
            const dim = highlight && i.category !== highlight;
            return (
              <li key={i.id} className={`flex gap-2 ${dim ? "text-stone-400" : "text-stone-800"}`}>
                <span aria-hidden className={dim ? "opacity-40" : ""}>
                  {CATEGORY[i.category].icon}
                </span>
                <span className="min-w-0">
                  {i.alternative && (
                    <span className="mr-1 rounded bg-flame-100 px-1 text-xs font-semibold text-flame-800">
                      {i.alternative === "B" ? "SAU B" : "A"}
                    </span>
                  )}
                  {t && <span className="mr-1 tabular-nums text-stone-500">{t}</span>}
                  {i.title}
                  {i.duration && <span className="text-stone-500"> · {i.duration}</span>}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap gap-1.5 pt-3 text-xs">
        {day.flexible && <span className="rounded-full bg-stone-100 px-2 py-0.5 text-stone-700">Zi flexibilă</span>}
        {toVerify > 0 && (
          <span className="rounded-full bg-amber-50 px-2 py-0.5 font-medium text-amber-900 ring-1 ring-inset ring-amber-300">
            ! {toVerify} de verificat
          </span>
        )}
      </div>
    </Link>
  );
}
