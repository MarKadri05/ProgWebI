# 🔮 Misión 1: El Oráculo de los Números

- **Tema:** [[_MOC-Tema1]]
- **Estado:** 🟢 Completado
- **Conceptos clave utilizados:** [[Arquitectura-DOM]], [[Estrategia-Eventos]]

## 📝 Resumen del Ejercicio
Mini-juego interactivo en el que el usuario debe adivinar un número aleatorio del 1 al 100 en un máximo de 7 intentos.

## 🛠️ Conceptos JS y DOM Aplicados
- **Lectura y Conversión:** Captura del valor con `input.value` y conversión con `Number()`.
- **Validación:** Comprobación temprana (*early return*) para evitar gastar intentos en entradas vacías o fuera de rango (1-100).
- **Manipulación segura del DOM:** Modificación del estado visual con `textContent` (evitando vulnerabilidades XSS de `innerHTML`).
- **Historial:** Uso de un array `historialJugador` y formateo dinámico con `.join(', ')`.

## 🔬 Autopsia / Decisiones de Diseño
- **Uso de Early Return:** Validar primero la entrada y hacer un `return` directo evita ensuciar la lógica principal y no penaliza los intentos del jugador.
- **Evitar innerHTML:** Inyectar el historial con `textContent` e interconectar valores con `.join(', ')` es más seguro frente a inyecciones de script.