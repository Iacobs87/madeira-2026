import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DayStrip } from "@/components/DayStrip";
import { FlightStatusBadge, StatusLinks } from "@/components/FlightCard";
import { CategoryBadge, ExtLink, MapsLink, Note, VerifyBadge } from "@/components/ui";
import { officialLinks } from "@/data/itinerary";
import { CATEGORY, cabinSummary, dayHref, dayNumber, days, flightById, formatDate, KIND, mapsSearch, timeLabel, TRIP } from "@/lib/trip";
import type { Item } from "@/lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return days.map((d) => ({ date: d.date }));
}

export async function generateMetadata({ params }: { params: Promise<{ date: string }> }): Promise<Metadata> {
  const { date } = await params;
  const day = days.find((d) => d.date === date);
  return { title: day ? `Ziua ${dayNumber(date)} · ${day.title}` : "Zi" };
}

export default async function DayPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const idx = days.findIndex((d) => d.date === date);
  if (idx < 0) notFound();
  const day = days[idx];
  const prev = days[idx - 1];
  const next = days[idx + 1];
  const kind = KIND[day.kind];
  const hasHike = day.items.some((i) => i.category === "drumetie" && /PR/.test(i.title));

  return (
    <>
      <DayStrip current={day.date} />

      <header className="mt-5">
        <p className="text-sm font-medium uppercase tracking-wide text-flame-600">
          Ziua {dayNumber(day.date)} din {days.length} · {formatDate(day.date)}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ocean-900 sm:text-4xl">{day.title}</h1>
          {kind && <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${kind.cls}`}>{kind.label}</span>}
          {day.flexible && <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-700">Zi flexibilă</span>}
        </div>
        {day.summary && <p className="mt-2 max-w-2xl text-stone-600">{day.summary}</p>}
        <p className="mt-2 text-sm text-stone-600">
          🏠 {day.date === days[days.length - 1].date ? "Check-out de la" : "Cazare:"}{" "}
          <ExtLink href={mapsSearch(TRIP.stay.mapsQuery)}>{TRIP.stay.short}</ExtLink>{" "}
          <span className="text-stone-500">({TRIP.stay.area})</span>
        </p>
      </header>

      {day.notes && day.notes.length > 0 && (
        <div className="mt-4 space-y-2">
          {day.notes.map((n) => (
            <Note key={n}>💡 {n}</Note>
          ))}
        </div>
      )}

      <section aria-label="Program" className="mt-6">
        {day.items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center">
            <p className="text-3xl" aria-hidden>
              🌤️
            </p>
            <p className="mt-2 font-medium text-ocean-900">Nicio activitate planificată în Excel.</p>
            <p className="mt-1 text-sm text-stone-600">
              Zi bună pentru odihnă, vreme proastă sau un traseu amânat. Vedeți și{" "}
              <Link href="/#optionale" className="text-ocean-700 underline underline-offset-2">
                ideile opționale
              </Link>
              .
            </p>
          </div>
        ) : (
          <ol className="relative space-y-3 border-l-2 border-ocean-100 pl-5 sm:pl-7">
            {day.items.map((item, i) => {
              const prevAlt = day.items[i - 1]?.alternative;
              return (
                <li key={item.id} className="relative">
                  {item.alternative === "B" && prevAlt === "A" && (
                    <p className="-ml-5 mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-flame-600 sm:-ml-7">
                      <span className="h-px flex-1 bg-flame-200" />
                      sau
                      <span className="h-px flex-1 bg-flame-200" />
                    </p>
                  )}
                  <span
                    aria-hidden
                    className="absolute -left-[31px] top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white text-[10px] sm:-left-[39px]"
                    style={{ background: CATEGORY[item.category].color }}
                  />
                  <TimelineItem item={item} />
                </li>
              );
            })}
          </ol>
        )}
      </section>

      {hasHike && (
        <div className="mt-6">
          <Note tone="warn">
            <strong>Înainte de traseu:</strong> verificați dacă e deschis și ce taxă are —{" "}
            <ExtLink href={officialLinks.find((l) => l.url.includes("notice-to-walkers"))!.url}>
              Visit Madeira, trasee deschise / închise
            </ExtLink>
            , <ExtLink href={officialLinks[0].url}>IFCN</ExtLink> și <ExtLink href={officialLinks[2].url}>prognoza IPMA</ExtLink>. Acest
            site nu știe starea actuală a traseelor.
          </Note>
        </div>
      )}

      <p className="mt-4 text-xs text-stone-500">
        Orele sunt {TRIP.timezoneLabel}
        {day.items.some((i) => i.flightId) && ", în afară de zboruri, unde fiecare oră e cea locală a aeroportului"}.
      </p>

      <nav aria-label="Zile vecine" className="no-print mt-8 grid grid-cols-2 gap-3">
        {prev ? (
          <Link href={dayHref(prev.date)} className="rounded-2xl border border-stone-200 bg-white p-3 hover:border-ocean-500">
            <span className="text-xs text-stone-500">← Ziua {dayNumber(prev.date)}</span>
            <span className="block font-medium text-ocean-900">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={dayHref(next.date)} className="rounded-2xl border border-stone-200 bg-white p-3 text-right hover:border-ocean-500">
            <span className="text-xs text-stone-500">Ziua {dayNumber(next.date)} →</span>
            <span className="block font-medium text-ocean-900">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}

function TimelineItem({ item }: { item: Item }) {
  const t = timeLabel(item);
  const flight = item.flightId ? flightById(item.flightId) : undefined;
  return (
    <article
      className={`rounded-2xl border bg-white p-4 shadow-sm ${item.alternative ? "border-flame-200" : "border-stone-200"}`}
      aria-label={item.title}
    >
      <div className="flex flex-wrap items-center gap-2">
        {item.alternative && (
          <span className="rounded-md bg-flame-500 px-2 py-0.5 text-xs font-bold text-white">Varianta {item.alternative}</span>
        )}
        {t && <span className="rounded-md bg-ocean-50 px-2 py-0.5 text-sm font-semibold tabular-nums text-ocean-800">{t}</span>}
        <CategoryBadge category={item.category} />
        {flight && <FlightStatusBadge status={flight.status} />}
        {item.needsVerification && <VerifyBadge />}
      </div>
      <h2 className="mt-2 text-lg font-semibold text-basalt-900">{item.title}</h2>

      {(item.duration || item.price) && (
        <dl className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone-700">
          {item.duration && (
            <div className="flex gap-1">
              <dt>⏱️ Durată:</dt>
              <dd className="font-medium">{item.duration}</dd>
            </div>
          )}
          {item.price && (
            <div className="flex gap-1">
              <dt>💶 Cost:</dt>
              <dd className="font-medium">{item.price}</dd>
            </div>
          )}
        </dl>
      )}

      {item.notes && item.notes.length > 0 && (
        <ul className="mt-2 space-y-0.5 text-sm text-stone-600">
          {item.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}

      {item.trail && (
        <div className="mt-2 rounded-lg bg-laurel-50 px-3 py-2 text-sm text-laurel-900">
          <p>
            <span aria-hidden>📋</span> <strong>Visit Madeira:</strong> {item.trail.facts}
          </p>
          <ExtLink href={item.trail.url} className="text-xs">
            Fișa oficială a traseului (descriere, hartă, cum ajungi)
          </ExtLink>
        </div>
      )}

      {flight && (
        <div className="mt-2 space-y-1">
          <p className="text-sm text-stone-600">
            {flight.airline}
            {flight.operatedBy && ` · operat de ${flight.operatedBy}`} · {cabinSummary(flight)} ·{" "}
            <Link href={`/zboruri/#${flight.id}`} className="text-ocean-700 underline underline-offset-2">
              detalii zbor
            </Link>
          </p>
          <StatusLinks flight={flight} />
        </div>
      )}

      {item.needsVerification && (
        <p className="mt-2 rounded-lg bg-amber-50 px-2.5 py-1.5 text-sm text-amber-950">
          <strong>De verificat:</strong> {item.needsVerification}
        </p>
      )}

      {item.mapsQuery && (
        <div className="mt-3">
          <MapsLink query={item.mapsQuery} label="Caută în Google Maps" />
        </div>
      )}
    </article>
  );
}
