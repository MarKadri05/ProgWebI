# ⚡ PokeAPI Odyssey · Misión 2

**Misión M2 · Async Odyssey** — Programación Web I (Cliente) · U-tad (2026–2027).

Aplicación web interactiva desarrollada con **Vite + React (JSX)** para consumir y visualizar datos de la **PokeAPI** mediante peticiones HTTP asíncronas (`fetch` con `async/await`), control de excepciones con `try...catch`, comprobación explícita de `response.ok` y gestión declarativa de estados visuales de la UI (**Carga**, **Datos** y **Error**).

---

## 🚀 Ejecución y Prueba Local

1. Instalar dependencias del proyecto:

```bash
   npm install
```

2. Ejecutar el servidor de desarrollo de Vite:

```bash
   npm run dev
```

3. Abrir en el navegador la URL local indicada por Vite (por ejemplo: <http://localhost:5173/>).

---

## 🤖 Sección Obligatoria: Uso de IA

De acuerdo con la **Regla de Oro** de la asignatura, la Inteligencia Artificial se utiliza como un colaborador de desarrollo, asegurando la capacidad de defender y explicar cada línea de código escrita.

### Tareas Delegadas

- Apoyo en la estructuración visual **CSS/Flexbox** para las tarjetas de Pokémon y el contenedor responsive.
- Asistencia en la arquitectura de **Módulos ES** para separar la capa de servicios HTTP (`pokemonService.js`) de los componentes de interfaz en JSX.

### Prompts Reales Utilizados

> *"Actúa como mi compañero de programación (pair programmer) y evaluador exigente para la Misión 2 (M2 · Async Odyssey) de la asignatura Programación Web I (Cliente). Lee el archivo GEMINI.md en la raíz del repositorio para conocer las normas globales de clase, las convenciones de la asignatura y la rúbrica. Voy a construir mi aplicación web con Vite + React (JSX) consumiendo la API pública PokeAPI..."*

### Método de Verificación

Inspección directa desde las **DevTools de Chrome** (pestañas *Network* y *Console*), simulando caídas de red y búsquedas de nombres inexistentes para comprobar que la interfaz activa el estado de Error sin bloquear la ejecución.

---

## 🔬 Sección Obligatoria: Autopsia (Decisiones Técnicas)

### 1. Abstracción en Capa de Servicios (`pokemonService.js`) y Verificación Estricta de `response.ok`

- **Qué:** Se extrae toda la lógica de red y peticiones HTTP a un módulo JavaScript puro (`src/services/PokemonService.js`), evaluando explícitamente `if (!response.ok)` y lanzando un `Error` manual antes de procesar el JSON.
- **Por qué:** Desacopla la lógica de infraestructura de la presentación en React, respetando el principio de responsabilidad única (SRP). Además, la API `fetch` nativa no rechaza la promesa en errores HTTP 4xx o 5xx, por lo que validar `response.ok` es imprescindible para activar el bloque `catch` ante fallos del servidor o recursos inexistentes.
- **Alternativa descartada:** Invocar `fetch()` directamente dentro del `useEffect` de los componentes JSX y asumir que el bloque `catch` captura automáticamente cualquier error HTTP (ej. 404 Not Found).

### 2. Transformación Declarativa de Datos con `.map()` e Inmutabilidad

- **Qué:** Renderizar la colección de tarjetas en JSX mediante el método declarativo `.map()`, asignando a cada nodo un atributo `key` único y estable.
- **Por qué:** El uso de `.map()` garantiza inmutabilidad, devuelve directamente elementos JSX procesables por React y optimiza el algoritmo de reconciliación del Virtual DOM al proporcionar una clave única (`key={pokemon.id}`).
- **Alternativa descartada:** Utilizar bucles imperativos `for` clásicos o métodos con efectos secundarios (como `.forEach()`), los cuales están prohibidos por convención en la asignatura y rompen el paradigma declarativo de React.