# AGENTS.md

Este documento sirve como guía técnica para desarrolladores o agentes de IA que continúen trabajando en este proyecto. Describe la arquitectura, la base de datos, el mapa de carpetas y las reglas de desarrollo de la tienda.

---

## 🌌 Resumen del Sistema

**Easybyte Informática** es una plataforma de comercio electrónico rápida y moderna, diseñada con una estética tecnológica oscura para una tienda premium de computadoras y componentes de hardware a medida en Paraguay.

## Tecnologías Utilizadas

| Componente | Tecnología |
| --- | --- |
| **Framework Principal** | TanStack Start (React 19, Vite 7) |
| **Manejo de Rutas** | TanStack Router (Rutas automáticas basadas en archivos) |
| **Base de Datos** | Netlify Database (Postgres Serverless gestionado) |
| **ORM** | Drizzle ORM (Esquemas seguros y migraciones automáticas) |
| **Estilos (UI)** | Tailwind CSS v4 (Diseño oscuro moderno y responsivo) |
| **Estado del Carrito** | React Context (Carrito persistente con guardado local en el navegador) |

---

## 🗄️ Estructura de la Base de Datos

El almacenamiento y manejo de datos se realiza mediante la base de datos de Netlify y Drizzle ORM.

### Tabla de Productos (`products` en `db/schema.ts`)

- `id`: Número único correlativo (Clave primaria).
- `name`: Nombre comercial del producto de hardware.
- `slug`: Texto limpio y amigable para la dirección web (URL).
- `image`: Enlace o ruta a la imagen principal del producto.
- `images`: Texto en formato JSON que guarda los enlaces de las fotos para la galería.
- `description`: Detalle largo con las especificaciones del hardware.
- `shortDescription`: Resumen corto para mostrar en las tarjetas del catálogo general.
- `price`: Precio unitario del producto **(guardado y procesado en Guaraníes)**.
- `category`: Categoría del ítem (Equipos Armados, Notebooks, Periféricos, Monitores).
- `variants`: Opciones de componentes configurables en formato JSON (ej. mejorar RAM o almacenamiento).
- `specs`: Características técnicas detalladas en formato JSON (pares de claves y valores).
- `stock`: Cantidad disponible en el depósito (por defecto inicia en 10).

### Carga de Datos Inicial (Seeding)
Si la base de datos Postgres se detecta completamente vacía al iniciar, la función del servidor `getProducts` (ubicada en `src/lib/db-products.ts`) carga de forma automática un catálogo base de 6 productos de prueba.

---

## 🗂️ Mapa de Carpetas y Archivos


```

├── db
│   ├── index.ts                # Conexión a la base de datos Postgres de Netlify
│   └── schema.ts               # Estructura y campos de las tablas con Drizzle ORM
├── netlify
│   └── database
│       └── migrations          # Archivos SQL generados para actualizar la base de datos
├── public
│   ├── favicon.ico             # Ícono de la pestaña del navegador
│   └── placeholder.png         # Imagen temporal si un producto no tiene foto asignada
├── src
│   ├── components
│   │   ├── BuyButton.tsx       # Botón para iniciar el proceso de pago (Stripe o local)
│   │   └── CartDrawer.tsx      # Panel lateral desplegable del carrito de compras
│   ├── context
│   │   └── CartContext.tsx     # Lógica del carrito con guardado automático en localStorage
│   ├── data
│   │   └── products.ts         # Archivo de respaldo con datos estáticos (en desuso / fallback)
│   ├── lib
│   │   ├── db-products.ts      # Funciones del servidor para leer y escribir en Postgres
│   │   └── stripe.ts           # Integración con las funciones y API de Stripe
│   ├── routes
│   │   ├── checkout
│   │   │   ├── success.tsx     # Página que se muestra tras una compra exitosa
│   │   │   └── cancel.tsx      # Página de aviso si el usuario cancela la operación de pago
│   │   ├── products
│   │   │   └── $productId.tsx  # Vista detallada del producto (galería, opciones y ficha técnica)
│   │   ├── __root.tsx          # Diseño base de la web (Menú de navegación principal y pie de página)
│   │   └── index.tsx           # Página de inicio (Buscador, filtros de categorías y grilla)
│   ├── router.tsx              # Configuración general del enrutador de páginas
│   └── styles.css              # Archivo de estilos CSS globales y personalizaciones de Tailwind v4
├── package.json                # Lista de librerías, dependencias y comandos del proyecto
└── tsconfig.json               # Configuración de TypeScript y alias de rutas internas (@/*)

```

---

## 📜 Reglas y Buenas Prácticas de Desarrollo

### 1. Estilos y Línea de Diseño Visual
Mantenemos una identidad visual limpia inspirada en un **laboratorio tecnológico oscuro**:
- **Colores**: Fondos oscuros profundos (`#07080d`) combinados con detalles y estados activos en verde neón (`#00ff66`).
- **Componentes**: Bordes definidos con esquinas angulares marcadas (`.cyber-corners`), efectos de pulso suaves (`.cyber-pulse-text`) para alertas y tipografías legibles como `Space Grotesk` junto a fuentes monoespaciadas para datos técnicos.

### 2. Flujo de Trabajo con la Base de Datos
- Cada vez que agregues, borres o modifiques un campo en `db/schema.ts`, tenés que generar los archivos de actualización ejecutando en la terminal:
```bash
  npx drizzle-kit generate

```

* **Nunca apliques las migraciones de forma manual** en producción (`npx drizzle-kit migrate`). El flujo automatizado de Netlify lee los archivos de la carpeta `netlify/database/migrations/` y actualiza la base de datos por sí solo en cada despliegue.
* Al realizar importaciones en las funciones del servidor usando módulos ES, acordate de incluir siempre la extensión del archivo `.js` de forma explícita (ejemplo: `import { db } from '../../db/index.js'`).
