# ⚡ PokeAPI Odyssey · Misión 2

**Misión M2 · Async Odyssey**.

Aplicación web interactiva desarrollada con **Vite + React (JSX)** para consumir y visualizar datos de la **PokeAPI** mediante peticiones HTTP asíncronas (`fetch` con `async/await`), control de excepciones con `try...catch`, comprobación explícita de `response.ok` y gestión declarativa de estados visuales de la UI (**Carga**, **Datos** y **Error**).

---

## Funcionalidades

- Listado de los primeros 20 Pokémon con su número (`#001`), sprite y nombre, en una cuadrícula de 3 columnas.
- Buscador reactivo por nombre, filtrado en tiempo real sobre los datos ya cargados.
- Tres estados visuales declarativos: **Carga**, **Datos** y **Error**.
- Mensaje específico cuando la búsqueda no devuelve resultados.
- Caché de las peticiones en `localStorage` (**BONUS**).
- Tema claro/oscuro automático según la preferencia del sistema, mediante variables CSS.

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

## 🤖 Uso de IA

De acuerdo con la **Regla de Oro** de la asignatura, la Inteligencia Artificial se utiliza como un colaborador de desarrollo, asegurando la capacidad de defender y explicar cada línea de código escrita.

### Tareas Delegadas

- Apoyo en la estructuración visual: cuadrícula de 3 columnas fijas con **CSS Grid**, tarjetas con **Flexbox** y colores adaptados al tema claro/oscuro mediante variables CSS.
- Asistencia en la arquitectura de **Módulos ES** para separar la capa de servicios HTTP (`PokemonService.js`) de los componentes de interfaz en JSX.
- Depuración de estilos y rutas de importación: detectar que `App.css` no estaba importado en `App.jsx` y que un import no coincidía en mayúsculas con el nombre real del archivo (`PokemonService.js`).

### Prompts Reales Utilizados

> *"Actúa como mi compañero de programación y evaluador para la Misión 2 (M2 · Async Odyssey) de la asignatura Programación Web I (Cliente). Lee el archivo GEMINI.md en la raíz del repositorio para conocer las normas globales de clase, las convenciones de la asignatura y la rúbrica. Voy a construir mi aplicación web con Vite + React (JSX) consumiendo la API pública PokeAPI..."*

> *"Cómo puedo implementar en React un buscador que filtre las tarjetas en tiempo real a medida que el usuario escribe en un input sin tener que volver a hacer peticiones a la red?"*

### Método de Verificación

Inspección directa desde las **DevTools de Chrome** (pestañas *Network*, *Console* y *Application*):

- **Estado de Error por red:** se vacía `localStorage` (*Application → Local Storage*), se activa el modo *Offline* en *Network* y se recarga. La interfaz muestra el estado de Error sin bloquear la ejecución. Es necesario vaciar antes la caché: si hay datos guardados, la app los sirve sin hacer ninguna petición.
- **Búsqueda sin resultados:** al escribir un nombre inexistente, la interfaz muestra el mensaje de "sin resultados" y la aplicación sigue respondiendo.
- **Caché (BONUS):** en la segunda carga, la pestaña *Network* no muestra peticiones a la PokeAPI y los datos aparecen al instante.

---

## Autopsia (Decisiones Técnicas)

### 1. Abstracción en Capa de Servicios (`PokemonService.js`) y Verificación Estricta de `response.ok`

- **Qué:** Se extrae toda la lógica de red y peticiones HTTP a un módulo JavaScript puro (`src/services/PokemonService.js`), evaluando explícitamente `if (!response.ok)` y lanzando un `Error` manual antes de procesar el JSON.
- **Por qué:** Desacopla la lógica de infraestructura de la presentación en React, respetando el principio de responsabilidad única (SRP). Además, la API `fetch` nativa no rechaza la promesa en errores HTTP 4xx o 5xx, por lo que validar `response.ok` es imprescindible para activar el bloque `catch` ante fallos del servidor o recursos inexistentes.
- **Alternativa descartada:** Invocar `fetch()` directamente dentro del `useEffect` de los componentes JSX y asumir que el bloque `catch` captura automáticamente cualquier error HTTP (ej. 404 Not Found).

### 2. Transformación Declarativa de Datos con `.map()` e Inmutabilidad

- **Qué:** Renderizar la colección de tarjetas en JSX mediante el método declarativo `.map()`, asignando a cada nodo un atributo `key` único y estable.
- **Por qué:** El uso de `.map()` garantiza inmutabilidad, devuelve directamente elementos JSX procesables por React y optimiza el algoritmo de reconciliación del Virtual DOM al proporcionar una clave única (`key={pokemon.id}`).
- **Alternativa descartada:** Utilizar bucles imperativos `for` clásicos o métodos con efectos secundarios (como `.forEach()`), los cuales están prohibidos por convención en la asignatura y rompen el paradigma declarativo de React.

### 3. Persistencia local mediante `localStorage` para caché de peticiones (Bonus)

- **Qué:** Guardar en `localStorage` las respuestas procesadas de la PokéAPI utilizando `JSON.stringify()` y recuperándolas con `JSON.parse()` antes de realizar nuevas peticiones HTTP.
- **Por qué:** Evita peticiones repetidas a la red para datos estáticos que no cambian, acelerando drásticamente el tiempo de carga de la aplicación y cumpliendo el punto BONUS de la rúbrica.
- **Alternativa descartada:** Guardar los datos únicamente en la memoria de un estado de React (`useState`), descartado porque la información se perdería al recargar la página (F5).

### 4. Filtrado como dato derivado del estado con `.filter()`

- **Qué:** El buscador guarda solo el texto en un estado (`searchTerm`) y calcula `filteredPokemons` en cada render con `.filter()`, comparando en minúsculas y sin espacios sobrantes.
- **Por qué:** No muta la lista original `pokemons` y evita `useEffect` adicionales y estados duplicados que habría que mantener sincronizados.
- **Alternativa descartada:** Rellenar un array auxiliar con `.forEach()` vaciándolo a mano en cada pulsación, prohibido por convención en la asignatura.

### 5. Peticiones de detalle en paralelo con `Promise.all`

- **Qué:** Tras obtener el listado, se lanzan las peticiones de detalle de cada Pokémon con `Promise.all(data.results.map(async ...))`, comprobando `response.ok` en cada una.
- **Por qué:** Las peticiones se ejecutan a la vez en lugar de una tras otra, por lo que el tiempo total es el de la más lenta. Si una falla, la promesa se rechaza y el error llega al `catch` de `App.jsx`, que activa el estado de Error.
- **Alternativa descartada:** Un bucle `for` con `await` dentro, que serializa las 20 peticiones y vuelve la carga mucho más lenta, además de estar prohibido por convención.