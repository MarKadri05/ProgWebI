# Ejercicios y Tareas Opcionales · Programación Web I (Cliente)

Repositorio personal destinado al desarrollo y documentación de las **tareas opcionales, retos y misiones de calentamiento** de la asignatura *Programación Web I: Cliente*.

---

## Contexto Académico y Regla de Oro (Uso de IA)

Este proyecto forma parte de las actividades prácticas de la asignatura **Programación Web I: Cliente** (3.º curso del Grado en Ingeniería del Software, U-tad). 

En el marco de la asignatura se permite el uso de herramientas de Inteligencia Artificial Generativa como asistentes de desarrollo. No obstante, se aplica estrictamente la **Regla de Oro**:
> *"La nota evalúa la comprensión del código, no la capacidad de generarlo. Cada línea de código debe poder ser explicada, defendida y modificada en vivo durante las defensas orales individuales."*

---

## Índice de Entregas Opcionales

| Unidad | Misión / Temática | Estado | Enlace al código |
| **U1** | Misión 1: El oráculo de los números | 🟢 Completado | [Mision1.html](./Mision1.html) |
| **U1** | Misión 2: *Pendiente por realizar* | 🔴 Pendiente | *Próximamente* |
| **U1** | Misión 3: *Pendiente por realizar* | 🔴 Pendiente | *Próximamente* |
| **U2** | JS Avanzado, Asincronía & Módulos ES | 🔴 Pendiente | *Próximamente* |
| **U3** | React 19, Componentes & Estado | 🔴 Pendiente | *Próximamente* |
| **U4** | Formularios (RHF, Zod) & TanStack Query | 🔴 Pendiente | *Próximamente* |
| **U5** | Tailwind CSS v4 & Modos de Diseño | 🔴 Pendiente | *Próximamente* |
| **U6** | Next.js 16 (App Router & Server Components) | 🔴 Pendiente | *Próximamente* |
| **U7** | Testing con Vitest & React Testing Library | 🔴 Pendiente | *Próximamente* |

---

## Unidad 1 · Misión 1: El Oráculo de los Números

### Descripción de la misión realizada
Desarrollo de un juego completo en el navegador donde el jugador debe adivinar un número secreto aleatorio generado entre 1 y 100 en un máximo de **7 intentos**:
* **Lectura y Validación:** Captura del valor con `input.value`, conversión explícita mediante `Number()` y comprobación de rangos válidos (1–100) y valores vacíos/NaN sin consumir intentos.
* **Flujo de Juego y Feedback:** Notificación visual sobre si el número secreto es mayor o menor, conteo de intentos realizados y desactivación de controles al acertar o agotar oportunidades (`boton.disabled = true`).
* **Retos Extra Implementados:** Control de límite máximo de intentos (7), registro e impresión del historial de números introducidos usando `historialJugador.push()` y `join(', ')`, y botón de reinicio para resetear la partida y el DOM.

---

## Sección Obligatoria: Uso de IA

> *De acuerdo con la Regla de Oro de la asignatura, la Inteligencia Artificial se utiliza como un colaborador de desarrollo, asegurando la capacidad de defender y explicar cada línea de código escrita.*

1. **Tareas Delegadas:**
   * Apoyo en la estructuración visual CSS de la interfaz (estilos de la tarjeta `.card` e inputs).
   * Asistencia para la lógica de formateo del historial de números en pantalla mediante métodos de array.
2. **Prompts Reales Utilizados:**
   > *"Tengo un array con los números que introduce el usuario (`historialJugador`). ¿Cómo puedo convertir ese array en un string separado por comas para mostrarlo dentro de un párrafo en el DOM?"*
   
   > *"¿Cómo puedo hacer para que la validación de un input tipo number no descuente intentos si el usuario deja la caja vacía o mete un número menor a 1 o mayor a 100?"*
3. **Método de Verificación:**
   * Inspección y prueba de flujo desde las **DevTools de Chrome** simulando casos límite (entradas vacías, números fuera de rango 1–100, victoria en el intento 1 y derrota al llegar al intento 7).
   * Verificación manual de la manipulación de nodos con `textContent` y reseteo del estado del juego tras pulsar el botón "Reiniciar partida".

---

## Sección Obligatoria: Autopsia

### 1. Validación temprana sin penalización de intentos
* **Decisión:** Comprobar si la entrada es inválida (`valorInput.trim() === '' || isNaN(numUsuario) || numUsuario < 1 || numUsuario > 100`) al inicio del evento de clic y hacer un `return` inmediato.
* **Alternativa descartada:** Incrementar la variable `intentos++` nada más pulsar el botón y restar 1 intento posteriormente si la entrada era inválida.
* **Justificación:** Usar un *early return* evita ensuciar la lógica principal del juego y garantiza que las variables de estado (`intentos` y `historialJugador`) solo se modifiquen cuando el usuario haya introducido una jugada limpia y válida.

### 2. Uso estricto de `textContent` frente a `innerHTML` para el historial y mensajes
* **Decisión:** Renderizar los mensajes de respuesta y el historial utilizando `textContent` e interconectando el array de historial con `.join(', ')`.
* **Alternativa descartada:** Concatenar las jugadas pasadas generando etiquetas HTML dinámicas (`<li>` o `<span>`) e insertarlas con `innerHTML`.
* **Justificación:** Al inyectar contenido dinámico procesado directamente desde un `<input>`, el uso de `textContent` previene cualquier vulnerabilidad por inyección de script o XSS. Además, para un listado simple de números, la concatenación por texto resulta más directa y ligera para el renderizado del DOM.

---

## Ejecución Local

Para probar esta Misión 1 en local:
```bash
# 1. Clonar el repositorio
git clone [https://github.com/MarKadri05/ProgWebI-Opcionales.git](https://github.com/MarKadri05/ProgWebI-Opcionales.git)

# 2. Acceder a la carpeta del proyecto
cd ProgWebI-Opcionales

# 3. Abrir Mision1.html en el navegador o ejecutar con Live Server en VS Code