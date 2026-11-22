import type { Metadata } from "next";
import { Card, DayRef, MapsLink, PageTitle, SectionTitle } from "@/components/ui";
import { optionals } from "@/data/itinerary";
import { CATEGORY, days, places, usesOfPlace } from "@/lib/trip";
import { TripMap } from "./TripMap";

export const metadata: Metadata = { title: "Hartă" };

export default function Harta() {
  const unplaced = days.flatMap((d) =>
    d.items.filter((i) => i.mapsQuery && !(i.placeIds && i.placeIds.length)).map((i) => ({ day: d, item: i })),
  );
  const unplacedOptionals = optionals.filter((o) => !o.placeIds?.length);

  return (
    <>
      <PageTitle
        title="Harta opririlor"
        subtitle="Pinii au poziții din OpenStreetMap, căutate după nume. Unde pinul marchează doar zona (satul, parcul), scrie „aproximativ”. Nu sunt desenate rute și nu sunt estimați timpi de condus."
      />
      <TripMap />

      <SectionTitle>Opriri pe hartă</SectionTitle>
      <ul className="grid gap-2 sm:grid-cols-2">
        {places.map((p) => {
          const uses = usesOfPlace(p.id);
          const dates = [...new Set(uses.map((u) => u.day.date))];
          const query = uses[0]?.item.mapsQuery ?? optionals.find((o) => o.placeIds?.includes(p.id))?.mapsQuery ?? p.name;
          return (
            <li key={p.id} id={p.id} className="scroll-mt-28">
              <Card className="p-3 sm:p-3">
                <p className="font-medium text-ocean-900">{p.name}</p>
                {p.approx && <p className="text-xs text-stone-500">Aproximativ: {p.approx}</p>}
                <p className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-sm">
                  {dates.length ? dates.map((d) => <DayRef key={d} date={d} />) : <span className="text-stone-500">Opțional</span>}
                </p>
                <div className="mt-1">
                  <MapsLink query={query} />
                </div>
              </Card>
            </li>
          );
        })}
      </ul>

      <SectionTitle>Fără poziție verificată</SectionTitle>
      <p className="mb-3 text-sm text-stone-600">
        Aceste opriri nu au fost găsite sigur în OpenStreetMap, așa că nu au pin. Linkul deschide o căutare Google Maps după nume.
      </p>
      <Card>
        <ul className="divide-y divide-stone-100">
          {unplaced.map(({ day, item }) => (
            <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
              <span>
                <span aria-hidden>{CATEGORY[item.category].icon}</span> {item.title}
                <span className="block text-xs">
                  <DayRef date={day.date} />
                </span>
              </span>
              <MapsLink query={item.mapsQuery!} />
            </li>
          ))}
          {unplacedOptionals.map((o) => (
            <li key={o.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
              <span>
                <span aria-hidden>{CATEGORY[o.category].icon}</span> {o.title}
                <span className="block text-xs text-stone-500">Opțional</span>
              </span>
              <MapsLink query={o.mapsQuery} />
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
