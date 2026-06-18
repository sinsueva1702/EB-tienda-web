# AGENTS.md

Este documento proporciona una descripción detallada de la arquitectura del sistema, el diseño de la base de datos, el mapa de directorios y las convenciones de programación para los desarrolladores o agentes de IA que continúen con el desarrollo de este código fuente.

---

## 🌌 Descripción General del Sistema

**Easybyte Informática** es una tienda web de comercio electrónico moderna y optimizada, con un diseño oscuro de estética tecnológica, desarrollada para una tienda premium de computadoras y componentes de hardware a medida en Paraguay. Funciona sobre el framework **TanStack Start** y utiliza una base de datos **Netlify Database (Postgres Serverless)**.

### Arquitectura Tecnológica

| Capa | Tecnología |
|---|---|
| **Meta-Framework** | TanStack Start (React 19, Vite 7) |
| **Sistema de Rutas** | TanStack Router (Rutas seguras basadas en archivos) |
| **Base de Datos** | Netlify Database (Postgres) |
| **Mapeador de Objetos (ORM)** | Drizzle ORM |
| **Estilos y UI** | Tailwind CSS v4 (Estética oscura tecnológica y diseño responsivo) |
| **Gestión de Estado** | React Context (Carrito de compras con persistencia local) |

---

## 🗄️ Arquitectura de la Base de Datos

El almacenamiento de datos utiliza `@netlify/database` junto con `drizzle-orm`.

### Esquema: `db/schema.ts`

- **Tabla `products`**:
  - `id`: `serial().primaryKey()` (Identificador único numérico del producto)
  - `name`: `text()` (Nombre comercial del producto)
  - `slug`: `text().unique()` (Identificador limpio para la URL)
  - `image`: `text()` (Enlace a la imagen principal del producto)
  - `images`: `text()` (Array en formato JSON con enlaces para la galería de imágenes adicionales)
  - `description`: `text()` (Descripción larga y detallada con especificaciones técnicas)
  - `shortDescription`: `text()` (Descripción corta para mostrar en las tarjetas del catálogo)
  - `price`: `integer()` (Precio unitario, expresado en Guaraníes)
  - `category`: `text()` (Categoría del producto: e.g. Equipos Armados, Notebooks, Periféricos, Monitores)
  - `variants`: `text()` (Opciones de configuración en formato JSON: e.g. RAM, Tarjeta de Video, Almacenamiento)
  - `specs`: `text()` (Claves y valores en formato JSON con las especificaciones técnicas del hardware)
  - `stock`: `integer().default(10)` (Cantidad de unidades disponibles en stock)

### Ciclo de Vida de los Datos y Carga Inicial
Los productos se cargan a demanda. Si la tabla `products` se encuentra completamente vacía, el sistema inserta de forma automática un catálogo inicial de 6 productos dentro de Postgres a través de la función del servidor `getProducts` ubicada en `src/lib/db-products.ts`.

---

## 🗂️ Árbol de Directorios del Proyecto

├── db
│   ├── index.ts                # Configuración de la conexión a Netlify Postgres
│   └── schema.ts               # Esquemas de las tablas con Drizzle ORM
├── netlify
│   └── database
│       └── migrations          # Archivos de migración SQL generados automáticamente
├── public
│   ├── favicon.ico
│   └── placeholder.png         # Imagen temporal para productos sin foto
├── src
│   ├── components
│   │   ├── BuyButton.tsx       # Botón de acción para el proceso de pago (Stripe/Local)
│   │   └── CartDrawer.tsx      # Panel lateral desplegable del carrito de compras
│   ├── context
│   │   └── CartContext.tsx     # Contexto de React con sincronización en localStorage
│   ├── data
│   │   └── products.ts         # (Archivo de respaldo local / Datos estáticos)
│   ├── lib
│   │   ├── db-products.ts      # Funciones del servidor para conectar con Postgres
│   │   └── stripe.ts           # Funciones del servidor para conectar con la API de Stripe
│   ├── routes
│   │   ├── checkout
│   │   │   ├── success.tsx     # Pantalla de confirmación de pago exitoso
│   │   │   └── cancel.tsx      # Pantalla de aviso de pago cancelado
│   │   ├── products
│   │   │   └── $productId.tsx  # Vista detallada del producto (galería, variantes y specs)
│   │   ├── __root.tsx          # Estructura base de la página (Navbar, Footer y Banner)
│   │   └── index.tsx           # Página de inicio (Buscador, filtros y grilla de productos)
│   ├── router.tsx              # Configuración y arranque del enrutador
│   └── styles.css              # Estilos globales: diseño oscuro, bordes y efectos tecnológicos
├── package.json                # Dependencias y comandos de ejecución del proyecto
└── tsconfig.json               # Configuración de TypeScript y alias de rutas (@/*)


---

## 📜 Convenciones de Desarrollo

### Patrones de Diseño y Estilos
Buscamos mantener una identidad visual de **laboratorio tecnológico de hardware**:
- **Paleta de Colores**: Fondo gris oscuro/violeta profundo (`#07080d`) combinado con detalles interactivos en verde neón (`#00ff66`) para los elementos activos.
- **Componentes Visuales**: Bordes definidos con detalles angulares (`.cyber-corners`), textos con efectos sutiles de pulso (`.cyber-pulse-text`) y fondos con tramas sutiles de grillas oscuras.
- **Tipografía**: Los títulos generales y las estadísticas utilizan la tipografía `Space Grotesk`, complementada con fuentes monoespaciadas (`monospace`) para los códigos o datos técnicos.

### Flujo de Trabajo con la Base de Datos
1. Cualquier cambio estructural realizado en el archivo `db/schema.ts` **DEBE** compilarse obligatoriamente utilizando Drizzle Kit antes de subir los cambios:
```bash
   npx drizzle-kit generate
Nunca ejecutes migraciones manuales en la base de datos de producción (npx drizzle-kit migrate). El flujo de trabajo de Netlify se encarga de aplicar los archivos dentro de netlify/database/migrations/ de forma secuencial y automática en cada despliegue.

Asegurate de mantener las importaciones de clientes de bases de datos con el sufijo .js (ejemplo: import { db } from '../../db/index.js') cuando programes funciones del servidor usando módulos ES.
