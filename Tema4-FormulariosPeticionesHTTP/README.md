# Magic: The Gathering · Deck Builder (Misión 4)

### Misión M4 · Form & Query — Programación Web I (Cliente) · U-tad (2026–2027)

Aplicación web interactiva desarrollada con **Vite + React 19 (JSX)** para la creación, validación estricta y consulta asíncrona de un mazo personalizado de cartas de *Magic: The Gathering*. El proyecto integra **React Hook Form** para la gestión eficiente de formularios no controlados, **Zod** como única fuente de verdad para el tipado y reglas cruzadas de negocio, y **TanStack Query v5** para la sincronización de caché y mutaciones contra un backend REST en **MockAPI.io**.

---

## Funcionalidades Implementadas

- **Formulario no controlado (`CreateCardForm`):** Registro de cartas con validación reactiva mediante `zodResolver`, atributos de accesibilidad (`htmlFor`, `aria-invalid`, `aria-describedby`, `role="alert"`) y desactivación de globos nativos del navegador (`noValidate`).
- **Adaptación dinámica por tipo de carta:** Renderizado condicional de estadísticas numéricas según el tipo seleccionado (`Fuerza` y `Vida` para *Creature*, `Lealtad Inicial` para *Planeswalker*, y ocultación automática en hechizos, encantamientos y artefactos), adaptando dinámicamente los textos de ayuda (*placeholders*) en la descripción.
- **Sincronización remota con TanStack Query:** Consulta declarativa mediante `useQuery` y envío con `useMutation`, invalidando automáticamente la clave de caché `['mtg-cards']` tras cada alta para refrescar el grimorio sin recargar la página.
- **Validación defensiva de respuestas (`safeParse` · BONUS):** Verificación estructural de los datos recibidos desde la API mediante `apiCardsListSchema.safeParse()`, incluyendo un botón de prueba en la interfaz para simular un registro corrupto procedente del servidor e interceptar el fallo con precisión.

---

## Ejecución y Prueba Local

1. Instalar las dependencias del proyecto (incluyendo las librerías de formularios, esquemas y caché):

   ```bash
   npm install
   ```

2. Configurar las variables de entorno creando un archivo `.env` en la raíz del proyecto basado en el endpoint REST:

   ```env
   VITE_API_URL=https://<TU_PROYECTO_ID>.mockapi.io/api/v1/cards
   ```

3. Ejecutar el servidor de desarrollo de Vite:

   ```bash
   npm run dev
   ```

4. Abrir en el navegador la URL local indicada por Vite (por ejemplo: `http://localhost:5173/`).

---

## Uso de IA

*De acuerdo con la Regla de Oro de la asignatura, la Inteligencia Artificial se utiliza como un colaborador de desarrollo, asegurando la capacidad de defender y explicar cada línea de código escrita.*

### Tareas delegadas

- Estructuración por fases del proyecto para integrar React Hook Form, Zod y TanStack Query v5 dentro de una arquitectura modular.
- Configuración del proveedor global `QueryClientProvider` en el punto de entrada (`src/main.jsx`) y diseño del selector condicional de misiones en `src/App.jsx`.
- Asistencia en la maquetación visual en CSS (estética oscura con bordes dorados, distribución en rejilla `CSS Grid`, `box-sizing: border-box` y simetría de alturas en los controles del formulario).
- Asistencia en la configuración de reglas cruzadas de Zod mediante `.superRefine()` para validar dependencias entre el tipo de carta y sus estadísticas (`power`, `health` y `loyalty`), además de la normalización del campo `description`.

### Prompts reales utilizados

> *"¿Cómo se pueden ocultar dinámicamente los campos de fuerza (ataque) y vida en el formulario cuando el tipo de carta seleccionado no sea una criatura, manteniendo la validación sincronizada en React Hook Form y Zod?"*

> *"¿Cómo se implementa la validación defensiva con `safeParse` de Zod sobre la respuesta GET de MockAPI dentro de TanStack Query para detectar datos corruptos sin que la aplicación se rompa?"*

### Método de verificación

- **Validación de formulario y reglas cruzadas:** Prueba de envíos con campos vacíos, textos por debajo del mínimo de caracteres y valores fuera de rango, verificando que `handleSubmit` bloquea la petición HTTP y muestra los mensajes de error asociados a cada campo.
- **Inspección de red y caché:** Revisión en las **DevTools de Chrome** (pestaña *Network*) comprobando el envío `POST` al crear cartas de distintos tipos (*Creature*, *Sorcery*, *Artifact*, *Planeswalker*) y la revalidación automática del `GET` mediante `invalidateQueries`.
- **Simulación de contrato roto (`safeParse`):** Activación del botón *"Simular Dato Corrupto"* para confirmar que Zod captura la anomalía en el campo exacto (`"2.power" -> La fuerza máxima permitida es 20`) y muestra el estado de alerta sin bloquear la interfaz.
- **Accesibilidad:** Navegación secuencial completa a través de todos los controles del formulario utilizando exclusivamente la tecla `Tab`, e inspección del árbol DOM para confirmar que `noValidate` desactiva las burbujas nativas y que los errores se vinculan mediante `aria-invalid`, `aria-describedby` y `role="alert"`.

---

## Autopsia (Decisiones Técnicas)

### 1. Formulario no controlado con React Hook Form (`zodResolver`) frente a estado controlado con `useState`

- **Qué:** Se gestiona el formulario mediante `useForm` registrando los campos por referencia (`register`) y delegando las reglas de negocio al esquema externo `cardSchema` a través de `zodResolver`.
- **Por qué:** Evita provocar un re-renderizado completo del componente en cada pulsación de tecla y centraliza todas las validaciones y coerciones de tipo (`z.coerce.number()`) en una única fuente de verdad reutilizable.
- **Alternativa descartada:** Controlar cada input individualmente mediante múltiples estados `useState` y validar manualmente con condicionales dentro del evento `onSubmit`.

### 2. Observación selectiva con `watch()` y saneamiento de valores al desmontar inputs condicionales

- **Qué:** Se suscribe la vista únicamente al campo `type` mediante `watch('type')` para mostrar u ocultar los campos de combate (`power`/`health`) o `loyalty`, acompañándolo de un manejador `handleCardTypeChange` que reinicia a `0` las estadísticas ocultas mediante `setValue`.
- **Por qué:** React Hook Form conserva en memoria los valores registrados aunque sus elementos `<input>` dejen de renderizarse en el DOM; restablecerlos a `0` al cambiar de tipo evita que queden valores residuales que disparen errores ocultos en la validación cruzada `.superRefine()`.
- **Alternativa descartada:** Duplicar el tipo de carta en un estado local auxiliar (`useState`) que podría desincronizarse al ejecutar `reset()` tras guardar una carta.

### 3. Gestión de estado asíncrono e invalidación de caché con TanStack Query v5

- **Qué:** Se encapsula la lectura del grimorio en `useQuery` con la clave `['mtg-cards', { simulateCorrupt }]` y el alta de nuevas cartas en `useMutation`, ejecutando `queryClient.invalidateQueries({ queryKey: ['mtg-cards'] })` en el callback `onSuccess`.
- **Por qué:** Desacopla el estado del servidor del estado local de la interfaz, gestiona de forma declarativa los indicadores de carga/error (`isPending`, `isLoading`, `isError`) y garantiza que el listado refleje siempre la información real persistida en MockAPI tras cada inserción.
- **Alternativa descartada:** Gestionar manualmente la petición `fetch` dentro de un `useEffect` acompañado de estados booleanos propios y añadir la nueva carta localmente con `.push()` sin confirmar su persistencia remota.

### 4. Validación defensiva del contrato de API mediante `safeParse()` (reto bonus)

- **Qué:** En `cardService.js` se valida el arreglo devuelto por `response.json()` contra `apiCardsListSchema.safeParse()` antes de entregar los datos a `useQuery`, utilizando la propiedad `description` sincronizada con MockAPI.
- **Por qué:** A diferencia de `.parse()`, `safeParse()` no lanza una excepción no controlada, sino que devuelve un objeto discriminado `{ success, data, error }` que permite extraer la ruta exacta del campo corrupto (`firstIssue.path`) y presentar un mensaje de diagnóstico claro en la interfaz.
- **Alternativa descartada:** Confiar ciegamente en la estructura del JSON recibido desde el servidor e inyectarlo directamente en el renderizado de tarjetas.