# Easybyte Informática // Cybernetic Hardware Lab

A modern, highly responsive, and exciting e-commerce experience built for **Easybyte Informática**—a premium custom hardware and computer systems shop. This application features a fully searchable, filterable product matrix and polished detail pages complete with deep specification tables, custom variant configurations, image galleries, and a persistent checkout cart system.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (React 19, Vite 7)
- **Database**: [Netlify Database](https://docs.netlify.com/databases/netlify-database/) (Managed Serverless Postgres)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team) (Type-safe schemas and automatic migration workflows)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (Industrial cyberpunk dark aesthetic, interactive animations, and responsive layouts)
- **Icons**: [Lucide React](https://lucide.dev)

---

## 🚀 Key Features

1. **Persistent Quantum Cargo Bay (Cart)**:
   - Synchronized locally in `localStorage`.
   - Allows users to configure custom variants (e.g. GPU, RAM, Storage upgrades) and save them per-item.
   - Interactive sliding drawer with live subtotal counters, quantity adjustments, and secure simulated checkout operations.

2. **Core Catalog Operations Matrix (Product Grid)**:
   - Dynamic server-side product loaders querying our real-time Postgres database.
   - Live client-side console-styled search query field.
   - Dynamic category filter badges (All Sectors, Custom Rigs, Laptops, Peripherals, Displays) with active responsive counts.
   - Immersive sci-fi cards detailing main hardware components directly from the landing node.

3. **Polished Detail Terminals (Product Pages)**:
   - Multi-image gallery with active thumbnail selector.
   - Interactive variant spec options that compile user choices directly into the checkout payload.
   - Complete technical specifications table parsed dynamically from database JSON column fields.
   - Integrated "Buy Now" button powered by Netlify Server Functions connected to Stripe Checkout.

---

## 💻 Running the Laboratory Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
Use the Netlify CLI to launch the local development environment, emulation for Netlify Database, and hot module reloading:
```bash
npx netlify dev --port 8889
```
*Your application will be live at `http://localhost:8889`.*

### 3. Database Schema Sync
If you make any changes to `db/schema.ts`, generate fresh Postgres migrations using Drizzle Kit:
```bash
npx drizzle-kit generate
```
The Netlify platform will apply migrations automatically during deploy previews or production deployment.
