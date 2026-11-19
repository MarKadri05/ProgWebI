# MTG Grimorio · Misión 5 (Pixel Perfect)

Misión M5 · Programación Web I (Cliente) — Grado en Ingeniería del Software (U-tad 2026–2027).

*Landing page* promocional y funcional desarrollada con **Vite + React 19 (JSX)** y **Tailwind CSS v4** bajo el enfoque *CSS-first*. El proyecto presenta **MTG Grimorio**, una plataforma de construcción de mazos y seguimiento de torneos para *Magic: The Gathering*, implementando un sistema de diseño propio mediante `@theme`, arquitectura *mobile-first* verificada en `360px`, `768px` y `1280px`, modo oscuro persistente y animaciones personalizadas.

---

## Instrucciones de Ejecución

1. Instalar las dependencias del proyecto:

   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo local de Vite:

   ```bash
   npm run dev
   ```

3. Abrir la aplicación en el navegador (por defecto en `http://localhost:5173/`).

4. Comprobar la adaptación responsiva en las DevTools (360px, 768px y 1280px) y alternar entre el Modo Pergamino (claro) y el Modo Vacío (oscuro) desde el interruptor de la barra de navegación.

---

## Arquitectura y Sistema de Diseño (Tailwind CSS v4)

- **`index.html`:** Carga de las tipografías Cinzel (títulos arcanos) e Inter (lectura de interfaz).
- **`src/index.css`:** Configuración *CSS-first* sin `tailwind.config.js` mediante `@import "tailwindcss";`, variante personalizada `@custom-variant dark (&:where(.dark, .dark *));` y bloque `@theme` con:
  - **Paleta Arcane Dualism:** `--color-grimorio-parchment`, `--color-grimorio-vellum`, `--color-grimorio-void`, `--color-grimorio-obsidian`, `--color-grimorio-ink`, `--color-grimorio-ivory`, `--color-grimorio-gold` y `--color-grimorio-bronze`.
  - **Tokens de maná:** `--color-mana-white`, `--color-mana-blue`, `--color-mana-black`, `--color-mana-red` y `--color-mana-green`.
  - **Tipografía y animación:** `--font-grimorio`, `--font-body` y utilidad de animación de entrada registrada con `@keyframes` dentro de `@theme`.
- **`src/App.jsx`:** Orquestación del estado del tema (`localStorage` + sincronización de `.dark` en `<html>`) y renderizado condicional entre la entrega principal (`MisionPrincipal5`) y las prácticas opcionales de la unidad.
- **`src/MisionPrincipal5/`:** Componentes modulares de la landing page (Navbar con Flexbox, Hero con animación de invocación, rejilla de características y planes con Grid y `.map()`, y Footer).

---

## Uso de IA

**Herramienta utilizada:** Gemini CLI integrado en VS Code como pareja de programación (*pair programmer*) siguiendo un plan incremental de 5 fases, manteniendo la regla de escritura manual de todo el código JSX y CSS.

### Prompts reales relevantes

- **Planificación y tokens:** *"Propón primero un plan de 5 fases pequeñas (cada una con un hito visual comprobable y su commit previsto). En cada fase, explícame los conceptos de Tailwind v4 que necesito aplicar antes de escribir código. No escribas ningún archivo ni generes código JSX/CSS todavía."*
- **Ajuste de sistema de diseño y breakpoints:** *"Que la landing sea de un producto real temático de Magic: The Gathering ('MTG Grimorio · Deck Builder & Tournament Tracker'), con tokens temáticos en `@theme` en lugar de nombres genéricos, revisando explícitamente los tres breakpoints de la rúbrica: 360px (base mobile-first), 768px (`md:`) y 1280px (`xl:`)."*

### Método de verificación

Comprobación visual en las DevTools del navegador sobre los tres anchos objetivo (360px, 768px y 1280px) para descartar desbordamientos horizontales, verificación del ratio de contraste WCAG AA en modo claro y modo oscuro, e inspección de las utilidades generadas por Tailwind v4 a partir del bloque `@theme`.

### Código escrito a mano

Definición completa del bloque `@theme`, los `@keyframes` y `@custom-variant dark` en `src/index.css`; enlace de tipografías en `index.html`; lógica de persistencia del tema en `src/App.jsx`; y maquetación íntegra de los componentes JSX de la landing page con renderizado declarativo mediante `.map()`.

---

## Autopsia (Decisiones Técnicas)

### 1. Tokens semánticos en `@theme` con variantes de contraste diferenciadas frente a valores arbitrarios (`[#hex]`)

- **Decisión:** Definir variables semánticas (`--color-grimorio-parchment`, `--color-grimorio-void`, `--color-grimorio-gold`, `--color-grimorio-bronze`) dentro de `@theme` en `src/index.css`, empleando bronce oscuro (`#8a6914`) para acentos tipográficos sobre fondo claro y dorado (`#d4af37`) sobre fondo oscuro.
- **Por qué:** Garantiza la legibilidad y el cumplimiento del contraste mínimo WCAG AA (4.5:1) en ambos temas, centraliza la identidad visual en una única fuente de verdad CSS y permite que Tailwind v4 genere utilidades nativas (`bg-grimorio-*`, `text-grimorio-*`, `border-grimorio-*`) sin archivos de configuración JavaScript.
- **Alternativa descartada:** Utilizar valores arbitrarios repetidos en el JSX (`text-[#d4af37]`) o el antiguo `tailwind.config.js`, lo cual rompería el paradigma *CSS-first* de Tailwind v4 y generaría bajo contraste del dorado sobre fondo claro.

### 2. Modo oscuro manual mediante `@custom-variant dark` y `localStorage` frente a `prefers-color-scheme`

- **Decisión:** Registrar `@custom-variant dark (&:where(.dark, .dark *));` en CSS y controlar la presencia de la clase `.dark` en `document.documentElement` mediante estado en React sincronizado con `localStorage`.
- **Por qué:** Permite al usuario alternar voluntariamente entre la estética de lectura (Pergamino) y la estética nocturna (Vacío) desde el botón de la barra de navegación, manteniendo su elección persistente tras recargar la página.
- **Alternativa descartada:** Depender exclusivamente de la detección automática del sistema operativo (media), lo que impediría ofrecer un selector interactivo funcional en la interfaz.

### 3. Criterio de separación entre Flexbox y Grid con enfoque mobile-first frente a anchos rígidos

- **Decisión:** Utilizar Flexbox (`flex`, `justify-between`, `items-center`) para alineaciones unidimensionales en la cabecera y controles interactivos, y CSS Grid (`grid-cols-1`, `md:grid-cols-2`, `xl:grid-cols-3`) para la distribución bidimensional de las tarjetas de características y planes, diseñando la base sin prefijos para 360px.
- **Por qué:** Evita desplazamientos horizontales en dispositivos móviles estrechos (360px) y escala de forma predecible hacia tableta (768px) y escritorio (1280px) sin recurrir a posicionamientos absolutos ni medidas fijas en píxeles.
- **Alternativa descartada:** Maquetar las rejillas mediante contenedores `flex-wrap` con porcentajes calculados manualmente o fijar anchos estáticos que provocan cortes en pantallas pequeñas.

### 4. Registro de `@keyframes` dentro de `@theme` frente a hojas de estilo externas aisladas

- **Decisión:** Declarar la animación de entrada con `@keyframes` asociada a una variable `--animate-*` dentro del propio bloque `@theme` de Tailwind v4.
- **Por qué:** Expone la animación como una utilidad estándar (`animate-*`) compatible con variantes de estado, puntos de ruptura y preferencias de accesibilidad (`motion-safe:`), manteniendo todo el sistema de diseño cohesionado.
- **Alternativa descartada:** Definir clases de animación sueltas fuera del sistema de utilidades de Tailwind o incorporar librerías externas de animación innecesarias.