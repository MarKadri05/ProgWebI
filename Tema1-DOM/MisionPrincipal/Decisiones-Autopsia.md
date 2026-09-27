# Bitácora de Decisiones Técnicas y Autopsia · Misión 1 (Memory DOM)

## 0. Plan de Desarrollo por Fases y Commits
- [x] **Fase 1: Estructura Semántica (HTML) y Escenario Visual (CSS)**
  - *Objetivo:* Formulario de configuración, marcadores de estado y grid responsive con perspectiva 3D para el volteo de cartas.
- [x] **Fase 2: Validación con `try...catch` y Motor de Datos (Parejas y Mezcla)**
  - *Objetivo:* Validación matemática de paridad con excepciones controladas, generación funcional inmutable de parejas y barajado en memoria (`tableroCartas`).
- [x] **Fase 3: Renderizado Dinámico Seguro y Delegación de Eventos**
  - *Objetivo:* Creación imperativa segura de nodos DOM (`createElement` + `textContent`) e inserción eficiente con `DocumentFragment`; listener único en `#board` mediante delegación con `closest('.card')`.
- [ ] **Fase 4: Máquina de Estados del Juego (Volteo, Bloqueo y Emparejamiento)**
  - *Objetivo:* Lógica de turnos (`primeraCarta`, `segundaCarta`, `bloqueoTablero`), retardo con `setTimeout` para fallo y detección de condición de victoria.
- [ ] **Fase 5: Reseteo, Accesibilidad y Preparación de la Defensa Oral**
  - *Objetivo:* Botón/flujo de reinicio, pulido de comentarios pedagógicos, redacción final de `Decisiones-Autopsia.md` y simulación de preguntas de examen.

---

## 1. Decisiones de Arquitectura y Normativa de Código
- **Sustitución de bucles imperativos:** Uso estricto de `.map()` y `.filter()` en lugar de `for` o `.forEach()`.
- **Estrategia contra XSS:** Creación de nodos nativos (`createElement`) y asignación mediante `textContent` en vez de `innerHTML`.
- **Gestión de eventos:** Delegación de eventos en el contenedor padre (`#board`) para optimizar consumo de memoria y soportar tableros dinámicos.
- **Tolerancia a fallos:** Bloques `try...catch` en la captura de entradas de usuario y validación de paridad.

---

## 2. Decisiones Técnicas Detalladas (Autopsia)

### Decisión 1 (CSS): Animación 3D mediante `transform: rotateY()` y `backface-visibility`
- **QUÉ HACE:** Crea un contenedor `.card` con `transform-style: preserve-3d` y dos caras absolutas (`.card-front` y `.card-back`). Al alternar la clase `.is-flipped`, rota 180° sobre el eje Y.
- **POR QUÉ:** Delega la animación a la GPU mediante transformaciones 3D compuestas, garantizando 60 fps estables y evitando reflows en el navegador.
- **ALTERNATIVA DESCARTADA:** Ocultar/mostrar caras mediante `display: none` o `visibility: hidden`. Descartada porque impide transiciones fluidas y fuerza recalculación del layout en el DOM.

### Decisión 2 (JS - Fase 2): Validación de Paridad con Excepciones Controladas (`try...catch`)
- **QUÉ HACE:** Calcula `filas * columnas` y evalúa el operador módulo (`totalCartas % 2 !== 0`). Si el total es impar, interrumpe el flujo arrojando un error semántico (`throw new Error(...)`).
- **POR QUÉ:** Centraliza el manejo de fallos en un único bloque `catch`, asegurando que no se intente renderizar un juego imposible de completar y mostrando el mensaje accesible en el DOM mediante `textContent`.
- **ALTERNATIVA DESCARTADA:** Usar una cascada de sentencias `if/else` devolviendo flags booleanos (`false`). Descartada porque ensucia la lógica de negocio y dispersa la responsabilidad del control de errores.

### Decisión 3 (JS - Fase 2): Generación y Barajado Funcional Inmutable
- **QUÉ HACE:** Genera las parejas duplicadas con `Array.from()` + `.map(n => [n, n]).flat()` y las desordena con `.toSorted(() => Math.random() - 0.5)`.
- **POR QUÉ:** Cumple la prohibición estricta de bucles imperativos (`for`, `while`) y garantiza inmutabilidad al no alterar los arrays originales.
- **ALTERNATIVA DESCARTADA:** Algoritmo tradicional de Fisher-Yates con bucle `while` decreciente y mutaciones directas por índice (`array[i] = ...`). Descartada por violar la regla de "cero bucles `for`" de la rúbrica.

### Decisión 4 (JS - Fase 3): Delegación de Eventos frente a Listeners Individuales
- **QUÉ HACE:** Registra un único `addEventListener('click')` en `#board` y utiliza `evento.target.closest('.card')` para capturar la interacción de cualquier carta presente o futura.
- **POR QUÉ:** Reduce drásticamente la huella de memoria (1 listener vs N listeners) y evita fugas de memoria al limpiar o regenerar el tablero dinámicamente.
- **ALTERNATIVA DESCARTADA:** Asignar un listener individual a cada nodo `.card` durante el bucle de renderizado. Descartada por ineficiencia de memoria y riesgo de detached DOM nodes tras reiniciar la partida.

### Decisión 5 (JS - Fase 3): Construcción Segura del DOM con `DocumentFragment` y `textContent`
- **QUÉ HACE:** Construye la jerarquía de cada carta con `createElement` y `textContent`, acumulándolas en un `DocumentFragment` antes de inyectarlas en el DOM real con un único `appendChild`.
- **POR QUÉ:** Inmunidad total contra inyecciones XSS y máxima optimización de rendimiento al provocar un único repintado (layout/reflow) del navegador.
- **ALTERNATIVA DESCARTADA:** Inyectar strings de HTML mediante plantillas literales con `board.innerHTML += '...'`. Descartada por vulnerabilidad a XSS y por obligar al navegador a re-parsear y destruir el árbol DOM en cada iteración.

---

## 3. Registro de Prompts y Verificación con IA
- **Tareas delegadas:**
  1. Diseño del algoritmo funcional para duplicar parejas numéricas sin bucles imperativos y estructura de control de excepciones.
  2. Arquitectura de renderizado con `DocumentFragment` y patrón de delegación de eventos con `closest()`.
- **Método de verificación en DevTools:**
  1. **Consola:** Introducción intencionada de dimensiones impares (ej. 3x3) para verificar en el panel *Console* y en el DOM que salta la excepción del `try...catch` sin romper la ejecución.
  2. **Inspección de memoria:** Comprobación del array `tableroCartas` en consola para verificar que contiene exactamente `(filas * columnas) / 2` pares idénticos distribuidos aleatoriamente.
  3. **Event Listeners tab:** Inspección en las DevTools del nodo `#board` para confirmar que existe **un único listener de click**, verificando que los nodos individuales `.card` no tienen listeners propios vinculados.
  4. **Elements tab:** Verificación de la propiedad CSS dinámica `--cols` inyectada en el elemento `#board` y de las clases `.is-flipped` al hacer clic.