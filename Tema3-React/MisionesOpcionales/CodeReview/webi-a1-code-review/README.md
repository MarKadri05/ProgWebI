# A1 · Code review al replicante 🤖

🇬🇧 [English version](README.en.md)

**Web Development I, the Client · U-tad · Unidad 3 (React)** · 50 min · individual o en parejas · prepara la misión M3

Una IA ha propuesto un *pull request* con `Leaderboard.jsx`, el ranking de un juego. Compila, se
renderiza y a primera vista funciona. Pero quien lo apruebe tal cual va a sufrir en la defensa:
contiene **3 bugs sutiles y 2 malas prácticas**.

Tu trabajo es el que harás toda tu carrera: revisar código que no escribiste tú (lo haya escrito una IA
o un compañero) y decidir si pasa a producción. Aquí lo haces de verdad, con una *review* en GitHub.

## Qué tienes que hacer

Abre el **pull request de tu grupo** en la pestaña [Pull requests](https://github.com/rpmaya/webi-a1-code-review/pulls) y revísalo. Por cada
defecto que encuentres, un comentario en la línea donde está con:

1. **Por qué es un defecto**, con el concepto de la U3 que lo explica (inmutabilidad, estado derivado,
   dependencias de efectos, keys…). «Esto está mal» no vale.
2. **El arreglo**, como sugerencia de código (botón ± *Add a suggestion* del comentario).
3. **Cómo lo demostrarías en el navegador**: qué interacción o qué mensaje de la consola delata el
   problema. Pista: un `console.log` o un elemento temporal en el JSX.

### Criterios de aceptación

- [ ] Has encontrado los 3 bugs y las 2 malas prácticas.
- [ ] Cada comentario cita el concepto de la unidad que lo justifica.
- [ ] Tus arreglos no introducen estado nuevo donde bastaba derivar.
- [ ] Sabes reproducir al menos 2 de los defectos en vivo (te lo pediremos en la puesta en común).

## Cómo arrancar el código

Los defectos se ven usando el componente, no solo leyéndolo.

- **En el navegador, sin instalar nada:**
  [abrir la rama `revision-es` en StackBlitz](https://stackblitz.com/github/rpmaya/webi-a1-code-review/tree/revision-es).
- **En tu ordenador:**

  ```bash
  git clone https://github.com/rpmaya/webi-a1-code-review.git
  cd webi-a1-code-review
  git switch revision-es
  npm install
  npm run dev
  ```

Puedes tocar el código todo lo que quieras para observarlo: tus cambios se quedan en tu copia.

## Cómo hacer la review en GitHub

1. En el PR, pestaña **Files changed**.
2. Pasa el ratón por la línea del defecto y pulsa el **+** azul (arrastrando puedes marcar varias líneas).
3. Escribe el comentario y pulsa **Start a review** — ⚠️ **no** *Add single comment*, que lo publica en
   el acto y lo ve toda la clase.
4. Los siguientes comentarios se añaden con **Add review comment**. Mientras no envíes la review,
   **solo los ves tú**.
5. Cuando el profesor lo diga (no antes): **Finish your review** → un resumen de tu revisión → opción
   **Comment** → **Submit review**.

Si trabajas en pareja, envía la review una sola persona y menciona a la otra (`@usuario`) en el resumen.

## Normas

- **No abras pull requests con los arreglos** ni issues: el repositorio es público y le estropearías la
  actividad al resto.
- **Revisa sin IA.** En la puesta en común le pediremos la review a una IA en directo y la compararemos
  con las vuestras: ¿qué cazó cada uno?, ¿qué se le escapó a la IA?, ¿qué os saltasteis vosotros?
- La review de una IA es un punto de partida, no un veredicto. En la Arena podéis usar IA para todo,
  pero defendéis línea a línea lo que entregáis.

---

*Actividad de Discernment basada en el AI Fluency Framework de Rick Dakan, Joseph Feller y Anthropic,
CC BY-NC-SA 4.0.*
