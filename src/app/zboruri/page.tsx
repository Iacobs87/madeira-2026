import type { Metadata } from "next";
import { FlightCard } from "@/components/FlightCard";
import { DayRef, Note, PageTitle, SectionTitle } from "@/components/ui";
import { dateOf, flights, layover } from "@/lib/trip";
import type { Flight } from "@/lib/types";

export const metadata: Metadata = { title: "Zboruri" };

export default function Zboruri() {
  const dus = flights.filter((f) => f.direction === "dus");
  const intors = flights.filter((f) => f.direction === "intors");
  return (
    <>
      <PageTitle
        title="Zboruri"
        subtitle="Toate cele 4 zboruri sunt confirmate. Orele sunt locale fiecărui aeroport; durata zborului ține cont de diferența de fus orar."
      />

      <Note>
        <strong>Status live</strong> (întârzieri, poartă, terminal): linkurile de sub fiecare zbor deschid Flightradar24, FlightAware sau
        Google. Informațiile apar acolo de obicei cu câteva zile înainte de zbor. Site-ul nu le preia automat.
      </Note>

      <Leg title="Dus — 6 decembrie 2026" legs={dus} />
      <Leg title="Întors — 17–18 decembrie 2026" legs={intors} />
    </>
  );
}

function Leg({ title, legs }: { title: string; legs: Flight[] }) {
  return (
    <>
      <SectionTitle>{title}</SectionTitle>
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
