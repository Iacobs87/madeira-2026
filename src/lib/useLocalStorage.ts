"use client";
import { useCallback, useEffect, useState } from "react";

export const STORAGE_PREFIX = "madeira2026:";

/** State persisted in this browser's localStorage. Renders `initial` first, then loads the stored value. */
export function useLocalStorage<T>(key: string, initial: T) {
  const fullKey = STORAGE_PREFIX + key;
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(fullKey);
      if (stored !== null) setValue(JSON.parse(stored) as T);
    } catch {
      /* ignore corrupt entries */
    }
  }, [fullKey]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const v = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          localStorage.setItem(fullKey, JSON.stringify(v));
        } catch {
          /* storage full or disabled */
        }
        return v;
      });
    },
    [fullKey],
  );

  return [value, update] as const;
}
