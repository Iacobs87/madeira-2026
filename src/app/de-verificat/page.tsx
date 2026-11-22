import type { Metadata } from "next";
import { Card, ExtLink, Note, PageTitle, SectionTitle } from "@/components/ui";
import { generalChecks, officialLinks } from "@/data/itinerary";
import { dayHref, dayNumber, formatDate, verificationItems } from "@/lib/trip";
import { VerifyList, type Row } from "./VerifyList";

export const metadata: Metadata = { title: "De verificat" };

export default function DeVerificat() {
  const fromDays: Row[] = verificationItems().map(({ day, item }) => ({
    id: item.id,
    label: `${formatDate(day.date, true)} · ${item.title}`,
    detail: item.needsVerification!,
    href: dayHref(day.date),
    hrefLabel: `Deschide ziua ${dayNumber(day.date)}`,
  }));
  const general: Row[] = generalChecks.map((g) => ({
    id: g.id,
    label: g.label,
    detail: g.detail,
    href: g.date ? dayHref(g.date) : undefined,
    hrefLabel: g.date ? `Deschide ziua ${dayNumber(g.date)}` : undefined,
  }));

  return (
    <>
      <PageTitle
        title="De verificat"
        subtitle="Neclaritățile din Excel și tot ce trebuie confirmat înainte de plecare. Nimic din acest site nu e rezervat."
      />

      <Note tone="warn">
        Acest site nu are acces la starea actuală a traseelor. <strong>Nu presupuneți că un traseu e deschis</strong>: verificați pe site-ul IFCN
        cu 1–2 zile înainte și din nou în dimineața respectivă.
      </Note>

      <SectionTitle>Surse oficiale</SectionTitle>
      <Card>
        <ul className="space-y-1.5 text-sm">
          {officialLinks.map((l) => (
            <li key={l.url}>
              <ExtLink href={l.url}>{l.label}</ExtLink>
            </li>
          ))}
        </ul>
      </Card>

      <SectionTitle>Generale</SectionTitle>
      <VerifyList rows={general} />

      <SectionTitle>Neclarități pe zile</SectionTitle>
      <VerifyList rows={fromDays} />
    </>
  );
}
