/**
 * Madeira, 6–17 decembrie 2026 — transcris din `madeira-itinerary.md`
 * (sursa: „Madeira - program.xlsx”, foaia „itinerar madeira”).
 *
 * Reguli: ordinea activităților e cea din Excel; orele apar doar unde există în sursă;
 * nimic nu e marcat ca rezervat; prețurile sunt notițe din Excel, nu tarife actuale.
 */
import type { Day, OptionalIdea, Place, VerifyItem } from "@/lib/types";

export const TRIP = {
  title: "Madeira",
  subtitle: "Insula levadelor, a piscurilor și a oceanului",
  start: "2026-12-06",
  end: "2026-12-17",
  timezone: "Atlantic/Madeira",
  timezoneLabel: "ora Madeirei (WET, UTC+0 în decembrie)",
  source: "Madeira - program.xlsx · foaia „itinerar madeira”",
};

/**
 * Coordonate din OpenStreetMap Nominatim (căutare după nume, noiembrie 2026).
 * Opririle pe care Nominatim nu le-a găsit nu au pin — apar doar în listă, cu link Google Maps.
 */
export const places: Place[] = [
  { id: "airport", name: "Aeroportul Madeira (Funchal)", lat: 32.6989623, lng: -16.7730306 },
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
        title: "Zbor București → Frankfurt",
        category: "transport",
        startTime: "05:55",
        endTime: "07:30",
        notes: ["Orele sunt cele din Excel. Pe bilet, fiecare oră e de obicei ora locală a aeroportului."],
        mapsQuery: "Aeroportul Henri Coandă București",
      },
      {
        id: "d06-zbor2",
        title: "Zbor Frankfurt → Funchal",
        category: "transport",
        startTime: "11:05",
        endTime: "14:20",
        mapsQuery: "Aeroporto da Madeira",
        placeIds: ["airport"],
      },
      {
        id: "d06-masina1",
        title: "Preluare mașina 1 — Madeira Airport (Funchal)",
        category: "transport",
        startTime: "15:30",
        notes: ["Se predă pe 8 decembrie la 14:30, în același loc."],
        mapsQuery: "Aeroporto da Madeira",
        placeIds: ["airport"],
      },
      { id: "d06-cazare", title: "Transfer la cazare", category: "transport" },
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
        mapsQuery: "PR13 Vereda do Fanal Madeira",
        placeIds: ["fanal"],
      },
      {
        id: "d07-b",
        title: "„PR8 Leva do Rocha Vermelha”",
        category: "drumetie",
        alternative: "B",
        duration: "8–9 ore",
        notes: ["Notă Excel: „Nu găsim momentan de cumpărat”.", TRAIL_CHECK],
        needsVerification:
          "Denumirea și numărul traseului sunt neclare: PR8 apare și pe 8 decembrie pentru Ponta de São Lourenço. Biletul nu a putut fi cumpărat.",
        mapsQuery: "Rocha Vermelha Madeira levada",
      },
    ],
  },
  {
    date: "2026-12-08",
    title: "Ponta de São Lourenço",
    kind: "normal",
    summary: "Capătul estic al insulei, schimbul mașinii la aeroport, apoi o levada scurtă.",
    items: [
      { id: "d08-plecare", title: "Plecare de la cazare", category: "transport", startTime: "07:00" },
      {
        id: "d08-pr8",
        title: "PR8 Ponta de São Lourenço",
        category: "drumetie",
        startTime: "08:00",
        duration: "aprox. 4–5 ore",
        price: "4,5 EUR/persoană (notă din Excel)",
        notes: [TRAIL_CHECK],
        mapsQuery: "PR8 Vereda da Ponta de São Lourenço",
      },
      { id: "d08-masa", title: "Masă", category: "masa" },
      {
        id: "d08-predare1",
        title: "Predare mașina 1 — Madeira Airport (Funchal)",
        category: "transport",
        startTime: "14:30",
        notes: ["Preluată pe 6 decembrie la 15:30."],
        mapsQuery: "Aeroporto da Madeira",
        placeIds: ["airport"],
      },
      {
        id: "d08-masina2",
        title: "Preluare mașina 2 — Madeira Airport (Funchal)",
        category: "transport",
        startTime: "15:30",
        notes: ["În Excel apare ca „Ridicat 2 mașini” la 15:30."],
        mapsQuery: "Aeroporto da Madeira",
        placeIds: ["airport"],
      },
      {
        id: "d08-pr23",
        title: "PR23 Levada da Azenha",
        category: "drumetie",
        duration: "aprox. 1 oră",
        price: "gratuit (notă din Excel)",
        notes: [TRAIL_CHECK],
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
    title: "Zi necompletată",
    kind: "liber",
    flexible: true,
    summary: "Nu există activități în Excel.",
    items: [],
  },
  {
    date: "2026-12-11",
    title: "Caminho da Entarosa și Levada do Rei",
    kind: "normal",
    summary: "Nordul insulei: urcare, cafea cu priveliște, PR18 și Santana.",
    items: [
      { id: "d11-plecare", title: "Plecare de la cazare", category: "transport", startTime: "07:00" },
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
        title: "„PR1 Ruivo Arieiro”",
        category: "drumetie",
        notes: ["Formularea din Excel.", TRAIL_CHECK],
        needsVerification: "De verificat ruta exactă, accesul și starea traseului PR1.",
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
        title: "PR9 Caldeirão Verde",
        category: "drumetie",
        notes: [TRAIL_CHECK],
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
        notes: [TRAIL_CHECK],
        needsVerification: "Traseul sau varianta exactă PR6 nu e decisă.",
        mapsQuery: "PR6 levada Madeira",
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
    summary: "Curral das Freiras, predarea mașinii 2, zborurile spre casă.",
    items: [
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
        needsVerification: "Ora și locul predării mașinii 2 nu sunt încă stabilite.",
      },
      {
        id: "d17-zboruri",
        title: "Zboruri retur — de confirmat",
        category: "transport",
        notes: [
          "Transcriere brută din Excel, ordinea celulelor e ambiguă:",
          "rândul 71: „RETUR MASINI | 11:45 | ZURICH | 16:50”",
          "rândul 72: „FUNCHAL | 21:55 | BUCURESTI | 01:15”",
          "rândul 73: „ZURICH”",
        ],
        needsVerification: "Segmentele, orele, escala și ziua sosirii trebuie confirmate pe bilete.",
        mapsQuery: "Aeroporto da Madeira",
        placeIds: ["airport"],
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
    detail: "Nimic din acest site nu e rezervat: zboruri, mașini, cazare, catamaran, Monte Palace, telecabină, tobogan.",
  },
  {
    id: "g-masini",
    label: "Predarea mașinii 2",
    detail: "Mașina 1: 6 dec. 15:30 → 8 dec. 14:30, mașina 2: din 8 dec. 15:30, ambele la Madeira Airport. Rămâne de stabilit ora și locul predării mașinii 2 pe 17 decembrie.",
    date: "2026-12-17",
  },
  {
    id: "g-zbor-retur",
    label: "Programul zborului de retur",
    detail: "Excelul are rândurile Funchal / Zurich / București amestecate. Nu există un itinerar aerian cert.",
    date: "2026-12-17",
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
  { label: "Visit Madeira — site-ul oficial de turism", url: "https://visitmadeira.com/" },
];
