# Easybyte Informática // Catálogo Web de Hardware

Una plataforma de comercio electrónico moderna, rápida y optimizada, desarrollada para **Easybyte Informática**, tienda premium de computadoras y componentes de hardware a medida. Esta aplicación cuenta con un catálogo de productos con filtros avanzados, páginas de detalles con especificaciones técnicas completas, configurador de componentes personalizados, galería de imágenes y un carrito de compras interactivo.

---

## 🛠️ Tecnologías Utilizadas y Arquitectura

- **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (React 19, Vite 7)
- **Base de Datos**: [Netlify Database](https://docs.netlify.com/databases/netlify-database/) (Postgres Serverless gestionado)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team) (Esquemas con tipado seguro y flujos de migración automáticos)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com) (Diseño oscuro moderno, animaciones interactivas y diseño 100% responsivo para celulares y PC)
- **Íconos**: [Lucide React](https://lucide.dev)

---

## 🚀 Características Principales

1. **Carrito de Compras Persistente**:
   - Guardado automático en el navegador mediante `localStorage`.
   - Permite elegir configuraciones personalizadas (por ejemplo, mejorar la Tarjeta de Video, RAM o Almacenamiento) y guardarlas por cada artículo.
   - Panel lateral desplegable con cálculo de subtotales en tiempo real, ajuste de cantidades y simulación segura de pago.

2. **Catálogo de Productos Dinámico**:
   - Carga de productos desde el servidor consultando directamente la base de datos Postgres en tiempo real.
   - Barra de búsqueda rápida en el cliente.
   - Filtros por categorías (Todos, Equipos Armados, Notebooks, Periféricos, Monitores) con contadores actualizados.
   - Tarjetas visuales que muestran las características principales del hardware directamente desde la página de inicio.

3. **Páginas de Detalles del Producto**:
   - Galería multimedia con selector de imágenes en miniatura.
   - Opciones interactivas para elegir componentes que se añaden directamente al carrito.
   - Tabla de especificaciones técnicas detalladas leídas dinámicamente desde campos JSON en la base de datos.
   - Integración del botón "Comprar Ahora" a través de Netlify Server Functions conectado a Stripe Checkout.

---

## 💻 Cómo Ejecutar el Proyecto Localmente

### 1. Instalar las Dependencias
Ejecutá este comando en tu terminal para descargar todos los paquetes necesarios del proyecto:
```bash
npm install

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
