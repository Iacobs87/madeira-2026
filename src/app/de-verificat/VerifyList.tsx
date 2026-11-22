"use client";
import Link from "next/link";
import { Card } from "@/components/ui";
import { useLocalStorage } from "@/lib/useLocalStorage";

export interface Row {
  id: string;
  label: string;
  detail: string;
  href?: string;
  hrefLabel?: string;
}

/** Checklist of things to clarify; ticks are saved in this browser only. */
export function VerifyList({ rows }: { rows: Row[] }) {
  const [done, setDone] = useLocalStorage<Record<string, boolean>>("verificat", {});
  const count = rows.filter((r) => done[r.id]).length;
  return (
    <Card>
      <p className="mb-2 text-sm text-stone-600" aria-live="polite">
        {count} din {rows.length} lămurite · bifele se salvează doar pe acest dispozitiv
      </p>
      <ul className="divide-y divide-stone-100">
        {rows.map((r) => (
          <li key={r.id} className="py-1">
            <label className="flex cursor-pointer items-start gap-3 rounded-lg px-1 py-2 hover:bg-mist-50">
              <input
                type="checkbox"
                checked={!!done[r.id]}
                onChange={(e) => setDone((d) => ({ ...d, [r.id]: e.target.checked }))}
                className="mt-0.5 h-5 w-5 shrink-0 accent-ocean-600"
              />
              <span className={done[r.id] ? "text-stone-400 line-through" : ""}>
                <span className="block text-sm font-medium">{r.label}</span>
                <span className="block text-sm text-stone-600">{r.detail}</span>
              </span>
            </label>
            {r.href && (
              <Link href={r.href} className="ml-9 text-xs text-ocean-700 underline underline-offset-2">
                {r.hrefLabel}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
