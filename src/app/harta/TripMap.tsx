"use client";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { optionals } from "@/data/itinerary";
import { CATEGORY, dayNumber, days, dayOfMonth, places, usesOfPlace } from "@/lib/trip";
import type { Category } from "@/lib/types";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function categoryOf(placeId: string): Category {
  const use = usesOfPlace(placeId)[0];
  return use?.item.category ?? optionals.find((o) => o.placeIds?.includes(placeId))?.category ?? "transport";
}

function datesOf(placeId: string): string[] {
  return [...new Set(usesOfPlace(placeId).map((u) => u.day.date))];
}

/** OpenStreetMap tiles via Leaflet — no API key. Pins only: no drawn routes, no invented travel times. */
export function TripMap() {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<Map<string, import("leaflet").Marker>>(new Map());
  const [day, setDay] = useState<string>("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !el.current || mapRef.current) return;
      const map = L.map(el.current, { scrollWheelZoom: false });
      mapRef.current = map;
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      for (const p of places) {
        const cat = categoryOf(p.id);
        const dates = datesOf(p.id);
        const label = dates.length ? dates.map(dayOfMonth).join(", ") : "★";
        const w = Math.max(26, 14 + label.length * 7);
        const icon = L.divIcon({
          className: "",
          html: `<div style="background:${CATEGORY[cat].color};color:#fff;border:2px solid #fff;border-radius:9999px;width:${w}px;height:26px;box-sizing:border-box;white-space:nowrap;display:flex;align-items:center;justify-content:center;font:600 12px system-ui;box-shadow:0 1px 4px rgba(0,0,0,.35)">${esc(label)}</div>`,
          iconSize: [w, 26],
          iconAnchor: [w / 2, 13],
        });
        const dayLinks = dates
          .map((d) => {
            const dd = days.find((x) => x.date === d)!;
            return `<a href="${basePath}/zi/${d}/">Ziua ${dayNumber(d)} (${dayOfMonth(d)} dec.) · ${esc(dd.title)}</a>`;
          })
          .join("<br>");
        const popup = `<strong>${CATEGORY[cat].icon} ${esc(p.name)}</strong>${p.approx ? `<br><em>Aproximativ: ${esc(p.approx)}</em>` : ""}<br>${
          dayLinks || "<em>Opțional, fără zi alocată</em>"
        }`;
        const m = L.marker([p.lat, p.lng], { icon, title: p.name, keyboard: true }).bindPopup(popup).addTo(map);
        markersRef.current.set(p.id, m);
      }
      fitAll(map, L);

      const hash = decodeURIComponent(location.hash.slice(1));
      const target = markersRef.current.get(hash);
      if (target) {
        map.setView(target.getLatLng(), 13);
        target.openPopup();
      }
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const L = (await import("leaflet")).default;
      const map = mapRef.current;
      if (!map) return;
      const visible: [number, number][] = [];
      for (const p of places) {
        const m = markersRef.current.get(p.id);
        if (!m) continue;
        const show = day === "all" || datesOf(p.id).includes(day);
        if (show) {
          m.addTo(map);
          visible.push([p.lat, p.lng]);
        } else m.remove();
      }
      if (day === "all") fitAll(map, L);
      else if (visible.length === 1) map.setView(visible[0], 12);
      else if (visible.length > 1) map.fitBounds(L.latLngBounds(visible), { padding: [40, 40], maxZoom: 13 });
    })();
  }, [day]);

  const daysWithPins = days.filter((d) => places.some((p) => datesOf(p.id).includes(d.date)));
  const emptyDay = day !== "all" && !daysWithPins.some((d) => d.date === day);

  return (
    <div>
      <div className="no-print mb-2 flex flex-wrap gap-1.5" role="group" aria-label="Arată pe hartă ziua">
        <DayButton active={day === "all"} onClick={() => setDay("all")}>
          Toate
        </DayButton>
        {days.map((d) => (
          <DayButton key={d.date} active={day === d.date} onClick={() => setDay(d.date)}>
            {dayOfMonth(d.date)} dec.
          </DayButton>
        ))}
      </div>
      {emptyDay && (
        <p className="mb-2 rounded-lg bg-stone-100 px-3 py-2 text-sm text-stone-700" role="status">
          Ziua aleasă nu are opriri cu poziție verificată pe hartă.
        </p>
      )}
      <div
        ref={el}
        role="region"
        aria-label="Harta opririlor din Madeira"
        className="h-[62vh] min-h-[380px] w-full overflow-hidden rounded-2xl border border-stone-200 bg-ocean-50"
      />
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-600">
        {(Object.keys(CATEGORY) as Category[]).map((c) => (
          <li key={c} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full" style={{ background: CATEGORY[c].color }} aria-hidden />
            {CATEGORY[c].label}
          </li>
        ))}
        <li>Cifra din pin = ziua din decembrie · ★ = opțional</li>
      </ul>
    </div>
  );
}

function DayButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-sm ${active ? "bg-ocean-700 text-white" : "border border-stone-300 bg-white hover:border-ocean-500"}`}
    >
      {children}
    </button>
  );
}

function fitAll(map: import("leaflet").Map, L: typeof import("leaflet")) {
  map.fitBounds(L.latLngBounds(places.map((p) => [p.lat, p.lng] as [number, number])), { padding: [30, 30] });
}
