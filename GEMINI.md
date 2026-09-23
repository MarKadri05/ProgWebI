# Contexto del Proyecto: [Nombre de tu Proyecto]

## 🎯 Objetivo General
Breve descripción de lo que hace el proyecto y el objetivo académico/técnico.

## 📐 Convenciones y Reglas del Código
- **Lenguaje/Framework**: HTML5, CSS3, JavaScript ES6+ (Vanilla JS).
- **Estilo**: Uso de `const` por defecto, `let` solo si cambia[cite: 1, 2]. Prohibido `var`[cite: 1, 2].
- **Seguridad**: Uso de `textContent` frente a `innerHTML` para prevenir XSS[cite: 1, 2].
- **Eventos**: Uso estricto de `addEventListener` y delegación de eventos[cite: 1, 2]. Evitar `onclick` inline[cite: 1, 2].
- **Regla de Oro**: Todo código generado debe ser explicable para la defensa oral[cite: 1, 2].

## 📂 Arquitectura de Archivos
- `index.html`: Estructura semántica.
- `styles.css`: Estilos visuales.
- `app.js`: Lógica del cliente y manipulación del DOM.
- `README.md`: Contiene las secciones obligatorias "Uso de IA" y "Autopsia"[cite: 1, 2].

## 🗺️ Mapa de Conocimiento (Obsidian)
Para ver la relación de conceptos y decisiones de diseño, consulta las notas vinculadas en Obsidian:
- [[Arquitectura-DOM]]
- [[Decisiones-Autopsia]]
- [[Estrategia-Eventos]]