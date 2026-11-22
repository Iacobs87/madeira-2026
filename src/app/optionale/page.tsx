import type { Metadata } from "next";
import Link from "next/link";
import { Card, CategoryBadge, MapsLink, Note, PageTitle } from "@/components/ui";
import { optionals } from "@/data/itinerary";
import { dayHref, days } from "@/lib/trip";

export const metadata: Metadata = { title: "Opționale" };

export default function Optionale() {
  const flexible = days.filter((d) => d.flexible);
  return (
    <>
      <PageTitle
        title="Idei opționale"
        subtitle="Din coloanele laterale ale Excelului. Nu au zi alocată și nu sunt activități programate."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {optionals.map((o) => (
          <Card key={o.id}>
            <CategoryBadge category={o.category} />
            <h2 className="mt-2 font-display text-xl font-semibold text-ocean-900">{o.title}</h2>
            <p className="mt-1 text-sm text-stone-600">{o.note}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              <MapsLink query={o.mapsQuery} />
              {o.placeIds?.[0] && (
                <Link href={`/harta/#${o.placeIds[0]}`} className="text-xs text-ocean-700 underline underline-offset-2">
                  🗺️ Pe harta excursiei
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Note>
          Zile cu loc în program:{" "}
          {flexible.map((d, i) => (
            <span key={d.date}>
              {i > 0 && ", "}
              <Link href={dayHref(d.date)} className="underline underline-offset-2">
                {d.title.toLowerCase()} ({d.date.slice(8)} dec.)
              </Link>
            </span>
          ))}
          .
        </Note>
      </div>
    </>
  );
}
