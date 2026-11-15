# Gwent Deck Builder · Misión 4 (Full Contact Forms)

Misión M4 · Programación Web I (Cliente) — Grado en Ingeniería del Software (U-tad 2026–2027).

Aplicación web interactiva desarrollada con **Vite + React 19 (JSX)** que implementa un creador de cartas personalizadas para el universo de *The Witcher*. Integra validación robusta y gestión asíncrona de estado remoto utilizando **React Hook Form**, **Zod** y **TanStack Query v5**.

---

## Instrucciones de Ejecución

1. Instalar las dependencias del proyecto (incluyendo las herramientas de formulario y validación):

   ```bash
   npm install
   ```

2. Ejecutar el servidor de desarrollo local de Vite:

   ```bash
   npm run dev
   ```

3. Abrir la aplicación en el navegador (por defecto en `http://localhost:5173/`).

4. Utilizar el menú superior de navegación para seleccionar "Misión 4: Deck Builder".

---

## Uso de IA

De acuerdo con la Regla de Oro de la asignatura, la Inteligencia Artificial se utiliza como un colaborador de desarrollo, asegurando la capacidad de defender y explicar cada línea de código escrita.

### Tareas delegadas

- Tutoría técnica y estructuración por fases para integrar las tres librerías principales de la misión (React Hook Form, Zod y TanStack Query).
- Diseño del orquestador global configurando `QueryClientProvider` en el punto de entrada de la aplicación.
- Asistencia en la definición del contrato de datos centralizado con Zod (`cardSchema.js`), abarcando tipos, rangos numéricos y refinamientos de mensajes de error personalizados.

### Prompts reales utilizados

- *"¿Cómo integro `zodResolver` dentro de la configuración inicial de `useForm` para que Zod actúe como única fuente de verdad sin tener que escribir reglas de validación nativas de HTML?"*
- *"¿Cuál es la forma correcta en TanStack Query v5 de utilizar `useMutation` para realizar una petición POST y acto seguido invalidar la caché de la lista principal para que la UI se actualice sin recargar la página?"*

### Método de verificación

- **DevTools (React Query):** Monitorización en vivo de la caché, verificando los estados `fresh` y `stale`, y comprobando la correcta invalidación (`invalidateQueries`) tras el envío exitoso del formulario.
- **DevTools (Network & Console):** Inspección de la carga útil (*payload*) de la petición POST para garantizar que los datos numéricos (como la fuerza de la carta) se envíen con el tipo de dato correcto gracias a `z.coerce.number`.
- **Auditoría de accesibilidad:** Verificación visual e interactiva de la aparición de mensajes de error dinámicos al dejar campos vacíos o violar las reglas del esquema Zod, comprobando el bloqueo preventivo del botón de envío (`isPending`).

---

## Autopsia (Decisiones Técnicas)

### 1. Formulario no controlado (React Hook Form) frente a controlado (`useState`)

- **Decisión:** Utilizar componentes no controlados mediante la función `register` y el manejador `handleSubmit` proporcionados por React Hook Form.
- **Alternativa descartada:** Vincular cada input a un estado local (`useState`) y actualizar el estado en cada pulsación de tecla (`onChange`).
- **Justificación:** Los formularios controlados provocan un ciclo de renderizado completo del componente por cada tecla pulsada. Al delegar el registro en React Hook Form, las referencias mutables de los nodos DOM gestionan los valores internamente, maximizando el rendimiento (cero re-renderizados innecesarios) y manteniendo el código de la vista mucho más limpio.

### 2. Zod como única fuente de verdad frente a validación nativa HTML5

- **Decisión:** Extraer toda la lógica de validación a un archivo independiente (`cardSchema.js`) utilizando Zod y conectarlo mediante `zodResolver`.
- **Alternativa descartada:** Confiar en los atributos de validación nativos del navegador (`required`, `min`, `max`, `type="url"`) o en las reglas propias de React Hook Form embebidas en el `register`.
- **Justificación:** La validación nativa es limitada y su comportamiento varía entre navegadores. Definir un esquema con Zod permite separar la lógica de negocio de la UI, establecer validaciones complejas cruzadas, forzar la coerción de tipos de forma segura e implementar el BONUS de la misión validando también la integridad de la respuesta del servidor (`safeParse`).

### 3. Mutaciones declarativas (TanStack Query) frente a `fetch` tradicional en el `onSubmit`

- **Decisión:** Implementar el envío de datos mediante el hook `useMutation` de TanStack Query, vinculando la recarga de datos a la función `onSuccess`.
- **Alternativa descartada:** Ejecutar un bloque `try...catch` manual con `fetch` (POST) dentro de la función de envío, gestionando a mano los estados `isPending` e `isError` con `useState`, y forzando una recarga de los datos invocando manualmente a la función de listado.
- **Justificación:** TanStack Query abstrae toda la gestión del ciclo de vida de la petición asíncrona. Derivar variables como `isPending` directamente de la mutación evita declarar estados redundantes. Además, la invalidación de queries (`queryClient.invalidateQueries`) garantiza que la fuente de datos remota es la que sincroniza la interfaz automáticamente, implementando el patrón *Stale-While-Revalidate* de manera impecable.