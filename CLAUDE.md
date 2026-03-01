# CLAUDE.md

Tento soubor poskytuje instrukce pro Claude Code při práci v tomto repozitáři.

## Přehled projektu

Osobní portfolio a blog Marka Vočadla — fullstack Next.js aplikace psaná v TypeScriptu. Slouží jako prezentace
projektů, pracovních zkušeností a článků (MDX). Web je českojazyčný.

## Příkazy pro vývoj

```bash
npm run dev       # Vývojový server (localhost:3000)
npm run build     # Produkční build
npm run start     # Spuštění produkčního serveru
npm run lint      # ESLint kontrola
```

### Po dokončení práce vždy spusť:

```bash
npm run lint      # Zkontroluj linting
npm run build     # Ověř, že build prochází
```

Prettier se konfiguruje přes `prettier.config.js` — v IDE nastav formátování při uložení. Manuálně lze spustit:

```bash
npx prettier --write .
```

## Architektura

### Technologický stack

- **Framework**: Next.js 14 (App Router) s TypeScriptem
- **Styling**: Tailwind CSS 3 (dark mode via `selector`)
- **Komponenty**: Headless UI (přístupné interaktivní prvky)
- **Dark mode**: `next-themes`
- **Obsah**: MDX soubory s `remark-gfm` a `rehype-prism` (zvýraznění syntaxe)
- **Linting/formátování**: ESLint (next config) + Prettier s `prettier-plugin-tailwindcss`
- **Balíčkový manažer**: npm (package-lock.json)

### Struktura adresářů

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Hlavní stránka
│   ├── providers.tsx       # Client providery (tema, kontext)
│   ├── about/              # O mně
│   ├── projects/           # Projekty
│   ├── articles/           # Články (index + MDX soubory)
│   ├── speaking/           # Webináře / přednášky
│   ├── uses/               # Používané nástroje
│   └── thank-you/          # Potvrzení newsletteru
├── components/             # Znovupoužitelné React komponenty
├── lib/                    # Utility funkce
│   ├── articles.ts         # Načítání MDX článků
│   └── formatDate.ts       # Formátování datumů
├── images/                 # Loga, fotky
└── styles/                 # Globální CSS (tailwind, prism)
public/                     # Statické soubory (PDF)
```

### Klíčové komponenty

| Komponenta | Popis |
|---|---|
| `Layout.tsx` | Hlavní wrapper s Header, Footer a pozadím |
| `Header.tsx` | Sticky hlavička, mobilní menu, přepínač tématu, animace avataru při scrollu |
| `Container.tsx` | Responzivní obal (`ContainerOuter` + `ContainerInner`) |
| `Card.tsx` | Compound komponenta pro obsahové karty (`Card.Link`, `Card.Title`, `Card.Description`, `Card.Cta`, `Card.Eyebrow`) |
| `Button.tsx` | Polymorfní tlačítko/odkaz (varianty: `primary`, `secondary`) |
| `SimpleLayout.tsx` | Jednoduchý layout pro stránky (titulek + intro) |
| `ArticleLayout.tsx` | Layout pro MDX články (zpět tlačítko, prose wrapper) |
| `Prose.tsx` | Obalí obsah Tailwind prose třídou |
| `SocialIcons.tsx` | SVG ikony (X, GitHub, LinkedIn, Instagram) |

## Přidávání obsahu

### Nový článek

1. Vytvoř adresář v `src/app/articles/{slug}/`
2. Vytvoř `page.mdx` s exportem metadat:
   ```typescript
   export const article = {
     title: 'Název článku',
     description: 'Popis článku',
     author: 'Marek Vočadlo',
     date: '2024-01-01',
   }
   ```
3. Obsah piš v MDX (Markdown + JSX komponenty)
4. Obrázky ukládej do stejného adresáře a importuj přes Next.js `Image`

### Nový projekt

Projekty jsou definované přímo v `src/app/projects/page.tsx` jako pole objektů. Přidej nový záznam do pole `projects`.

## Konvence kódu

### TypeScript

- Strict mode zapnut — vždy typuj správně, žádná `any`
- Path alias `@/` → `./src/` (použij pro všechny importy)
- Soubory stránek: `.tsx`, MDX obsah: `.mdx`

### Komponenty

- Server komponenty jako default (`.tsx` bez direktivy)
- `'use client'` jen pro interaktivní části (theme toggle, Header animace)
- Compound component pattern pro složitější komponenty (viz `Card`, `Container`)
- `forwardRef` používat pro obalové komponenty (viz `Container`)

### Tailwind CSS

- Tailwind pro veškerý styling
- Dark mode třídy přes `dark:` prefix
- Zinc/Teal barevná paleta (definovaná v `tailwind.config.ts`)
- Typography plugin (`prose`) pro MDX obsah
- Pořadí tříd spravuje `prettier-plugin-tailwindcss` automaticky

### MDX a obsah

- Remark-GFM pro GitHub Markdown (tabulky, strikethrough atd.)
- Rehype-Prism pro zvýraznění syntaxe kódu
- Vlastní `Image` komponenta přes `mdx-components.tsx`

## Přístupy a vzory

### Tmavý režim

- Implementován přes `next-themes` s `attribute="class"` a `disableTransitionOnChange`
- Selector-based dark mode v Tailwind (`darkMode: 'selector'`)
- `ThemeWatcher` komponenta sleduje systémové preference

### Responsivní design

- Mobile-first přístup
- Mobilní menu přes Headless UI `Popover`
- Breakpointy: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)

### Header animace

- Složitá animace avataru a hlavičky při scrollu pomocí CSS proměnných
- Logika v `Header.tsx` — manipuluje s CSS proměnnými (`--header-height`, `--header-mb`, `--avatar-top`)
- Neupravuj bez pochopení celé logiky scrollu

### Načítání článků

- `lib/articles.ts` dynamicky importuje MDX soubory z `app/articles/`
- Funkce `getAllArticles()` vrací seřazené články podle data
- Metadata článku jsou exportovány z každého `page.mdx`

## Testování

Projekt **nemá nakonfigurované testy**. Ověřuj funkčnost manuálně přes `npm run dev` a vždy spusť `npm run build`
před dokončením úprav.

## Deployment

- Projekt je připraven pro **Vercel** (přítomna `.vercel` konfigurace)
- `npm run build` generuje statické stránky vhodné pro serverless deployment
- Obrázky jsou optimalizovány přes Next.js Image component + sharp

## Důležité poznámky k závislostem

### Proč `--webpack` flag
Next.js 16 používá Turbopack defaultně, ale `@next/mdx` předává remark/rehype pluginy jako function reference,
které Turbopack nedokáže serializovat. Proto všechny skripty používají `--webpack`:
- `next dev --webpack`
- `next build --webpack`

### @headlessui/react v2 (breaking changes oproti v1)
- `Transition.Root` → `Transition`
- `Transition.Child` → `TransitionChild`
- `Popover.Overlay` → `PopoverBackdrop`

### React 19
- `useRef<T>()` bez argumentu je TypeScript error — použij `useRef<T | undefined>(undefined)`

### ESLint 9
- Flat config format — konfigurace je v `eslint.config.mjs`, ne v `.eslintrc`

### npm overrides
- `serialize-javascript` je vynucen na `>=7.0.3` přes `overrides` v `package.json`
- Bez toho by webpack/terser-webpack-plugin stahoval zranitelnou verzi
