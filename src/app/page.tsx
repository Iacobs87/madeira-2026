import Link from "next/link";
import { DayCard } from "@/components/DayCard";
import { HeroArt } from "@/components/Hero";
import { TripStatus } from "@/components/TripStatus";
import { Card, ExtLink, Note, SectionTitle } from "@/components/ui";
import { officialLinks, optionals } from "@/data/itinerary";
import { CATEGORY, days, formatDate, TRIP } from "@/lib/trip";

export default function Home() {
  const all = days.flatMap((d) => d.items);
  const hikes = all.filter((i) => i.category === "drumetie" && /^„?PR/.test(i.title) && i.alternative !== "B").length;
  const viewpoints = all.filter((i) => i.category === "viewpoint").length;
  const flexible = days.filter((d) => d.flexible).length;
  const nights = days.length - 1;

  return (
    <>
      <section className="relative -mx-4 -mt-6 overflow-hidden text-white sm:mx-0 sm:mt-0 sm:rounded-3xl">
        <HeroArt className="absolute inset-0 h-full w-full" />
        <div className="relative grid gap-6 px-5 pb-16 pt-10 sm:px-10 sm:pb-24 sm:pt-14 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-ocean-100">Excursie · decembrie 2026</p>
            <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight sm:text-6xl">{TRIP.title}</h1>
            <p className="mt-2 max-w-md text-lg text-ocean-50">{TRIP.subtitle}</p>
            <p className="mt-4 text-sm text-ocean-100">
              {formatDate(TRIP.start)} – {formatDate(TRIP.end)} · {days.length} zile · {nights} nopți
            </p>
          </div>
          <div className="rounded-2xl bg-ocean-900/50 p-5 ring-1 ring-white/15 backdrop-blur-sm">
            <TripStatus />
          </div>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
        <Stat label="Trasee PR planificate" value={hikes} hint="7 dec. numărat o dată (A sau B)" />
        <Stat label="Viewpoint-uri" value={viewpoints} hint="plus opționale" />
        <Stat label="Zile flexibile" value={flexible} hint="10, 15 și 16 dec." />
      </div>

      <SectionTitle>Cele {days.length} zile</SectionTitle>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {days.map((d) => (
          <li key={d.date}>
            <DayCard day={d} />
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-3 md:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-semibold text-ocean-900">💡 Opționale</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {optionals.map((o) => (
              <li key={o.id}>
                {CATEGORY[o.category].icon} {o.title} <span className="text-stone-500">— fără zi alocată</span>
              </li>
            ))}
          </ul>
          <Link href="/optionale/" className="mt-2 inline-block text-sm text-ocean-700 underline underline-offset-2">
            Vezi opționalele
          </Link>
        </Card>
        <Card>
          <h2 className="font-display text-lg font-semibold text-ocean-900">🔗 Surse oficiale</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {officialLinks.map((l) => (
              <li key={l.url}>
                <ExtLink href={l.url}>{l.label}</ExtLink>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6">
        <Note tone="warn">
          <strong>Traseele nu sunt garantate deschise.</strong> Verificați starea fiecărui traseu PR pe site-ul IFCN cu 1–2 zile înainte.{" "}
          <Link href="/de-verificat/" className="underline underline-offset-2">
            Lista completă de verificat
          </Link>
        </Note>
      </div>
    </>
  );
}

function Stat({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <Card className="p-3 sm:p-4">
      <p className="text-xs text-stone-500">{label}</p>
      <p className="mt-0.5 text-3xl font-semibold tabular-nums text-ocean-900">{value}</p>
      <p className="text-xs text-stone-500">{hint}</p>
    </Card>
  );
}
