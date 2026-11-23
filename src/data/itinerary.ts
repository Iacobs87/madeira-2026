/**
 * Madeira, 6–17 decembrie 2026 — transcris din `madeira-itinerary.md`
 * (sursa: „Madeira - program.xlsx”, foaia „itinerar madeira”).
 *
 * Reguli: ordinea activităților e cea din Excel; orele apar doar unde există în sursă;
 * nimic nu e marcat ca rezervat; prețurile sunt notițe din Excel, nu tarife actuale.
 */
import type { Airport, BaggageAllowance, Day, Flight, OptionalIdea, Place, VerifyItem } from "@/lib/types";

const OTP: Airport = { code: "OTP", city: "București", utcOffset: 2 };
const FRA: Airport = { code: "FRA", city: "Frankfurt", utcOffset: 1 };
const FNC: Airport = { code: "FNC", city: "Funchal", utcOffset: 0 };
const ZRH: Airport = { code: "ZRH", city: "Zürich", utcOffset: 1 };

/**
 * Bagaje și tarife din biletele SWISS (emise 27.03.2026), pe grupe de călători.
 * Fără nume de familie, coduri de rezervare sau numere de bilet: repo-ul e public.
 */
export const baggage: BaggageAllowance[] = [
  {
    id: "fete",
    group: "Fete",
    members: ["Mihaela", "Andreea", "Mădălina"],
    fare: "Economy Classic",
    pricePerPerson: 458.9,
    flightIds: ["lh1423", "lh4410", "lx8265", "lx1886"],
    bags: [
      { kind: "cabina", label: "Bagaj de cabină", piecesPerPerson: 1, maxKg: 8, maxLinearCm: 118 },
      { kind: "cala", label: "Bagaj de cală", piecesPerPerson: 1, maxKg: 23, maxLinearCm: 158 },
    ],
    seatFlightIds: ["lh1423", "lh4410", "lx1886"],
    notes: [],
  },
  {
    id: "baieti",
    group: "Băieți",
    members: ["Vasile", "Alexandru", "Matei"],
    fare: "Economy Light",
    pricePerPerson: 398.9,
    flightIds: ["lh1423", "lh4410", "lx8265", "lx1886"],
    bags: [{ kind: "cabina", label: "Bagaj de cabină", piecesPerPerson: 1, maxKg: 8, maxLinearCm: 118 }],
    seatFlightIds: [],
    notes: ["Fără bagaj de cală inclus (0 bucăți) pe niciun zbor. Un bagaj de cală se plătește separat, dacă e nevoie."],
  },
];

/** Note valabile pentru toți, din biletele SWISS. */
export const ticketNotes = [
  "Biletul nu precizează separat un obiect personal suplimentar (rucsac mic sau geantă). Verificați cu Lufthansa/SWISS înainte dacă vreți să luați unul pe lângă bagajul de cabină.",
  "Lichidele din bagajul de cabină: recipiente de maximum 100 ml fiecare.",
  "Tariful e valabil doar dacă zborurile sunt folosite în ordinea rezervată.",
];

/** Confirmate de utilizator (22.11.2026). Toate orele sunt locale. */
export const flights: Flight[] = [
  {
    id: "lh1423",
    number: "LH1423",
    airline: "Lufthansa",
    from: OTP,
    to: FRA,
    departure: "2026-12-06T05:55",
    arrival: "2026-12-06T07:30",
    cabins: { fete: "Economy (S)", baieti: "Economy (S)" },
    status: "Confirmat",
    direction: "dus",
    flightAware: "DLH1423",
  },
  {
    id: "lh4410",
    number: "LH4410",
    airline: "Lufthansa",
    operatedBy: "Discover Airlines",
    from: FRA,
    to: FNC,
    departure: "2026-12-06T11:05",
    arrival: "2026-12-06T14:20",
    cabins: { fete: "Economy Classic (S)", baieti: "Economy Light (S)" },
    status: "Confirmat",
    direction: "dus",
  },
  {
    id: "lx8265",
    number: "LX8265",
    airline: "SWISS",
    operatedBy: "Edelweiss Air",
    from: FNC,
    to: ZRH,
    departure: "2026-12-17T11:45",
    arrival: "2026-12-17T16:50",
    cabins: { fete: "Economy Classic (S)", baieti: "Economy Light (S)" },
    status: "Confirmat",
    direction: "intors",
  },
  {
    id: "lx1886",
    number: "LX1886",
    airline: "SWISS",
    from: ZRH,
    to: OTP,
    departure: "2026-12-17T21:55",
    arrival: "2026-12-18T01:15",
    cabins: { fete: "Economy (S)", baieti: "Economy (S)" },
    status: "Confirmat",
    direction: "intors",
    flightAware: "SWR1886",
  },
];

export const TRIP = {
  title: "Madeira",
  subtitle: "Insula levadelor, a piscurilor și a oceanului",
  start: "2026-12-06",
  end: "2026-12-17",
  timezone: "Atlantic/Madeira",
  timezoneLabel: "ora Madeirei (WET, UTC+0 în decembrie)",
  source: "Madeira - program.xlsx · foaia „itinerar madeira”",
  /** Cazarea pentru toată excursia (link Google Maps de la utilizator, 23.11.2026). */
  stay: {
    name: "Vila Venusta by An Island Apart",
    short: "Vila Venusta",
    area: "Arco da Calheta, Calheta",
    placeId: "cazare",
    mapsQuery: "Vila Venusta by An Island Apart",
  },
};

/**
 * Coordonate din OpenStreetMap Nominatim (căutare după nume, noiembrie 2026).
 * Opririle pe care Nominatim nu le-a găsit nu au pin — apar doar în listă, cu link Google Maps.
 */
export const places: Place[] = [
  { id: "airport", name: "Aeroportul Madeira (Funchal)", lat: 32.6989623, lng: -16.7730306 },
  // Din linkul Google Maps trimis de utilizator.
  { id: "cazare", name: "Vila Venusta by An Island Apart (cazare)", lat: 32.7100461, lng: -17.1412418 },
  // Din linkul Google Maps trimis de utilizator (biroul „Madeira Airport” al Centauro, în afara aeroportului).
  { id: "centauro", name: "Centauro Rent a Car Madeira", lat: 32.6665513, lng: -16.8034045 },
  { id: "fanal", name: "Fanal", lat: 32.809398, lng: -17.1407318, approx: "zona Fanal (Porto Moniz)" },
  { id: "azenha", name: "Levada da Azenha", lat: 32.6565065, lng: -16.8432934 },
  { id: "anjos", name: "Anjos (Cascata dos Anjos)", lat: 32.6866676, lng: -17.1138147, approx: "localitatea Anjos, Ponta do Sol" },
  { id: "monte-palace", name: "Monte Palace", lat: 32.6736439, lng: -16.9028264 },
  { id: "mercado", name: "Mercado dos Lavradores", lat: 32.6486889, lng: -16.9035111, approx: "presupus a fi „piața de fructe” din Excel" },
  { id: "entrosa", name: "Caminho da Entrosa", lat: 32.825944, lng: -16.9693446, approx: "drumul, nu un punct de start anume" },
  { id: "levada-rei", name: "Levada do Rei (PR18)", lat: 32.8120532, lng: -16.9291133 },
  { id: "santana", name: "Santana", lat: 32.804907, lng: -16.8813015, approx: "centrul localității" },
  { id: "bica-cana", name: "Bica da Cana", lat: 32.7560982, lng: -17.0552695 },
  { id: "arieiro", name: "Pico do Arieiro", lat: 32.7357336, lng: -16.9287131 },
  { id: "ruivo", name: "Pico Ruivo", lat: 32.7603244, lng: -16.9435336 },
  { id: "guindaste", name: "Guindaste (Faial)", lat: 32.7931782, lng: -16.8516367, approx: "localitatea Guindaste, nu exact miradouro-ul" },
  { id: "queimadas", name: "Queimadas", lat: 32.7835967, lng: -16.9060391, approx: "zona Queimadas, Santana — de verificat punctul de start PR9" },
  { id: "porto-moniz", name: "Porto Moniz", lat: 32.8669649, lng: -17.1666328 },
  { id: "seixal", name: "Seixal", lat: 32.8256971, lng: -17.1066358 },
  { id: "ribeira-janela", name: "Ribeira da Janela", lat: 32.8478767, lng: -17.1579812 },
  { id: "achadas", name: "Achadas da Cruz", lat: 32.8409351, lng: -17.2084396 },
  { id: "ponta-pargo", name: "Farol da Ponta do Pargo", lat: 32.8139265, lng: -17.2630691 },
  { id: "curral", name: "Curral das Freiras (Valley of the Nuns)", lat: 32.720835, lng: -16.9657129 },
  { id: "cristo-rei", name: "Cristo Rei (Garajau)", lat: 32.6385635, lng: -16.8506765 },
];

const VM_HIKING = "https://visitmadeira.com/en/what-to-do/nature-seekers/activities/hiking/";

const TRAIL_CHECK = "Verificați starea traseului (deschis/închis) și taxa pe site-urile oficiale înainte de plecare.";

export const days: Day[] = [
  {
    date: "2026-12-06",
    title: "Sosire",
    kind: "sosire",
    summary: "Zborurile spre Funchal, prima mașină, cazarea și cumpărăturile.",
    items: [
      {
        id: "d06-zbor1",
        title: "Zbor LH1423 București → Frankfurt",
        category: "transport",
        startTime: "05:55",
        endTime: "07:30",
        notes: ["Ora României la plecare, ora Germaniei la sosire. Escală la Frankfurt: 3 h 35 min."],
        mapsQuery: "Aeroportul Henri Coandă București",
        flightId: "lh1423",
      },
      {
        id: "d06-zbor2",
        title: "Zbor LH4410 Frankfurt → Funchal",
        category: "transport",
        startTime: "11:05",
        endTime: "14:20",
        notes: ["Ora Germaniei la plecare, ora Madeirei la sosire."],
        mapsQuery: "Aeroporto da Madeira",
        placeIds: ["airport"],
        flightId: "lh4410",
      },
      {
        id: "d06-shuttle",
        title: "Shuttle Centauro de la terminal",
        category: "transport",
        notes: [
          "După ce luați bagajele, ieșiți din terminal și o luați la dreapta.",
          "Mergeți pe alee cam 50 m: pe dreapta e „Go to coffee & Food”.",
          "Acolo așteptați shuttle-ul Centauro Rent a Car, care vine la 10–15 minute.",
        ],
        mapsQuery: "Aeroporto da Madeira",
        placeIds: ["airport"],
      },
      {
        id: "d06-masina1",
        title: "Preluare mașina 1 — Centauro Rent a Car",
        category: "transport",
        startTime: "15:30",
        notes: [
          "Biroul Centauro „Madeira Airport” e în afara aeroportului (Gaula, Santa Cruz), cam 4,6 km în linie dreaptă de terminal.",
          "Se predă pe 8 decembrie la 14:30, în același loc.",
        ],
        mapsQuery: "Centauro Rent a Car Madeira",
        placeIds: ["centauro"],
      },
      {
        id: "d06-cazare",
        title: "Transfer la cazare — Vila Venusta",
        category: "transport",
        notes: ["Vila Venusta by An Island Apart, în Arco da Calheta (sud-vestul insulei)."],
        mapsQuery: "Vila Venusta by An Island Apart",
        placeIds: ["cazare"],
      },
      { id: "d06-cumparaturi", title: "Cumpărături", category: "activitate" },
    ],
  },
  {
    date: "2026-12-07",
    title: "Două variante (de ales)",
    kind: "alternative",
    summary: "Se alege o singură drumeție: A sau B.",
    notes: ["Cele două drumeții sunt alternative, nu se fac amândouă."],
    items: [
      {
        id: "d07-a",
        title: "PR13 Vereda do Fanal + plimbare prin Fanal",
        category: "drumetie",
        alternative: "A",
        duration: "6–8 ore",
        price: "4,5 EUR/persoană (notă din Excel)",
        notes: [TRAIL_CHECK],
        trail: { url: VM_HIKING + "pr-13-vereda-do-fanal/", facts: "10,8 km · 4 h · moderat · start/final: ER209 Assobiadores / ER209 Fanal · 1130–1420 m" },
        mapsQuery: "PR13 Vereda do Fanal Madeira",
        placeIds: ["fanal"],
      },
      {
        id: "d07-b",
        title: "PR28 Levada da Rocha Vermelha",
        category: "drumetie",
        alternative: "B",
        duration: "8–9 ore",
        notes: [
          "În Excel apare „PR8 Leva do Rocha Vermelha”; pe Visit Madeira traseul este PR28 Levada da Rocha Vermelha.",
          "Pornește tot de la Fanal (ER209), ca varianta A.",
          "Notă Excel: „Nu găsim momentan de cumpărat”.",
          TRAIL_CHECK,
        ],
        needsVerification: "Biletul pentru traseu nu a putut fi cumpărat (notă din Excel).",
        trail: { url: VM_HIKING + "pr-28-levada-da-rocha-vermelha/", facts: "10,8 km · 4 h · start/final: Fanal (ER209) / Casa dos Guardas de Canal · 837–1297 m" },
        mapsQuery: "PR28 Levada da Rocha Vermelha",
        placeIds: ["fanal"],
      },
    ],
  },
  {
    date: "2026-12-08",
    title: "Ponta de São Lourenço",
    kind: "normal",
    summary: "Capătul estic al insulei, schimbul mașinii la aeroport, apoi o levada scurtă.",
    items: [
      { id: "d08-plecare", title: "Plecare de la cazare (Vila Venusta)", category: "transport", startTime: "07:00", placeIds: ["cazare"] },
      {
        id: "d08-pr8",
        title: "PR8 Ponta de São Lourenço",
        category: "drumetie",
        startTime: "08:00",
        duration: "aprox. 4–5 ore",
        price: "4,5 EUR/persoană (notă din Excel)",
        notes: [TRAIL_CHECK],
        trail: { url: VM_HIKING + "pr-8-vereda-da-ponta-de-sao-lourenco/", facts: "4 km dus + 4 km întors · 2:30 h · moderat · start/final: Baía d'Abra / Casa do Sardinha · 23–126 m" },
        mapsQuery: "PR8 Vereda da Ponta de São Lourenço",
      },
      { id: "d08-masa", title: "Masă", category: "masa" },
      {
        id: "d08-predare1",
        title: "Predare mașina 1 — Centauro Rent a Car",
        category: "transport",
        startTime: "14:30",
        notes: ["La biroul Centauro din Gaula (Santa Cruz), nu la terminal. Preluată pe 6 decembrie la 15:30."],
        mapsQuery: "Centauro Rent a Car Madeira",
        placeIds: ["centauro"],
      },
      {
        id: "d08-masina2",
        title: "Preluare mașina 2 — Centauro Rent a Car",
        category: "transport",
        startTime: "15:30",
        notes: ["Același birou Centauro, la o oră după predarea mașinii 1.", "În Excel apare ca „Ridicat 2 mașini” la 15:30."],
        mapsQuery: "Centauro Rent a Car Madeira",
        placeIds: ["centauro"],
      },
      {
        id: "d08-pr23",
        title: "PR23 Levada da Azenha",
        category: "drumetie",
        duration: "aprox. 1 oră",
        price: "gratuit (notă din Excel)",
        notes: ["PR23 nu apare în lista de trasee de pe Visit Madeira.", TRAIL_CHECK],
        mapsQuery: "PR23 Levada da Azenha",
        placeIds: ["azenha"],
      },
      {
        id: "d08-miradouro",
        title: "„Miradouro?”",
        category: "viewpoint",
        notes: ["Oprire nealeasă încă."],
        needsVerification: "Excelul nu spune care miradouro.",
      },
    ],
  },
  {
    date: "2026-12-09",
    title: "Funchal și împrejurimi",
    kind: "normal",
    summary: "Cascadă, Monte, telecabină, tobogan, piață și balene.",
    items: [
      {
        id: "d09-anjos",
        title: "Cascata dos Anjos",
        category: "activitate",
        mapsQuery: "Cascata dos Anjos Madeira",
        placeIds: ["anjos"],
      },
      {
        id: "d09-monte",
        title: "Monte Palace",
        category: "oras",
        mapsQuery: "Monte Palace Madeira",
        placeIds: ["monte-palace"],
      },
      { id: "d09-telecabina", title: "Telecabină", category: "transport", mapsQuery: "Teleférico do Funchal" },
      {
        id: "d09-tobogan",
        title: "Coborâre cu toboganul tradițional",
        category: "activitate",
        mapsQuery: "Carreiros do Monte Funchal",
      },
      {
        id: "d09-piata",
        title: "Piața de fructe",
        category: "oras",
        notes: ["Pe hartă: Mercado dos Lavradores (presupunere, Excelul spune doar „piața de fructe”)."],
        mapsQuery: "Mercado dos Lavradores Funchal",
        placeIds: ["mercado"],
      },
      {
        id: "d09-catamaran",
        title: "Catamaran pentru observarea balenelor",
        category: "activitate",
        startTime: "14:30",
        duration: "3 ore",
        notes: ["Planificat, nu confirmat ca rezervare."],
        needsVerification: "Rezervarea catamaranului nu e confirmată.",
        mapsQuery: "Marina do Funchal whale watching",
      },
    ],
  },
  {
    date: "2026-12-10",
    title: "Ziua lui Matei 🎂",
    kind: "liber",
    flexible: true,
    summary: "E ziua lui Matei, așa că Matei decide programul.",
    notes: ["La mulți ani, Matei! Programul zilei se alege pe loc."],
    items: [],
  },
  {
    date: "2026-12-11",
    title: "Caminho da Entarosa și Levada do Rei",
    kind: "normal",
    summary: "Nordul insulei: urcare, cafea cu priveliște, PR18 și Santana.",
    items: [
      { id: "d11-plecare", title: "Plecare de la cazare (Vila Venusta)", category: "transport", startTime: "07:00", placeIds: ["cazare"] },
      {
        id: "d11-entarosa",
        title: "Caminho da Entarosa",
        category: "drumetie",
        startTime: "08:00",
        notes: ["În OpenStreetMap apare ca „Caminho da Entrosa” (Boaventura, São Vicente)."],
        mapsQuery: "Caminho da Entrosa Boaventura",
        placeIds: ["entrosa"],
      },
      {
        id: "d11-cristovao",
        title: "Miradouro de São Cristovão — cafea",
        category: "viewpoint",
        mapsQuery: "Miradouro de São Cristóvão Boaventura Madeira",
      },
      { id: "d11-urcare", title: "Traseu cu urcare", category: "drumetie", duration: "1–1,5 ore" },
      {
        id: "d11-arco",
        title: "Restaurant cu priveliște: „Restaurante O Arco”",
        category: "masa",
        needsVerification: "Ortografia numelui restaurantului din Excel trebuie verificată.",
        mapsQuery: "Restaurante O Arco Madeira",
      },
      { id: "d11-retur", title: "Retur", category: "transport" },
      {
        id: "d11-transfer1",
        title: "Caminho da Entarosa → PR18 Levada do Rei",
        category: "transport",
        startTime: "12:00",
        endTime: "12:30",
      },
      {
        id: "d11-pr18",
        title: "PR18 Levada do Rei",
        category: "drumetie",
        duration: "4 ore",
        notes: [TRAIL_CHECK],
        trail: { url: VM_HIKING + "pr-18-levada-do-rei/", facts: "5,3 km (10,6 km dus-întors) · 3:30 h · moderat · start/final: São Jorge (stația de epurare) / Ribeiro Bonito · 535–573 m" },
        mapsQuery: "PR18 Levada do Rei",
        placeIds: ["levada-rei"],
      },
      {
        id: "d11-transfer2",
        title: "PR18 Levada do Rei → Santana",
        category: "transport",
        startTime: "17:00",
        endTime: "17:15",
      },
      {
        id: "d11-santana",
        title: "Vizită Santana / Bica da Cana",
        category: "oras",
        needsVerification: "Neclar în sursă: Santana și Bica da Cana sunt alternative sau două opriri?",
        mapsQuery: "Santana Madeira",
        placeIds: ["santana", "bica-cana"],
      },
    ],
  },
  {
    date: "2026-12-12",
    title: "Munți și viewpoint",
    kind: "normal",
    summary: "Vârfurile insulei și un miradouro pe coasta de nord-est.",
    items: [
      {
        id: "d12-pr1",
        title: "PR1 Vereda do Areeiro (Pico do Arieiro → Pico Ruivo)",
        category: "drumetie",
        notes: ["În Excel: „PR1 Ruivo Arieiro”.", TRAIL_CHECK],
        trail: { url: VM_HIKING + "pr-1-vereda-do-areeiro/", facts: "6,1 km · 3 h · moderat · start/final: Miradouro Pico do Areeiro / Pico Ruivo · 1491–1857 m" },

        mapsQuery: "PR1 Pico do Arieiro Pico Ruivo",
        placeIds: ["arieiro", "ruivo"],
      },
      {
        id: "d12-guindaste",
        title: "Miradouro do Guindaste",
        category: "viewpoint",
        mapsQuery: "Miradouro do Guindaste Faial Madeira",
        placeIds: ["guindaste"],
      },
    ],
  },
  {
    date: "2026-12-13",
    title: "Caldeirão Verde",
    kind: "normal",
    summary: "O singură drumeție, pe levada spre lacul verde.",
    items: [
      {
        id: "d13-pr9",
        title: "PR9 Levada do Caldeirão Verde",
        category: "drumetie",
        notes: [TRAIL_CHECK],
        trail: { url: VM_HIKING + "pr-9-levada-do-caldeirao-verde/", facts: "8,7 km (17,4 km dus-întors) · 6:30 h · moderat · start/final: Parcul Forestier Queimadas / Caldeirão do Inferno · 872–1020 m" },

        mapsQuery: "PR9 Levada do Caldeirão Verde",
        placeIds: ["queimadas"],
      },
    ],
  },
  {
    date: "2026-12-14",
    title: "Vestul insulei",
    kind: "normal",
    summary: "Porto Moniz și coasta de nord-vest, până la farul Ponta do Pargo.",
    notes: ["Excelul nu specifică ordinea opririlor."],
    items: [
      { id: "d14-moniz", title: "Porto Moniz", category: "oras", mapsQuery: "Porto Moniz Madeira", placeIds: ["porto-moniz"] },
      { id: "d14-seixal", title: "Seixal", category: "oras", mapsQuery: "Seixal Madeira", placeIds: ["seixal"] },
      {
        id: "d14-janela",
        title: "Ribeira da Janela",
        category: "viewpoint",
        notes: ["În Excel: „Ribiera da Janela”."],
        mapsQuery: "Ribeira da Janela Madeira",
        placeIds: ["ribeira-janela"],
      },
      { id: "d14-achadas", title: "Achadas da Cruz", category: "viewpoint", mapsQuery: "Achadas da Cruz Madeira", placeIds: ["achadas"] },
      {
        id: "d14-pargo",
        title: "Ponta do Pargo Lighthouse",
        category: "viewpoint",
        mapsQuery: "Farol da Ponta do Pargo",
        placeIds: ["ponta-pargo"],
      },
    ],
  },
  {
    date: "2026-12-15",
    title: "PR6 — o levada",
    kind: "normal",
    flexible: true,
    summary: "„PR6 – să vedem o levada”: traseul exact nu e decis.",
    items: [
      {
        id: "d15-pr6",
        title: "PR6 – „să vedem o levada”",
        category: "drumetie",
        notes: [
          "Variante din aceeași familie, pe Visit Madeira: PR6.1 Levada do Risco, PR6.2 Levada do Alecrim, PR6.3 Vereda da Lagoa do Vento, PR6.4 Levada Velha do Rabaçal, PR6.5 Vereda do Pico Fernandes, PR6.6 Vereda do Túnel do Cavalo, PR6.8 Levada do Paul II.",
          TRAIL_CHECK,
        ],
        needsVerification: "Traseul sau varianta exactă PR6 nu e decisă.",
        trail: { url: VM_HIKING + "pr-6-levada-das-25-fontes/", facts: "PR6 Levada das 25 Fontes: 4,3 km (8,6 km dus-întors) · 3 h · moderat · start/final: Rabaçal (ER105) / 25 Fontes · 964–1288 m" },
        mapsQuery: "PR6 Levada das 25 Fontes",
      },
    ],
  },
  {
    date: "2026-12-16",
    title: "Zi tampon",
    kind: "tampon",
    flexible: true,
    summary: "„Recuperat din toate zilele”: ce a rămas, în funcție de vreme.",
    items: [{ id: "d16-recuperare", title: "Recuperat din toate zilele", category: "activitate" }],
  },
  {
    date: "2026-12-17",
    title: "Valley of the Nuns și plecare",
    kind: "plecare",
    summary: "Curral das Freiras, predarea mașinii 2, zborurile spre casă (via Zürich).",
    notes: [
      "Zborul spre Zürich pleacă la 11:45. Curral das Freiras și predarea mașinii trebuie să încapă dimineața devreme, înainte de aeroport. Altfel, Curral das Freiras se poate muta pe 16 decembrie (zi tampon).",
      "Cazarea e în Arco da Calheta, la circa 35 km în linie dreaptă de aeroport, în celălalt capăt al coastei de sud.",
    ],
    items: [
      {
        id: "d17-checkout",
        title: "Check-out de la Vila Venusta",
        category: "transport",
        mapsQuery: "Vila Venusta by An Island Apart",
        placeIds: ["cazare"],
      },
      {
        id: "d17-curral",
        title: "Valley of the Nuns (Curral das Freiras)",
        category: "viewpoint",
        mapsQuery: "Curral das Freiras Madeira",
        placeIds: ["curral"],
      },
      {
        id: "d17-predare2",
        title: "Predare mașina 2",
        category: "transport",
        needsVerification: "Ora și locul predării mașinii 2 nu sunt încă stabilite. Trebuie să fie înainte de zborul de la 11:45.",
      },
      {
        id: "d17-zbor3",
        title: "Zbor LX8265 Funchal → Zürich",
        category: "transport",
        startTime: "11:45",
        endTime: "16:50",
        notes: ["Ora Madeirei la plecare, ora Elveției la sosire. Escală la Zürich: 5 h 05 min."],
        mapsQuery: "Aeroporto da Madeira",
        placeIds: ["airport"],
        flightId: "lx8265",
      },
      {
        id: "d17-zbor4",
        title: "Zbor LX1886 Zürich → București",
        category: "transport",
        startTime: "21:55",
        endTime: "01:15 (+1)",
        notes: ["Sosire la București pe 18 decembrie la 01:15, ora României."],
        mapsQuery: "Zurich Airport",
        flightId: "lx1886",
      },
    ],
  },
];

export const optionals: OptionalIdea[] = [
  {
    id: "cristo-rei",
    title: "Miradouro do Cristo Rei",
    category: "viewpoint",
    note: "Viewpoint din coloanele laterale ale Excelului. Nu are zi alocată.",
    mapsQuery: "Miradouro do Cristo Rei Garajau",
    placeIds: ["cristo-rei"],
  },
  {
    id: "quinta-furao",
    title: "Quinta do Furão",
    category: "masa",
    note: "Restaurant din coloanele laterale ale Excelului. Nu are zi alocată.",
    mapsQuery: "Quinta do Furão Santana Madeira",
  },
];

/** General points to check, beyond the per-activity `needsVerification` notes. */
export const generalChecks: VerifyItem[] = [
  {
    id: "g-trasee",
    label: "Starea tuturor traseelor PR",
    detail: "Traseele se pot închide din cauza vremii, a lucrărilor sau a incendiilor. Verificați cu 1–2 zile înainte pe site-ul IFCN.",
  },
  {
    id: "g-taxe",
    label: "Taxele pentru trasee",
    detail: "4,5 EUR/persoană e o notă din Excel, nu un tarif actual garantat. Verificați taxa și unde se plătește.",
  },
  {
    id: "g-rezervari",
    label: "Rezervări și bilete",
    detail: "Zborurile sunt confirmate și mașinile Centauro au ore stabilite. Restul nu e marcat ca rezervat: cazare, catamaran, Monte Palace, telecabină, tobogan.",
  },
  {
    id: "g-masini",
    label: "Predarea mașinii 2",
    detail: "Mașina 1: 6 dec. 15:30 → 8 dec. 14:30, mașina 2: din 8 dec. 15:30, ambele la biroul Centauro „Madeira Airport” (Gaula). Rămâne de stabilit ora și locul predării mașinii 2 pe 17 decembrie.",
    date: "2026-12-17",
  },
  {
    id: "g-bilet-validitate",
    label: "Valabilitatea biletelor la dus",
    detail: "Pe toate cele 6 bilete, la zborurile din 6 decembrie (LH1423 și LH4410), scrie „Not valid before / after: 08 December”, deși zborurile sunt pe 6 decembrie. Poate fi o urmă a unei schimbări de program. Cereți confirmare la SWISS (Service Center București: +40 21 655 07 19) că biletele sunt valabile pentru 6 decembrie.",
    date: "2026-12-06",
  },
  {
    id: "g-vreme",
    label: "Vremea la munte",
    detail: "În decembrie, pe PR1 și la Fanal poate fi ceață, vânt și frig. Verificați prognoza IPMA în ziua respectivă.",
  },
];

export const officialLinks = [
  {
    label: "IFCN — trasee pedestre recomandate (stare, închideri)",
    url: "https://ifcn.madeira.gov.pt/pt/atividades-de-natureza/percursos-pedestres-recomendados.html",
  },
  { label: "SIMplifica — portalul Guvernului Regional (taxe trasee)", url: "https://simplifica.madeira.gov.pt/" },
  { label: "IPMA — prognoza meteo Madeira", url: "https://www.ipma.pt/pt/otempo/prev.localidade.hora/#Madeira&Funchal" },
  { label: "Visit Madeira — toate traseele pedestre (fișe)", url: VM_HIKING },
  {
    label: "Visit Madeira — aviz pentru drumeți: trasee deschise / închise",
    url: "https://visitmadeira.com/en/what-to-do/nature-seekers/notice-to-walkers-and-list-of-walks/",
  },
];
