# AGENTS.md

This document provides a comprehensive system architecture, database design, directory mapping, and coding conventions overview for subsequent AI agents or developers continuing development on this codebase.

---

## 🌌 System Overview

**Easybyte Informática** is a premium, highly responsive cyberpunk-themed computer hardware e-commerce store built on the modern **TanStack Start** framework, backed by a persistent **Netlify Database (Managed Postgres)**.

### Technology Blueprint

| Layer | Technology |
|---|---|
| **Meta-Framework** | TanStack Start (React 19, Vite 7) |
| **Routing System** | TanStack Router (File-based safe routes) |
| **Persistence Hub** | Netlify Database (Postgres) |
| **Object Relational Mapper** | Drizzle ORM |
| **Styling Architecture** | Tailwind CSS v4 (Industrial Dark theme, Scanlines, HUD grids) |
| **State Hub** | React Context (Local persistent shopping cart) |

---

## 🗄️ Database Architecture

The data storage leverages `@netlify/database` + `drizzle-orm` (installed with `@beta` dist-tag for Netlify support).

### Schema: `db/schema.ts`

- **`products` Table**:
  - `id`: `serial().primaryKey()` (Unique item integer indicator)
  - `name`: `text()` (Creative module title)
  - `slug`: `text().unique()` (URL identifier)
  - `image`: `text()` (Main high-definition Unsplash URL)
  - `images`: `text()` (JSON-serialized array representing additional gallery URLs)
  - `description`: `text()` (Rich multi-paragraph architectural brief)
  - `shortDescription`: `text()` (Slick grid summary text)
  - `price`: `integer()` (Unit price in USD)
  - `category`: `text()` (Module categorization: e.g. Custom Rigs, Laptops, Peripherals, Displays)
  - `variants`: `text()` (JSON-serialized configuration options e.g. RAM, GPU, Case)
  - `specs`: `text()` (JSON-serialized key-value records representing hardware properties)
  - `stock`: `integer().default(10)` (Current storage units in node reserve)

### Data Lifecycle & Seeding
Products are loaded on request. If the `products` table contains zero records, the system automatically inserts the initial catalog of 6 elite hardware components into Postgres inside the server-side function `getProducts` in `src/lib/db-products.ts`.

---

## 🗂️ Workspace Directory Tree

```
├── db
│   ├── index.ts               # Netlify Postgres database connection setup
│   └── schema.ts              # Drizzle table schemas
├── netlify
│   └── database
│       └── migrations         # Auto-generated SQL migration files
├── public
│   ├── favicon.ico
│   └── placeholder.png
├── src
│   ├── components
│   │   ├── BuyButton.tsx      # Multi-stage Stripe/Local buy action selector
│   │   └── CartDrawer.tsx     # Custom sliding sci-fi cargo bay panel with Lucide icons
│   ├── context
│   │   └── CartContext.tsx    # React Context with localStorage sync for state preservation
│   ├── data
│   │   └── products.ts        # (Legacy fallback file)
│   ├── lib
│   │   ├── db-products.ts     # Server-side loader functions connecting directly to Postgres
│   │   └── stripe.ts          # Server functions interfacing with Stripe API
│   ├── routes
│   │   ├── checkout
│   │   │   ├── success.tsx    # High-tech purchase confirmed receipt
│   │   │   └── cancel.tsx     # Tech payload handoff aborted diagnostic
│   │   ├── products
│   │   │   └── $productId.tsx # Product details terminal featuring galleries, specs, and variants
│   │   ├── __root.tsx         # Parent layout: dynamic sci-fi top banner, navbar header, and footer
│   │   └── index.tsx          # Home page featuring console search terminal, filter sectors, and grid
│   ├── router.tsx             # Router setup
│   └── styles.css             # Main styling base: custom cyber grids, corner ticks, glowing indicators
├── package.json               # Dependencies and build execution
└── tsconfig.json              # TypeScript compilation paths (@/* mappings)
```

---

## 📜 Development Conventions

### Styling Patterns
We explicitly reject generic, white-themed layout conventions ("AI tells"). Instead, we embrace a distinct **cyberpunk hardware lab theme**:
- **Palette**: Dark grey and dark violet shadows (`#07080d`) paired with vibrant neon tech green (`#00ff66`) active accents.
- **HUD Elements**: Corner line marks (`.cyber-corners`), glowing text animations (`.cyber-pulse-text`), subtle linear grid stripes (`.cyber-grid`), and scanline screens (`.scanlines`).
- **Typography**: Display elements and console stats use the sleek `Space Grotesk` paired with terminal monospace code text.

### Database Workflows
1. Every schema change in `db/schema.ts` **MUST** be compiled using Drizzle Kit prior to checking in:
   ```bash
   npx drizzle-kit generate
   ```
2. **Never** run manual database migrations (`npx drizzle-kit migrate`). The Netlify deployment workflow handles applying files inside `netlify/database/migrations/` sequentially at deployment build-time.
3. Keep database client imports exact with `.js` suffix (e.g. `import { db } from '../../db/index.js'`) when coding server functions in ES modules.
