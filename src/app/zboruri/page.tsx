import type { Metadata } from "next";
import { FlightCard } from "@/components/FlightCard";
import { Card, DayRef, Note, PageTitle, SectionTitle } from "@/components/ui";
import { baggage, clock, dateOf, flights, formatDate, journeyTime, layover } from "@/lib/trip";
import type { Flight } from "@/lib/types";
import { BagChecker } from "./BagChecker";

export const metadata: Metadata = { title: "Zboruri" };

export default function Zboruri() {
  const dus = flights.filter((f) => f.direction === "dus");
  const intors = flights.filter((f) => f.direction === "intors");
  return (
    <>
      <PageTitle
        title="Zboruri și bagaje"
        subtitle="Toate cele 4 zboruri sunt confirmate. Orele sunt locale fiecărui aeroport; durata zborului ține cont de diferența de fus orar."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Summary title="Dus" legs={dus} via="Frankfurt" />
        <Summary title="Întors" legs={intors} via="Zürich" />
      </div>
      <nav aria-label="Pe această pagină" className="no-print mt-3 flex flex-wrap gap-2 text-sm">
        {[
          ["#dus", "✈️ Dus"],
          ["#intors", "✈️ Întors"],
          ["#bagaje", "🧳 Bagaje"],
        ].map(([href, label]) => (
          <a key={href} href={href} className="rounded-full border border-stone-300 bg-white px-3 py-1.5 hover:border-ocean-500">
            {label}
          </a>
        ))}
      </nav>

      <Leg id="dus" title="Dus — 6 decembrie 2026" legs={dus} />
      <Leg id="intors" title="Întors — 17–18 decembrie 2026" legs={intors} />

      <div className="mt-6">
        <Note>
          <strong>Status live</strong> (întârzieri, poartă, terminal): linkurile de sub fiecare zbor deschid Flightradar24, FlightAware sau
          Google. Informațiile apar acolo de obicei cu câteva zile înainte de zbor. Site-ul nu le preia automat.
        </Note>
      </div>

      <SectionTitle id="bagaje">🧳 Bagaje incluse</SectionTitle>
      {baggage.map((a) => (
        <div key={a.id} className="space-y-3">
          <p className="text-sm text-stone-600">
            Pentru <strong className="text-ocean-900">{a.group}</strong>, dus și întors, pe toate zborurile:{" "}
            {a.flightIds
              .map((id) => flights.find((f) => f.id === id)?.number)
              .filter(Boolean)
              .join(", ")}
            .
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {a.bags.map((b) => (
              <Card key={b.kind}>
                <p className="text-2xl" aria-hidden>
                  {b.kind === "cabina" ? "🎒" : "🧳"}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ocean-900">{b.label}</h3>
                <dl className="mt-2 grid grid-cols-3 gap-2 text-center">
                  <Fact label="Bucăți / pers." value={String(b.piecesPerPerson)} />
                  <Fact label="Greutate max." value={`${b.maxKg} kg`} />
                  <Fact label="L + l + h max." value={`${b.maxLinearCm} cm`} />
                </dl>
              </Card>
            ))}
          </div>
          {a.notes.map((n) => (
            <Note key={n} tone="warn">
              {n}
            </Note>
          ))}
          <BagChecker limits={a.bags} />
        </div>
      ))}
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-mist-100 px-2 py-2">
      <dd className="text-lg font-semibold tabular-nums text-ocean-900">{value}</dd>
      <dt className="text-[11px] text-stone-600">{label}</dt>
    </div>
  );
}

function Summary({ title, legs, via }: { title: string; legs: Flight[]; via: string }) {
  const first = legs[0];
  const last = legs[legs.length - 1];
  const nextDay = dateOf(last.arrival) !== dateOf(first.departure);
  return (
    <Card className="bg-gradient-to-br from-ocean-700 to-ocean-900 text-white">
      <p className="text-sm text-ocean-100">
        {title} · {formatDate(dateOf(first.departure))}
      </p>
      <p className="mt-1 text-2xl font-semibold">
        {first.from.code} → {last.to.code}
      </p>
      <p className="mt-1 text-sm tabular-nums">
        {clock(first.departure)} → {clock(last.arrival)}
        {nextDay && " (+1)"} · escală {via}
      </p>
      <p className="mt-1 text-xs text-ocean-100">Durata totală, cu escală: {journeyTime(legs)}</p>
    </Card>
  );
}

function Leg({ id, title, legs }: { id: string; title: string; legs: Flight[] }) {
  return (
    <>
      <SectionTitle id={id}>{title}</SectionTitle>
      <p className="-mt-2 mb-3 text-sm">
        <DayRef date={dateOf(legs[0].departure)} />
      </p>
      <ol className="space-y-2">
        {legs.map((f, i) => (
          <li key={f.id}>
            {i > 0 && (
              <p className="my-2 flex items-center gap-2 text-sm text-stone-600">
                <span className="h-px flex-1 bg-stone-200" />
                <span>
                  ⏳ Escală {legs[i - 1].to.city}: <strong>{layover(legs[i - 1], f)}</strong>
                </span>
                <span className="h-px flex-1 bg-stone-200" />
              </p>
            )}
            <FlightCard flight={f} />
          </li>
        ))}
      </ol>
    </>
  );
}
