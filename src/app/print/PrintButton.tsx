"use client";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="rounded-lg bg-ocean-700 px-3 py-2 font-medium text-white hover:bg-ocean-800">
      🖨️ Printează / PDF
    </button>
  );
}
