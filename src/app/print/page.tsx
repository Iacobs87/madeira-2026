import type { Metadata } from "next";
import { baggage, generalChecks, optionals } from "@/data/itinerary";
import { CATEGORY, clock, dateOf, dayNumber, days, flightDuration, flights, formatDate, timeLabel, TRIP } from "@/lib/trip";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = { title: "Itinerar printabil" };

export default function Print() {
  return (
    <article className="text-sm">
      <div className="no-print mb-4 flex items-center justify-between gap-3">
        <p className="text-stone-600">Versiune pentru print sau „Salvează ca PDF”.</p>
        <PrintButton />
      </div>

      <h1 className="font-display text-2xl font-semibold">Madeira · 6–17 decembrie 2026</h1>
      <p className="text-stone-600">
        {days.length} zile · orele sunt {TRIP.timezoneLabel} · sursa: {TRIP.source}
      </p>

      <h2 className="mt-4 border-b pb-1 text-lg font-semibold">Zboruri (confirmate)</h2>
      <table className="mt-1 w-full">
        <tbody>
          {flights.map((f) => (
            <tr key={f.id} className="border-b border-stone-100 align-top">
              <td className="py-1 pr-2 whitespace-nowrap">{formatDate(dateOf(f.departure), true)}</td>
              <td className="py-1 pr-2 font-medium">{f.number}</td>
              <td className="py-1 pr-2">
                {f.from.city} ({f.from.code}) → {f.to.city} ({f.to.code})
                <span className="block text-stone-500">
                  {f.airline}
                  {f.operatedBy && `, operat de ${f.operatedBy}`} · {f.cabin}
                </span>
              </td>
              <td className="py-1 whitespace-nowrap tabular-nums">
                {clock(f.departure)} → {clock(f.arrival)}
                {dateOf(f.arrival) !== dateOf(f.departure) && " (+1)"} · {flightDuration(f)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {baggage.map((a) => (
        <p key={a.id} className="mt-1 text-stone-700">
          <strong>Bagaje {a.group}:</strong>{" "}
          {a.bags.map((b) => `${b.label.toLowerCase()} ${b.piecesPerPerson}×${b.maxKg} kg, max. ${b.maxLinearCm} cm (L+l+h)`).join(" · ")}
          {" "}/ persoană, pe toate zborurile.
        </p>
      ))}

      <h2 className="mt-4 border-b pb-1 text-lg font-semibold">Program</h2>
      {days.map((d) => (
        <section key={d.date} className="print-break border-b border-stone-200 py-2">
          <h2 className="font-semibold">
            Ziua {dayNumber(d.date)} · {formatDate(d.date)} — {d.title}
          </h2>
          {d.items.length === 0 ? (
            <p className="italic text-stone-500">Nicio activitate în Excel.</p>
          ) : (
            <ul className="mt-1 space-y-0.5">
              {d.items.map((i) => {
                const t = timeLabel(i);
                return (
                  <li key={i.id}>
                    <span aria-hidden>{CATEGORY[i.category].icon}</span> {i.alternative && <strong>[Varianta {i.alternative}] </strong>}
                    {t && <span className="tabular-nums">{t} · </span>}
                    {i.title}
                    {i.duration && ` · ${i.duration}`}
                    {i.price && ` · ${i.price}`}
                    {i.needsVerification && <span className="text-amber-800"> · de verificat</span>}
                  </li>
                );
              })}
            </ul>
          )}
          {d.notes?.map((n) => (
            <p key={n} className="text-stone-600">
              Notă: {n}
            </p>
          ))}
        </section>
      ))}

      <h2 className="mt-5 border-b pb-1 text-lg font-semibold">Opționale (fără zi)</h2>
      <ul className="mt-1 list-disc pl-5">
        {optionals.map((o) => (
          <li key={o.id}>{o.title}</li>
        ))}
      </ul>

      <h2 className="mt-5 border-b pb-1 text-lg font-semibold">De verificat</h2>
      <ul className="mt-1 list-disc pl-5">
        {generalChecks.map((g) => (
          <li key={g.id}>
            <strong>{g.label}:</strong> {g.detail}
          </li>
        ))}
        {days.flatMap((d) =>
          d.items
            .filter((i) => i.needsVerification)
            .map((i) => (
              <li key={i.id}>
                <strong>
                  {formatDate(d.date, true)} · {i.title}:
                </strong>{" "}
                {i.needsVerification}
              </li>
            )),
        )}
      </ul>
    </article>
  );
}
