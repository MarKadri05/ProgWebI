export const PREGUNTAS = [
  {
    id: "q1",
    texto: "¿Qué hook añade memoria a un componente?",
    opciones: ["useEffect", "useState", "useRef", "useContext"],
    correcta: 1,
    explicacion: "useState es el hook que permite declarar variables de estado en componentes funcionales."
  },
  {
    id: "q2",
    texto: "¿Qué herramienta usamos para empaquetar y ejecutar el proyecto en React?",
    opciones: ["Webpack", "Vite", "Parcel", "Babel"],
    correcta: 1,
    explicacion: "Vite es la herramienta de construcción y empaquetado rápida recomendada en el curso."
  },
  {
    id: "q3",
    texto: "¿Cómo se transforman elementos en JSX sin mutar el array original?",
    opciones: [".forEach()", ".push()", ".map()", ".splice()"],
    correcta: 2,
    explicacion: ".map() es un método declarativo e inmutable que devuelve un nuevo array transformado."
  },
  {
    id: "q4",
    texto: "¿Cuál es la regla principal sobre el array de dependencias en useEffect?",
    opciones: [
      "Debe incluir todas las variables reactivas usadas dentro del efecto",
      "Siempre se debe dejar vacío",
      "Solo se usa para variables no reactivas",
      "Es opcional para que no vuelva a ejecutarse"
    ],
    correcta: 0,
    explicacion: "Si usas variables reactivas (props/estado) dentro de useEffect, deben declararse en las dependencias."
  },
  {
    id: "q5",
    texto: "¿Por qué no se debe modificar el estado directamente sin usar la función setter?",
    opciones: [
      "Porque React no detectará el cambio para re-renderizar la UI",
      "Porque genera un error sintáctico en JavaScript",
      "Porque elimina la variable de la memoria RAM",
      "Porque borra automáticamente el Virtual DOM"
    ],
    correcta: 0,
    explicacion: "Mutar el estado directamente rompe la reactividad; sólo el setter notifica a React que debe volver a pintar el componente."
  }
];