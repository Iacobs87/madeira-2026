import { ExtLink } from "@/components/ui";
import { baggage, cabinSummary, clock, dateOf, flightDuration, formatDate, statusLinks, utcLabel } from "@/lib/trip";
import type { Flight } from "@/lib/types";

export function FlightStatusBadge({ status }: { status: Flight["status"] }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800 ring-1 ring-inset ring-emerald-200">
      <span aria-hidden>✓</span>
      {status}
    </span>
  );
}

export function StatusLinks({ flight }: { flight: Flight }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
      <span className="text-stone-500">Status live:</span>
      {statusLinks(flight).map((l) => (
        <ExtLink key={l.url} href={l.url}>
          {l.label}
        </ExtLink>
      ))}
    </p>
  );
}

/** Boarding-pass style card: route, local times, real duration, airline, status. */
export function FlightCard({ flight: f }: { flight: Flight }) {
  const nextDay = dateOf(f.arrival) !== dateOf(f.departure);
  return (
    <article id={f.id} className="scroll-mt-28 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-stone-200 bg-ocean-50 px-4 py-2">
        <p className="text-sm">
          <strong className="text-ocean-900">{f.number}</strong>
          <span className="text-stone-600">
            {" "}
            · {f.airline}
            {f.operatedBy && <> · operat de {f.operatedBy}</>}
          </span>
        </p>
        <FlightStatusBadge status={f.status} />
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4">
        <div>
          <p className="text-3xl font-semibold tabular-nums text-ocean-900">{clock(f.departure)}</p>
          <p className="font-medium">
            {f.from.city} <span className="text-stone-500">{f.from.code}</span>
          </p>
          <p className="text-xs text-stone-500">
            {formatDate(dateOf(f.departure), true)} · ora locală ({utcLabel(f.from.utcOffset)})
          </p>
        </div>
        <div className="text-center text-xs text-stone-500">
          <span aria-hidden className="block text-lg text-ocean-500">
            ✈
          </span>
          {flightDuration(f)}
        </div>
        <div className="text-right">
          <p className="text-3xl font-semibold tabular-nums text-ocean-900">
            {clock(f.arrival)}
            {nextDay && <sup className="ml-0.5 text-xs font-medium text-flame-600">+1</sup>}
          </p>
          <p className="font-medium">
            {f.to.city} <span className="text-stone-500">{f.to.code}</span>
          </p>
          <p className="text-xs text-stone-500">
            {formatDate(dateOf(f.arrival), true)} · ora locală ({utcLabel(f.to.utcOffset)})
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 px-4 py-2">
        <p className="text-xs text-stone-600">
          Clasă: {cabinSummary(f)}
          {baggage
            .filter((g) => g.seatFlightIds.includes(f.id))
            .map((g) => (
              <span key={g.id}> · 💺 locuri rezervate: {g.group.toLowerCase()}</span>
            ))}
        </p>
        <StatusLinks flight={f} />
      </div>
    </article>
  );
}
