# Contexto del Proyecto: Programación Web I (Cliente) · U-tad (2026-2027)

## Contexto General del Repositorio
- **Objetivo:** Desarrollo de misiones y entregas para la asignatura *Programación Web I (Cliente)*[cite: 1, 7].
- **Duración:** 4 meses (7 Unidades Didácticas)[cite: 7, 9].
- **Estructura del repo:** Repositorio único dividido en subcarpetas por tema/misión (`/m1`, `/m2`, etc.).
- **Regla de Oro:** Se permite el uso de IA, pero TODO el código debe poder ser explicado y defendido línea a línea en la defensa [cite: 2, 7].

---

## Convenciones y Reglas del Código (JavaScript / TypeScript)

### Reglas Globales y de Seguridad
- **Sintaxis moderna:** Uso estricto de `const` por defecto, `let` solo si el valor cambia. Jamás usar `var`[cite: 1, 2, 6].
- **Seguridad DOM:** Uso prioritario de `textContent` frente a `innerHTML` para prevenir vulnerabilidades XSS[cite: 2, 6].
- **Manejo de Eventos:** Uso de `addEventListener` y delegación de eventos. Prohibido handlers inline como `onclick="..."` en el HTML[cite: 2, 6].
- **Mapeo de archivos:** HTML, CSS y JS separados en archivos propios[cite: 2, 6].

### Reglas Específicas de Clase (Obligatorias)
- **Cero bucles `for`:** NUNCA usar bucles `for` clásicos. Utilizar `.map()` para transformar arrays[cite: 4, 8].
- **Cero `.forEach()`:** Evitar `.forEach()`. Sustituirlo por `.filter()` cuando se requiera iterar o filtrar elementos.
- **Robustez y Control:** Envolver operaciones propensas a fallar (interacciones DOM, peticiones, parsing) en bloques `try...catch`.

---

## Comentarios y Defensa Oral
- **Comentarios pedagógicos:** Generar comentarios extensos explicativos en el código JS.
- **Estructura de comentarios:** Cada función o decisión de estado debe explicar:
  1. QUÉ hace la línea/función.
  2. POR QUÉ se hizo de esta forma.
  3. QUÉ alternativa se descartó (ej. delegación vs listener individual, textContent vs innerHTML)[cite: 2, 6].
- Los comentarios servirán de guía visual frente a la pantalla durante la defensa[cite: 2].

---

## Integración con Obsidian y Documentación
- Las notas conceptuales viven en la bóveda de Obsidian vinculadas con [[Wikilinks]] e indexadas en los archivos `_MOC-TemaX.md`.
- Durante cada sesión, Gemini debe proponer los resúmenes o notas que debo anotar en mi Obsidian[cite: 3].
- En cada misión, Gemini debe ayudar a redactar las dos secciones obligatorias del `README.md`:
  - **Uso de IA:** Prompts reales, tareas delegadas y método de verificación en DevTools.
  - **Autopsia:** Las 2 decisiones técnicas más discutibles y las alternativas descartadas[cite: 2, 6, 7].

---

## Temario
> **Estado de clase:** Actualmente se ha trabajado en clase hasta la **Unidad 1 (U1)**. Ignorar el resto del temario para la misión actual.

1. **U1 · El Despertar del DOM:** HTML, CSS, Vanilla JS, Eventos y Delegación (Sin React ni bibliotecas)[cite: 2, 7, 9].
2. **U2 · JS Avanzado & Asincronía:** Closures, Promesas, `async/await`, Fetch API, Módulos ES, Vite[cite: 7, 8, 9].
3. **U3 · React 19:** Componentes, Estado, Hooks, Renderizado[cite: 7, 9].
4. **U4 · Formularios & Consultas:** React Hook Form, Zod, TanStack Query[cite: 7, 9].
5. **U5 · Tailwind CSS v4:** Sistema de diseño, Responsive, Dark Mode[cite: 7, 9].
6. **U6 · Next.js 16:** App Router, Server Components, Server Actions[cite: 7, 9].
7. **U7 · Testing:** Vitest & React Testing Library[cite: 7, 9].