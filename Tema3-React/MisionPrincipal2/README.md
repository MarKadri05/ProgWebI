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

> Rellenar esto con un prompt real

### Método de Verificación

Inspección directa desde las **DevTools de Chrome** (pestañas *Network* y *Console*), simulando caídas de red y búsquedas de nombres inexistentes para comprobar que la interfaz activa el estado de Error sin bloquear la ejecución.

---

## 🔬 Sección Obligatoria: Autopsia (Decisiones Técnicas)

### 1. Estructura Multicapa (Módulos ES) vs Monolito (`.js` vs `.jsx`)

- **Qué:** Se extrae toda la lógica de peticiones HTTP y consumo de datos a un módulo JavaScript puro (`src/services/pokemonService.js`), importándolo posteriormente dentro de los componentes JSX.
- **Por qué:** Mantiene una separación estricta de responsabilidades, facilita la reutilización y el testing, evita el alto acoplamiento en componentes visuales y simplifica la depuración de errores de red.
- **Alternativa descartada:** Escribir las peticiones `fetch` directamente dentro de un `useEffect` en `App.jsx`. Se descarta para evitar que el componente visual tenga demasiadas responsabilidades.

### 2. Transformación declarativa de datos con `.map()` e inmutabilidad

- **Qué:** Renderizar la colección de tarjetas en JSX mediante el método declarativo `.map()`.
- **Por qué:** El uso de `.map()` garantiza un código inmutable que genera elementos JSX limpios asignando la propiedad `key` obligatoria exigida por React para optimizar la reconciliación del árbol DOM visual.
- **Alternativa descartada:** Utilizar bucles imperativos `for` clásicos o métodos con efectos secundarios (como `.forEach()`).