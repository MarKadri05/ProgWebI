# Gwent Codex · Geralt's Grimoire (Misión 3)

### Misión M3 · Reactor Core — Programación Web I (Cliente)

Aplicación web interactiva desarrollada con **Vite + React 19 (JSX)** para consumir y visualizar datos en tiempo real del universo de *The Witcher* mediante la API pública de **Gwent.one** (base de datos comunitaria con un catálogo superior a las 1.000 cartas reales del juego independiente de Gwent). La aplicación implementa peticiones HTTP asíncronas (`fetch` con `async/await`), control de excepciones con `try...catch`, comprobación explícita de `response.ok`, gestión declarativa de estados visuales de la UI (**Loading**, **Data** y **Error**) y ampliación interactiva con texto de ambientación (*flavor text*).

---

## Ejecución y Prueba Local

1. Instalar las dependencias del proyecto:

   ```bash
   npm install
   ```

2. Ejecutar el servidor de desarrollo de Vite:

   ```bash
   npm run dev
   ```

3. Abrir en el navegador la URL local indicada por Vite (por ejemplo: `http://localhost:5173/`).

---

## Uso de IA

De acuerdo con la Regla de Oro de la asignatura, la Inteligencia Artificial se utiliza como un colaborador de desarrollo, asegurando la capacidad de defender y explicar cada línea de código escrita.

### Tareas delegadas

- Apoyo en la maquetación visual y temática en CSS (estética de la taberna de Geralt) para las tarjetas de Gwent y la retícula responsive (`gridTemplateColumns`).
- Asistencia en la arquitectura de Módulos ES para aislar la capa de servicios HTTP (`src/services/gwentService.js`) de la capa de renderizado reactivo en JSX (`src/App.jsx`) y la descomposición en componentes presentacionales (`GwentCard`, `GwentGrid`, `FilterPanel`, `StatusMessage`, `GwentModal`).
- Depuración del contrato de datos de la API de Gwent.one para la extracción del identificador gráfico de la ilustración (`card.id?.art`), la asignación de la fuerza real (`card.power`), la normalización declarativa de las filas del tablero (Melee, Ranged, Siege, Leader, Special) y la recuperación del texto narrativo (*flavor text*).

### Prompts reales utilizados

- *"¿Cómo se implementa la verificación explícita de `response.ok` con `async/await` en un módulo JS para lanzar una excepción legible cuando la API devuelva un status HTTP de error como 404 o 500?"*
- *"¿Cómo construir dinámicamente la URL de las imágenes oficiales de las cartas de Gwent (`https://gwent.one/image/gwent/assets/card/art/medium/{artId}.jpg`) inspeccionando las propiedades reales del objeto JSON mediante la transformación declarativa de datos con `.map()` sin recurrir a bucles imperativos?"*
- *"¿Cómo puedo implementar en React un buscador que filtre las tarjetas en tiempo real a medida que el usuario escribe en un input, sin tener que volver a hacer peticiones a la red?"*
- *"¿Cuál es la forma más limpia en React 19 de descomponer un componente principal en subsistemas presentacionales (`FilterPanel`, `GwentGrid`, `GwentCard`, `StatusMessage`) manteniendo el estado mínimo arriba?"*
- *"¿Cuál es la forma más limpia en React 19 de gestionar una ventana modal interactiva para mostrar la imagen ampliada y la cita ('flavor text') de una tarjeta seleccionada usando estado elevable?"*

### Método de verificación

- Inspección directa desde las DevTools de Chrome (pestañas Network, Console y Application), simulando caídas de red y respuestas erróneas para verificar que la interfaz activa el estado de Error sin congelar la aplicación.
- Verificación manual de la muestra extraída de la extensa base de datos (+1.000 cartas) de Gwent.one, confirmando la carga limpia de ilustraciones desde su CDN pública (`https://gwent.one/image/gwent/assets/card/art/medium/{artId}.jpg`), la internacionalización en inglés de los controles de UI, el filtrado reactivo por fila, la ordenación dinámica por fuerza/nombre y el despliegue de la ventana modal al hacer clic en cualquier carta.

---

## Autopsia (Decisiones Técnicas)

### 1. Estructura multicapa (módulos ES) vs. monolito (`.js` vs. `.jsx`)

- **Qué:** Se extrae toda la lógica de peticiones HTTP, desestructuración de claves del objeto JSON de Gwent y parsing de datos a un módulo JavaScript puro (`src/services/gwentService.js`), importándolo posteriormente desde el componente principal `App.jsx`.
- **Por qué:** Mantiene una separación estricta de responsabilidades (*Separation of Concerns*), facilita la reutilización de la capa de datos y evita recargar los componentes visuales de React con detalles de infraestructura de red.
- **Alternativa descartada:** Escribir las peticiones `fetch()` directamente dentro del hook `useEffect` en `App.jsx`. Se descartó para evitar un alto acoplamiento entre la lógica de red y la presentación visual.

### 2. Transformación declarativa de datos con `.map()` e inmutabilidad

- **Qué:** Renderizar la colección de tarjetas en JSX mediante el método declarativo `.map()`, construyendo objetos inmutables con ID, nombre, posición en el tablero, fuerza, imagen y cita narrativa (`flavor`).
- **Por qué:** El uso de `.map()` garantiza inmutabilidad en las colecciones de datos y asigna la propiedad `key` única obligatoria (`key={card.id}`) exigida por React para optimizar el proceso de reconciliación del Virtual DOM.
- **Alternativa descartada:** Utilizar bucles imperativos `for` clásicos o métodos de iteración con efectos secundarios como `.forEach()`, prohibidos explícitamente por las normas de la asignatura.

### 3. Validación explícita de `response.ok` en la capa asíncrona

- **Qué:** Evaluar manualmente `if (!response.ok)` tras ejecutar `fetch()` y lanzar un `Error` descriptivo antes de intentar transformar la respuesta a JSON.
- **Por qué:** La API `fetch` nativa del navegador **no** rechaza la promesa si el servidor responde con un código de estado de error HTTP (como 404 Not Found o 500 Internal Server Error). La comprobación explícita es imprescindible para redirigir el flujo al bloque `catch` y notificar adecuadamente a la UI.
- **Alternativa descartada:** Asumir que `fetch()` rechaza la promesa automáticamente ante cualquier error de respuesta del servidor.

### 4. Búsqueda, filtrado y ordenación como valores derivados del estado

- **Qué:** Mantener en el estado de React únicamente los términos de control seleccionados (`searchTerm`, `selectedPosition` y `sortBy`), calculando las colecciones `filteredCards` y `sortedCards` en tiempo real mediante la combinación inmutable de `.filter()` y una copia con `[...filteredCards].sort()`.
- **Por qué:** Cumple estrictamente el principio de React de "estado mínimo y valores derivados", evitando almacenar arrays duplicados en `useState` o provocar re-renderizados fuera de control.
- **Alternativa descartada:** Utilizar el método mutador `.sort()` directamente sobre el array principal `cards`, lo que alteraría el estado original en memoria y rompería la consistencia de los filtros visuales.

### 5. Descomposición en componentes presentacionales reutilizables

- **Qué:** Refactorizar `App.jsx` para delegar la interfaz en cinco componentes independientes dentro de `src/components/`: `FilterPanel` (controles reactivos), `GwentGrid` (contenedor iterable), `GwentCard` (ficha individual), `StatusMessage` (notificaciones de red) y `GwentModal` (vista ampliada).
- **Por qué:** Evita la creación de "componentes-dios" acumuladores de responsabilidad, facilita el mantenimiento modular, mejora la legibilidad del árbol JSX y permite la reutilización aislada de cada elemento de interfaz.
- **Alternativa descartada:** Mantener todo el marcado JSX de tarjetas, filtros, avisos de error e inputs dentro de un único archivo monolítico `App.jsx`.

### 6. Selección de carta y renderizado condicional de ventana modal (`GwentModal`)

- **Qué:** Implementar el estado `selectedCard` en `App.jsx`, que se actualiza al hacer clic en una tarjeta y desacopla la presentación de la cita narrativa (*flavor text*) en el componente `GwentModal`.
- **Por qué:** Permite ampliar la ilustración y consultar el texto narrativo en cursiva o mostrar un mensaje por defecto si la carta carece de cita, proporcionando retroalimentación visual directa al usuario.
- **Alternativa descartada:** Navegar a una nueva ruta de página o forzar la recarga de datos de red al seleccionar una carta.