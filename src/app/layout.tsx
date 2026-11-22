import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Private trip site: keep search engines out, no social preview tags.
export const metadata: Metadata = {
  title: { default: "Madeira · 6–17 decembrie 2026", template: "%s · Madeira 2026" },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: { index: false, follow: false, noimageindex: true, nosnippet: true },
  },
  referrer: "no-referrer",
  manifest: `${basePath}/manifest.webmanifest`,
  icons: { icon: `${basePath}/icon.svg`, apple: `${basePath}/icon.svg` },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c2c42",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[1100] focus:rounded focus:bg-white focus:px-3 focus:py-2"
        >
          Sari la conținut
        </a>
        <Nav />
        <main id="main" className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
          {children}
        </main>
        <footer className="no-print mx-auto max-w-6xl px-4 pb-10 text-xs text-stone-500 sm:px-6">
          Planul vine din Excelul excursiei. Nimic de aici nu e o rezervare confirmată, iar starea traseelor și prețurile se verifică
          pe site-urile oficiale înainte de plecare.
        </footer>
        <ServiceWorkerRegister basePath={basePath} />
      </body>
    </html>
  );
}
