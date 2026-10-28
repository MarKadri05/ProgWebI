# Gwent Codex · El Grimorio de Geralt (Misión 3)

### Misión M3 · Reactor Core — Programación Web I (Cliente)

Aplicación web interactiva desarrollada con **Vite + React 19 (JSX)** para consumir y visualizar datos en tiempo real del universo de *The Witcher* mediante la API pública de **Gwent.one**. La aplicación implementa peticiones HTTP asíncronas (`fetch` con `async/await`), control de excepciones con `try...catch`, comprobación explícita de `response.ok` y gestión declarativa de estados visuales de la UI (Carga, Datos y Error).

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

- Apoyo en la maquetación visual en CSS temático para las tarjetas de Gwent y la retícula responsive (`gridTemplateColumns`).
- Asistencia en la arquitectura de Módulos ES para separar la capa de servicios HTTP (`src/services/gwentService.js`) de la capa de renderizado reactivo en JSX (`src/App.jsx`).
- Depuración del contrato de datos de la API de Gwent.one para la extracción correcta del identificador de la ilustración gráfica (`card.id?.art` o `card.artid`), asignación de la fuerza/poder real (`card.power`) y normalización declarativa de las filas del tablero.

### Prompts reales utilizados

- *"¿Cómo se implementa la verificación explícita de `response.ok` con `async/await` en un módulo JS para lanzar una excepción legible cuando la API devuelva un status HTTP de error como 404 o 500?"*
- *"¿Cómo construir dinámicamente la URL de las imágenes oficiales de las cartas de Gwent (`https://gwent.one/image/gwent/assets/card/art/medium/{artId}.jpg`) inspeccionando las propiedades reales del objeto JSON mediante la transformación declarativa de datos con `.map()` sin recurrir a bucles imperativos?"*

### Método de verificación

- Inspección directa desde las DevTools de Chrome (pestañas Network, Console y Application), simulando caídas de red y respuestas erróneas para verificar que la interfaz activa el estado de Error sin congelar la aplicación.
- Verificación manual de la colección ampliada a 80 cartas (~50% de la baraja total de Gwent), confirmando la carga limpia de ilustraciones y la correcta distribución de filas (⚔️ Cuerpo a Cuerpo, 🏹 A Distancia, 🏰 Asedio, 👑 Líder y 📜 Especial / Tiempo).

---

## Autopsia (Decisiones Técnicas)

### 1. Estructura multicapa (módulos ES) vs. monolito (`.js` vs. `.jsx`)

- **Qué:** Se extrae toda la lógica de peticiones HTTP, desestructuración de claves del objeto JSON de Gwent y parsing de datos a un módulo JavaScript puro (`src/services/gwentService.js`), importándolo posteriormente desde el componente principal `App.jsx`.
- **Por qué:** Mantiene una separación estricta de responsabilidades (*Separation of Concerns*), facilita la reutilización de la capa de datos y evita recargar los componentes visuales de React con detalles de infraestructura de red.
- **Alternativa descartada:** Escribir las peticiones `fetch()` directamente dentro del hook `useEffect` en `App.jsx`. Se descartó para evitar un alto acoplamiento entre la lógica de red y la presentación visual.

### 2. Transformación declarativa de datos con `.map()` e inmutabilidad

- **Qué:** Renderizar la colección de tarjetas en JSX mediante el método declarativo `.map()`, construyendo objetos inmutables con ID, nombre, posición en el tablero, fuerza e imagen.
- **Por qué:** El uso de `.map()` garantiza inmutabilidad en las colecciones de datos y asigna la propiedad `key` única obligatoria (`key={card.id}`) exigida por React para optimizar el proceso de reconciliación del Virtual DOM.
- **Alternativa descartada:** Utilizar bucles imperativos `for` clásicos o métodos de iteración con efectos secundarios como `.forEach()`, prohibidos explícitamente por las normas de la asignatura.

### 3. Validación explícita de `response.ok` en la capa asíncrona

- **Qué:** Evaluar manualmente `if (!response.ok)` tras ejecutar `fetch()` y lanzar un `Error` descriptivo antes de intentar transformar la respuesta a JSON.
- **Por qué:** La API `fetch` nativa del navegador **no** rechaza la promesa si el servidor responde con un código de estado de error HTTP (como 404 Not Found o 500 Internal Server Error). La comprobación explícita es imprescindible para redirigir el flujo al bloque `catch` y notificar adecuadamente a la UI.
- **Alternativa descartada:** Asumir que `fetch()` rechaza la promesa automáticamente ante cualquier error de respuesta del servidor.