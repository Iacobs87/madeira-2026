# Claude Code — website Madeira, decembrie 2026

## Obiectiv
Construiește un website de călătorie pentru Madeira, bazat STRICT pe `madeira-itinerary.md`, similar ca experiență și identitate vizuală cu website-ul pentru Thailanda realizat anterior de utilizator. Dacă repository-ul Thailanda sau codul lui nu este disponibil, **nu pretinde că îl cunoști**: cere URL-ul sau folosește o implementare modernă, curată și adaptată mobilului.

## Începutul lucrului
1. Inspectează repository-ul curent (README, package.json, framework, structură, convenții și deploy). Refolosește stack-ul existent dacă există.
2. Citește integral `madeira-itinerary.md`; tratează-l ca sursa unică pentru program.
3. Propune pe scurt structura și apoi implementează, fără a înlocui programul cu un itinerar generic.
4. Dacă este un repo nou, preferă Astro + TypeScript, CSS responsive și date structurate separate de componente, cu deploy static pe GitHub Pages. Nu introduce servicii plătite sau chei API obligatorii.

## Funcționalități
- Homepage cu Madeira, intervalul 6–17 decembrie 2026, număr de zile și overview al excursiei.
- Navigare pe zile: 12 carduri, fiecare cu dată, activități în ordinea din Excel, ore doar unde există, durate, costuri/notițe și marcaje pentru variante.
- Detaliu pe zi cu timeline și linkuri către locații/trasee pe Google Maps (folosește linkuri de căutare construite din nume, nu coordonate inventate).
- Hartă interactivă cu opririle care pot fi identificate cu încredere; preferă Leaflet + OpenStreetMap. Verifică pozițiile dacă ai acces la surse; altfel lasă locațiile negeocodate în listă, nu inventa coordonate. Nu desena rute de condus ca linii drepte și nu inventa timpi de transfer.
- Filtre pentru hiking/levadas, viewpoint-uri, oraș, transport, masă și zile flexibile.
- Secțiune „Opționale”: Miradouro do Cristo Rei și Quinta do Furão.
- Secțiune „De verificat” pentru PR13/PR8 Rocha Vermelha, PR1, PR6, rezervări/bilete, mașini, programul de zbor la retur și alte ambiguități din sursă.
- Link către informații oficiale despre starea traseelor și rezervări; dacă nu există acces la web, afișează un îndemn de verificare, nu afirma că sunt deschise.
- Design premium, aerisit, inspirat de Madeira (ocean, munți, verde), cu accesibilitate, contrast bun, meniu mobil și navigare rapidă între zile.
- Limba principală: română. Date în format românesc, fus orar local Madeira pentru orele activităților.

## Model de date sugerat
Date structurate în `src/data/itinerary.ts` sau JSON, cu `date`, `title`, `items[]`, `startTime?`, `duration?`, `category`, `notes?`, `price?`, `alternatives?`, `needsVerification?`, `location?`. Separă conținutul sursă de prezentare. Nu introduce date false doar pentru a completa câmpurile.

## Reguli de fidelitate
- 7 decembrie: cele două drumeții sunt **alternative**, nu ambele obligatorii.
- 10 decembrie: ziua lui Matei; Matei decide programul (fără activități predefinite).
- 16 decembrie: zi tampon.
- Zboruri (confirmate 22.11.2026): LH1423 + LH4410 pe 6 dec. via Frankfurt; LX8265 + LX1886 pe 17 dec. via Zürich, sosire OTP 18 dec. 01:15. Vezi `madeira-itinerary.md`.
- Mașini (clarificat 22.11.2026): mașina 1 preluată 6 dec. 15:30, predată 8 dec. 14:30; mașina 2 preluată 8 dec. 15:30 — toate la Madeira Airport. Predarea mașinii 2 pe 17 dec. tot la biroul Centauro; ora rămâne de stabilit.
- Prețurile 4,5 EUR sunt note din Excel, nu tarife actuale garantate.
- Nu pretinde că biletele sau activitățile sunt rezervate.

## Calitate și livrare
- Verifică `npm install`, build, eventual lint/test dacă sunt configurate.
- Adaugă README cu pornire locală și publicare GitHub Pages, inclusiv configurarea corectă a `base` pentru repo de proiect.
- Asigură compatibilitate mobil/desktop, stări empty, linkuri funcționale, fără chei hardcodate.
- La final rezumă fișierele create, comenzile de rulare și punctele care necesită confirmarea utilizatorului.
