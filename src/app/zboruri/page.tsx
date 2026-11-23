import type { Metadata } from "next";
import { FlightCard } from "@/components/FlightCard";
import { Card, DayRef, ExtLink, Note, PageTitle, SectionTitle } from "@/components/ui";
import { baggage, clock, dateOf, flights, formatDate, journeyTime, layover, ticketNotes } from "@/lib/trip";
import { eur } from "@/lib/money";
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
          ["#check-in", "✅ Check-in"],
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

      <SectionTitle id="bagaje">🧳 Bagaje și tarife, pe grupe</SectionTitle>
      <p className="-mt-1 mb-3 text-sm text-stone-600">Din biletele SWISS. Valabil pe toate cele 4 zboruri, dus și întors.</p>
      <div className="grid gap-3 lg:grid-cols-2">
        {baggage.map((a) => (
          <Card key={a.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl font-semibold text-ocean-900">{a.group}</h3>
              <span className="rounded-full bg-ocean-50 px-2.5 py-0.5 text-xs font-medium text-ocean-800">{a.fare}</span>
            </div>
            <p className="text-sm text-stone-600">{a.members.join(", ")}</p>
            <div className="mt-3 space-y-2">
              {a.bags.map((b) => (
                <div key={b.kind} className="flex items-center gap-3 rounded-xl bg-mist-100 px-3 py-2">
                  <span className="text-2xl" aria-hidden>
                    {b.kind === "cabina" ? "🎒" : "🧳"}
                  </span>
                  <div className="text-sm">
                    <p className="font-medium text-ocean-900">
                      {b.piecesPerPerson} × {b.label.toLowerCase()}
                    </p>
                    <p className="tabular-nums text-stone-600">
                      max. {b.maxKg} kg · max. {b.maxLinearCm} cm (L + l + h)
                    </p>
                  </div>
                </div>
              ))}
              {!a.bags.some((b) => b.kind === "cala") && (
                <div className="flex items-center gap-3 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-900">
                  <span className="text-2xl" aria-hidden>
                    🚫
                  </span>
                  <p className="font-medium">Fără bagaj de cală inclus</p>
                </div>
              )}
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
              <dt className="text-stone-500">Preț bilet</dt>
              <dd className="text-right font-medium tabular-nums">{eur(a.pricePerPerson)} / pers.</dd>
              <dt className="text-stone-500">Locuri rezervate</dt>
              <dd className="text-right">
                {a.seatFlightIds.length
                  ? a.seatFlightIds.map((id) => flights.find((f) => f.id === id)?.number).join(", ")
                  : "nu"}
              </dd>
            </dl>
            {a.notes.map((n) => (
              <p key={n} className="mt-2 text-sm text-stone-600">
                {n}
              </p>
            ))}
          </Card>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {ticketNotes.map((n) => (
          <Note key={n} tone={n.includes("obiect personal") ? "warn" : "info"}>
            {n}
          </Note>
        ))}
      </div>

      <div className="mt-3">
        <BagChecker
          limits={baggage
            .flatMap((a) => a.bags)
            .filter((b, i, all) => all.findIndex((x) => x.kind === b.kind) === i)
            .map((b) => (b.kind === "cala" ? { ...b, label: "Bagaj de cală (doar fete)" } : b))}
        />
      </div>

      <SectionTitle id="check-in">Check-in și bilete</SectionTitle>
      <Card>
        <ul className="space-y-1.5 text-sm">
          <li>
            ✅ Check-in online: <ExtLink href="https://www.swiss.com/webcheckin">swiss.com/webcheckin</ExtLink>
          </li>
          <li>
            ⚠️ Ce nu aveți voie în bagaje: <ExtLink href="https://www.swiss.com/dangerousgoods">swiss.com/dangerousgoods</ExtLink>
          </li>
          <li>☎️ SWISS Service Center, din România: +40 21 655 07 19</li>
          <li>
            📄 Biletele electronice (PDF) nu sunt pe acest site, pentru că site-ul e public, iar codul de rezervare plus numele ajung
            ca să modifice rezervarea. Le găsiți în emailul de la SWISS sau în dosarul comun al grupului.
          </li>
        </ul>
      </Card>
    </>
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
