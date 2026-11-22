import type { Metadata } from "next";
import { PageTitle } from "@/components/ui";
import { days, TRIP } from "@/lib/trip";
import { ItineraryFilters } from "./ItineraryFilters";

export const metadata: Metadata = { title: "Itinerar" };

export default function Itinerar() {
  return (
    <>
      <PageTitle
        title="Itinerar zi cu zi"
        subtitle={`${days.length} zile, 6–17 decembrie 2026. Activitățile sunt în ordinea din Excel; orele apar doar unde există în sursă (${TRIP.timezoneLabel}). Apăsați pe o zi pentru detalii și linkuri Google Maps.`}
      />
      <ItineraryFilters />
    </>
  );
}
