export type Category = "drumetie" | "viewpoint" | "oras" | "transport" | "masa" | "activitate";

/** A point on the map. Coordinates come from OpenStreetMap (Nominatim), never typed in by hand. */
export interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  /** Set when the pin marks the surrounding area (village, park) rather than the exact stop. */
  approx?: string;
}

export interface Item {
  id: string;
  title: string;
  category: Category;
  /** Local Madeira time (WET, UTC+0) unless the note says otherwise. Only when the Excel has one. */
  startTime?: string;
  endTime?: string;
  duration?: string;
  /** Price note copied from the Excel — not a current tariff. */
  price?: string;
  notes?: string[];
  /** "A" / "B" when the day offers alternatives: only one of them is done. */
  alternative?: "A" | "B";
  /** Why this item must be checked before the trip. */
  needsVerification?: string;
  /** Google Maps search text (built from the name, no coordinates). */
  mapsQuery?: string;
  /** Ids of geocoded places (see `places`). */
  placeIds?: string[];
  /** Id of a flight in `flights`: the timeline shows its details and status links. */
  flightId?: string;
}

export interface Airport {
  code: string;
  city: string;
  /** Fixed UTC offset in December (no DST change during the trip). */
  utcOffset: number;
}

export interface Flight {
  id: string;
  number: string;
  airline: string;
  operatedBy?: string;
  from: Airport;
  to: Airport;
  /** Local times, "YYYY-MM-DDTHH:MM". */
  departure: string;
  arrival: string;
  cabin: string;
  status: "Confirmat";
  direction: "dus" | "intors";
  /** ICAO designator for FlightAware, only when it resolves there. */
  flightAware?: string;
}

export type DayKind = "normal" | "alternative" | "liber" | "tampon" | "sosire" | "plecare";

export interface Day {
  date: string;
  title: string;
  kind: DayKind;
  /** Free or buffer days, or days whose plan is still open. */
  flexible?: boolean;
  summary?: string;
  notes?: string[];
  items: Item[];
}

export interface OptionalIdea {
  id: string;
  title: string;
  category: Category;
  note: string;
  mapsQuery: string;
  placeIds?: string[];
}

export interface VerifyItem {
  id: string;
  label: string;
  detail: string;
  date?: string;
}
