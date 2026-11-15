# Magic Deck Builder · Misión 4 (Full Contact Forms)

Misión M4 · Programación Web I (Cliente) — Grado en Ingeniería del Software (U-tad 2026–2027).

Aplicación web interactiva desarrollada con **Vite + React 19 (JSX)** que implementa un creador de cartas personalizadas para el universo de *Magic: The Gathering*. Integra validación declarativa en cliente y arquitectura preparada para la gestión asíncrona de estado remoto utilizando **React Hook Form**, **Zod** y **TanStack Query v5**.

---

## Instrucciones de Ejecución

1. Instalar las dependencias del proyecto (incluyendo las librerías de formularios, esquemas y caché):

   ```bash
   npm install
   ```

2. Ejecutar el servidor de desarrollo local de Vite:

   ```bash
   npm run dev
   ```

3. Abrir la aplicación en el navegador (por defecto en `http://localhost:5173/`).

4. Utilizar la barra superior de navegación para seleccionar **Misión 4: Deck Builder**.

---

## Uso de IA

> *De acuerdo con la Regla de Oro de la asignatura, la Inteligencia Artificial se utiliza como un colaborador de desarrollo, asegurando la capacidad de defender y explicar cada línea de código escrita.*

### Tareas delegadas

- Estructuración por fases del proyecto para integrar React Hook Form, Zod y TanStack Query v5 dentro de una arquitectura modular.
- Configuración del proveedor global `QueryClientProvider` en el punto de entrada (`src/main.jsx`) y diseño del selector condicional de misiones en `src/App.jsx`.
- Asistencia en la definición del esquema de validación con Zod (`cardSchema.js`), incluyendo coerción numérica y reglas cruzadas entre campos mediante `.refine()`.
- Ajustes de maquetación CSS (`box-sizing: border-box`, simetría de controles y contraste sobre imagen de fondo) y atributos de accesibilidad ARIA.

### Prompts reales utilizados

> *"¿Cómo se integra `zodResolver` dentro de la configuración inicial de `useForm` para que Zod actúe como única fuente de verdad sin depender de las reglas nativas de HTML5?"*

> *"¿Cómo se define una validación cruzada en Zod con `.refine()` para impedir que cartas que no sean de tipo `Creature` tengan fuerza mayor que 0 y mostrar el error debajo del campo correspondiente?"*

### Método de verificación

- **Pruebas de validación en navegador:** Envío del formulario vacío y con valores fuera de rango (coste de maná mayor que 16, fuerza mayor que 20 o textos cortos) para comprobar que `handleSubmit` bloquea el envío y despliega los mensajes personalizados de Zod.
- **Verificación de reglas cruzadas:** Cambio dinámico del selector *Tipo de Carta* a `Instant` o `Sorcery` manteniendo una fuerza superior a `0`, verificando que el error se activa al instante gracias a `deps: ['power']` y desaparece al volver a seleccionar `Creature`.
- **Auditoría de accesibilidad (DevTools):** Inspección del árbol DOM para confirmar que `noValidate` desactiva las burbujas nativas del navegador y que los mensajes de error se vinculan mediante `aria-invalid`, `aria-describedby` y `role="alert"`.

---

## Autopsia (Decisiones Técnicas)

### 1. Formulario no controlado (React Hook Form) frente a controlado (`useState`)

- **Decisión:** Implementar inputs no controlados mediante `register` y `handleSubmit` en `CreateCardForm.jsx`.
- **Alternativa descartada:** Vincular cada campo a un estado local independiente con `useState` y actualizarlo en cada evento `onChange`.
- **Justificación:** Los formularios controlados provocan un ciclo de renderizado completo del componente por cada pulsación de tecla. Al delegar el registro en React Hook Form, las referencias de los nodos DOM gestionan los valores internamente, evitando re-renderizados innecesarios y simplificando el código del componente.

### 2. Zod como única fuente de verdad con `.refine()` frente a validación nativa HTML5

- **Decisión:** Centralizar todas las reglas de validación en `src/MisionPrincipal4/schemas/cardSchema.js` utilizando Zod, conectarlo mediante `zodResolver` y desactivar la validación nativa del navegador con `noValidate`.
- **Alternativa descartada:** Utilizar atributos HTML5 (`required`, `min`, `max`) o condicionales `if/else` manuales dentro de la función de envío.
- **Justificación:** La validación nativa varía visualmente según el navegador y no soporta reglas complejas entre múltiples campos. El esquema Zod garantiza una única fuente de verdad reutilizable, realiza coerción segura de tipos (`z.coerce.number()`) sobre las cadenas recibidas de los inputs y permite validar dependencias entre campos (como exigir `type === 'Creature'` cuando `power > 0`).

### 3. Accesibilidad semántica (`role="alert"` y `aria-describedby`) frente a mensajes visuales simples

- **Decisión:** Asociar cada campo inválido con su mensaje de error mediante `aria-invalid`, `aria-describedby` y contenedores con `role="alert"`, manteniendo el botón de envío siempre pulsable cuando no hay una petición en curso.
- **Alternativa descartada:** Mostrar textos de error en rojo sin atributos ARIA o deshabilitar el botón de envío mientras existan errores.
- **Justificación:** Un botón permanentemente deshabilitado impide recibir el foco mediante teclado y no informa al usuario de qué campo falla. Los atributos ARIA permiten que los lectores de pantalla anuncien automáticamente los errores de validación al intentar enviar el formulario.

### 4. Selector de misiones por estado (`useState`) frente a múltiples puntos de entrada

- **Decisión:** Mantener un único punto de entrada (`src/main.jsx`) y alternar entre prácticas mediante renderizado condicional en `src/App.jsx`.
- **Alternativa descartada:** Crear múltiples archivos `main.jsx` independientes o configurar un enrutador externo para dos vistas.
- **Justificación:** Vite resuelve la aplicación a partir de un único `index.html` raíz. El renderizado condicional mediante estado local mantiene un único árbol de dependencias y desmonta del DOM la vista inactiva sin sobrecargar el proyecto.

---

## Licencia

Este proyecto se distribuye bajo la Licencia **MIT**.

---

# Bitácora de Decisiones Técnicas · Misión 4 (Magic Deck Builder)

## Fase 1: El Contrato de Datos (Zod y Arquitectura Global)

- **Proveedor global (`src/main.jsx`):** Se envuelve `<App />` en `<QueryClientProvider client={queryClient}>` instanciando `new QueryClient()` fuera del componente raíz para evitar recrear la caché en cada renderizado.
- **Única fuente de verdad (`cardSchema.js`):** Se define el esquema de validación antes de construir la interfaz.
  - `z.coerce.number()`: Necesario porque los elementos `<input type="number">` del DOM siempre devuelven valores de tipo `string`.
  - `.refine()` con `path: ['power']`: Valida la regla de negocio cruzada (solo `Creature` puede tener `power > 0`) y dirige el mensaje de error exactamente bajo el campo de fuerza.

## Fase 2: La Interfaz de Entrada (React Hook Form y UX)

- **Componentes no controlados (`register`):** Evitan re-renderizados en cada pulsación de tecla al leer los valores directamente desde las referencias del DOM al ejecutar `handleSubmit`.
- **Revalidación dependiente (`deps: ['power']`):** Configurado en el selector `type` para que, si el usuario cambia el tipo de carta después de haber introducido fuerza, Zod reevalúe la regla cruzada al instante.
- **Accesibilidad (`noValidate` + ARIA):** `noValidate` suprime las alertas nativas del navegador para ceder el control total a Zod; `aria-invalid`, `aria-describedby` y `role="alert"` garantizan compatibilidad con lectores de pantalla.
- **Consistencia visual (`box-sizing: border-box`):** Unifica el cálculo de ancho y altura (`42px`) entre elementos `<input>` y `<select>` para evitar desbordamientos laterales y cortes verticales de texto.