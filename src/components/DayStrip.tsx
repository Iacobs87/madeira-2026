import Link from "next/link";
import { dayHref, dayNumber, dayOfMonth, days, weekday } from "@/lib/trip";

/** Quick jump between the 12 days. */
export function DayStrip({ current }: { current?: string }) {
  return (
    <nav aria-label="Zilele excursiei" className="no-print scrollbar-none -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ol className="flex gap-1.5 pb-1">
        {days.map((d) => {
          const active = d.date === current;
          return (
            <li key={d.date}>
              <Link
                href={dayHref(d.date)}
                aria-current={active ? "page" : undefined}
                aria-label={`Ziua ${dayNumber(d.date)}: ${d.title}`}
                className={`flex w-12 flex-col items-center rounded-xl border py-1.5 text-center transition ${
                  active
                    ? "border-ocean-700 bg-ocean-700 text-white"
                    : d.flexible
                      ? "border-dashed border-stone-300 bg-white text-stone-700 hover:border-ocean-500"
                      : "border-stone-200 bg-white text-ocean-900 hover:border-ocean-500"
                }`}
              >
                <span className={`text-[10px] uppercase ${active ? "text-ocean-100" : "text-stone-500"}`}>{weekday(d.date)}</span>
                <span className="text-lg font-semibold leading-tight tabular-nums">{dayOfMonth(d.date)}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
