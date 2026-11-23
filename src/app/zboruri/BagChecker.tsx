"use client";
import { useId, useState } from "react";
import { Card } from "@/components/ui";
import type { BagLimit } from "@/lib/types";

type Field = "l" | "w" | "h" | "kg";
const FIELDS: { id: Field; label: string; unit: string }[] = [
  { id: "l", label: "Lungime", unit: "cm" },
  { id: "w", label: "Lățime", unit: "cm" },
  { id: "h", label: "Înălțime", unit: "cm" },
  { id: "kg", label: "Greutate", unit: "kg" },
];

const num = (s: string) => {
  const n = Number(s.replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : null;
};

/** Checks one bag against the cabin and checked-baggage limits. Nothing is saved. */
export function BagChecker({ limits }: { limits: BagLimit[] }) {
  const uid = useId();
  const [v, setV] = useState<Record<Field, string>>({ l: "", w: "", h: "", kg: "" });
  const l = num(v.l), w = num(v.w), h = num(v.h), kg = num(v.kg);
  const sum = l && w && h ? Math.round((l + w + h) * 10) / 10 : null;

  return (
    <Card>
      <h3 className="font-semibold text-ocean-900">Verifică un bagaj</h3>
      <p className="mt-0.5 text-sm text-stone-600">Măsurați cu roți și mânere incluse, iar greutatea cu bagajul plin.</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {FIELDS.map((f) => (
          <label key={f.id} htmlFor={`${uid}-${f.id}`} className="text-sm">
            <span className="text-stone-700">{f.label}</span>
            <span className="mt-1 flex items-center rounded-lg border border-stone-300 bg-white focus-within:border-ocean-500">
              <input
                id={`${uid}-${f.id}`}
                inputMode="decimal"
                value={v[f.id]}
                onChange={(e) => setV({ ...v, [f.id]: e.target.value })}
                className="w-full min-w-0 rounded-lg bg-transparent px-2.5 py-2 tabular-nums outline-none"
              />
              <span className="pr-2.5 text-stone-500">{f.unit}</span>
            </span>
          </label>
        ))}
      </div>

      <div className="mt-3 text-sm" aria-live="polite">
        {sum === null && kg === null ? (
          <p className="text-stone-500">Completați dimensiunile și/sau greutatea.</p>
        ) : (
          <>
            {sum !== null && (
              <p className="mb-2 text-stone-700">
                Total dimensiuni: <strong className="tabular-nums">{sum} cm</strong>
              </p>
            )}
            <ul className="grid gap-2 sm:grid-cols-2">
              {limits.map((b) => {
                const sizeOk = sum === null ? null : sum <= b.maxLinearCm;
                const kgOk = kg === null ? null : kg <= b.maxKg;
                const ok = sizeOk !== false && kgOk !== false;
                return (
                  <li
                    key={b.kind}
                    className={`rounded-xl px-3 py-2 ring-1 ring-inset ${
                      ok ? "bg-emerald-50 text-emerald-900 ring-emerald-200" : "bg-rose-50 text-rose-900 ring-rose-200"
                    }`}
                  >
                    <p className="font-medium">
                      {ok ? "✓" : "✕"} {b.label}: {ok ? "se încadrează" : "depășește"}
                    </p>
                    <p className="text-xs">
                      {sizeOk !== null && (
                        <>
                          Dimensiuni {sum} / {b.maxLinearCm} cm{sizeOk ? "" : ` (+${Math.round((sum! - b.maxLinearCm) * 10) / 10} cm)`}
                        </>
                      )}
                      {sizeOk !== null && kgOk !== null && " · "}
                      {kgOk !== null && (
                        <>
                          Greutate {kg} / {b.maxKg} kg{kgOk ? "" : ` (+${Math.round((kg! - b.maxKg) * 10) / 10} kg)`}
                        </>
                      )}
                    </p>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </Card>
  );
}
