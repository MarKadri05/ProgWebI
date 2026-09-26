# Bitácora de Decisiones Técnicas y Autopsia · Misión 1 (Memory DOM)

## 1. Decisiones de Arquitectura y Normativa de Código
- **Sustitución de bucles imperativos:** Uso estricto de `.map()` y `.filter()` en lugar de `for` o `.forEach()`.
- **Estrategia contra XSS:** Creación de nodos nativos (`createElement`) y asignación mediante `textContent` en vez de `innerHTML`.
- **Gestión de eventos:** Delegación de eventos en el contenedor padre (`#board`) para optimizar consumo de memoria y soportar tableros dinámicos.
- **Tolerancia a fallos:** Bloques `try...catch` en la captura de entradas de usuario y validación de paridad.

## 2. Decisiones Técnicas Detalladas
### Decisión CSS: Animación 3D mediante `transform: rotateY()` y `backface-visibility`
- **Qué hace:** Crea un contenedor `.card` con `transform-style: preserve-3d` y dos caras absolutas (`.card-front` y `.card-back`). Al añadir la clase `.is-flipped`, rota 180° sobre el eje Y.
- **Por qué se hizo así:** Se delega la animación a la GPU mediante transformaciones 3D, garantizando 60 fps estables y evitando el cálculo de reflows en el navegador.
- **Alternativa descartada:** Ocultar/mostrar caras mediante `display: none` o alternar `visibility: hidden`. Se descartó porque no permite transiciones suaves y fuerza recalcular el árbol de renderizado del DOM.

## 3. Registro de Prompts y Verificación con IA
*(Anotaremos aquí los problemas consultados y cómo se comprobaron en las DevTools)*