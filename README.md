# Madeira — 6–17 decembrie 2026

Site de călătorie pentru excursia în Madeira, în același stil cu site-ul pentru Thailanda și Singapore (Next.js, Tailwind).
Site static, fără backend și fără chei API. Funcționează pe telefon, iar paginile deja vizitate rămân disponibile offline.

## Conținut

| Pagină | Ce conține |
| --- | --- |
| `/` | Prezentarea excursiei, numărătoare inversă, cele 12 zile |
| `/itinerar/` | Cardurile zilelor, cu filtre: drumeții/levade, viewpoint, oraș, transport, masă, zile flexibile |
| `/zi/2026-12-DD/` | Detaliul unei zile: timeline, durate, costuri, variante A/B, linkuri Google Maps |
| `/zboruri/` | Zboruri confirmate, status live, bagaje și tarife pe grupe, check-in |
| `/print/` | Versiune printabilă / PDF |

## Editarea programului

Totul vine din **`src/data/itinerary.ts`** (tipurile sunt în `src/lib/types.ts`). Sursa programului este `madeira-itinerary.md`, extras din `Madeira - program.xlsx`.

- **Activitate:** `title`, `category`, opțional `startTime`/`endTime` (ora Madeirei), `duration`, `price`, `notes`, `alternative` ("A"/"B"), `needsVerification`, `mapsQuery`, `placeIds`.
- **Ai lămurit ceva?** Șterge `needsVerification` de pe activitate și dispare marcajul „De verificat”.

## Rulare locală

```bash
npm install
npm run dev        # http://127.0.0.1:3000
npm run build      # site static în ./out
npm run typecheck
```

## Publicare pe GitHub Pages

1. Creează un repo pe GitHub și urcă acest folder pe branch-ul `main`.
2. În repo: **Settings → Pages → Source: GitHub Actions**.
3. Workflow-ul `.github/workflows/deploy.yml` face build și publică la `https://<user>.github.io/<repo>/`.

**`base` / basePath:** pentru un site de proiect, site-ul trăiește sub `/<repo>`. Workflow-ul setează automat `NEXT_PUBLIC_BASE_PATH` din `actions/configure-pages`, care e citit în `next.config.ts`.
Pentru un domeniu propriu sau un repo `<user>.github.io`, valoarea e goală și nu trebuie schimbat nimic.
Ca să testezi local un build cu basePath: `NEXT_PUBLIC_BASE_PATH=/madeira npm run build` (în Git Bash pe Windows adaugă `MSYS_NO_PATHCONV=1` în față, altfel `/madeira` e transformat într-o cale Windows).

## Confidențialitate

- Fiecare pagină are `noindex, nofollow` și `referrer: no-referrer`. `public/_headers` adaugă `X-Robots-Tag` pe Netlify/Cloudflare (GitHub Pages îl ignoră).
- Un repo public pe GitHub poate fi indexat. Nu pune în date coduri de rezervare, nume complete sau date de pașaport.

## Ce nu face site-ul

- Nu știe starea actuală a traseelor. Pentru asta folosește linkurile IFCN / IPMA de pe pagina „De verificat”.
- Nu desenează rute de condus și nu estimează timpi de transfer.
- Nu marchează nimic ca rezervat.
