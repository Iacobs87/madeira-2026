"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { dayHref, dayNumber, days, formatDate, todayIn, TRIP } from "@/lib/trip";

const dayDiff = (a: string, b: string) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);

/** Countdown before the trip, "day X of 12" during it. */
export function TripStatus() {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const ro = todayIn("Europe/Bucharest");
      setToday(ro < TRIP.start ? ro : todayIn(TRIP.timezone));
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!today) return <div className="h-28 animate-pulse rounded-2xl bg-white/10" />;

  if (today < TRIP.start) {
    const left = dayDiff(today, TRIP.start);
    return (
      <div>
        <p className="text-sm text-ocean-100">Până la plecare</p>
        <p className="mt-1 text-5xl font-semibold tabular-nums">
          {left} <span className="text-2xl font-normal">{left === 1 ? "zi" : "zile"}</span>
        </p>
        <p className="mt-1 text-sm text-ocean-100">Plecare din București: {formatDate(TRIP.start)}</p>
      </div>
    );
  }

  const day = days.find((d) => d.date === today);
  if (day) {
    return (
      <div>
        <p className="text-sm text-ocean-100">Azi · {formatDate(today)}</p>
        <p className="mt-1 text-3xl font-semibold">
          Ziua {dayNumber(today)} <span className="text-lg font-normal text-ocean-100">din {days.length}</span>
        </p>
        <p className="mt-1 font-medium">{day.title}</p>
        <Link href={dayHref(day.date)} className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-sm font-medium text-ocean-900">
          Planul de azi →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-ocean-100">Excursia s-a încheiat</p>
      <p className="mt-1 text-2xl font-semibold">Bine ați revenit! 🌺</p>
    </div>
  );
}
