// Componente generado por IA para el ranking del juego. Revísalo antes de
// aprobarlo: contiene 3 bugs sutiles y 2 malas prácticas.
import { useEffect, useState } from "react";

function Leaderboard({ jugadores }) {
  // Si Leaderboard solo muestra y gestiona filtros/ordenación, es preferible derivar la lista procesada o actualizar las props correctamente.
  const [lista, setLista] = useState(jugadores);
  // Eliminar el estado 'total' y el 'useEffect', calculándolo directamente:
  const [total, setTotal] = useState(jugadores.length);

  // El useEffect se ejecuta en cada renderizado, lo cual es innecesario y puede causar problemas de rendimiento. Es un bucle infinito de renderizados.
  // Se debería pasar un array de dependencias vacío para que solo se ejecute una vez al montar el componente.
  // Segun el temario: Limpieza en useEffect con temporizadores y suscripciones. Y además: No llames a setEstado durante el render: bucle infinito.
  useEffect(() => {
    setTotal(lista.length);
  });

  // La función ordenar modifica el estado directamente, lo cual es una mala práctica.
  // Según el temario: Nunca mutes el estado ni las props: {...obj}, [...arr], map, filter.
  function ordenar() {
    setLista(lista.sort((a, b) => b.puntos - a.puntos));
  }

  // La función eliminar también modifica el estado directamente, lo cual es una mala práctica.
  // Según el temario: Nunca mutes el estado ni las props: {...obj}, [...arr], map, filter.
  function eliminar(nombre) {
    setLista(lista.filter((j) => j.nombre !== nombre));
  }

  return (
    <section>
      <h2>Ranking ({total} jugadores)</h2>
      <button onClick={ordenar}>Ordenar por puntos</button>
      <ol>
        {lista.map((j, i) => (
          // Usar el índice como key es una mala práctica, ya que puede causar problemas de rendimiento y errores en la UI.
          // Según el temario: key estable en las listas (índice solo en listas estáticas).
          <li key={i}>  
            {j.nombre} — {j.puntos} pts
            <button onClick={() => eliminar(j.nombre)}>✕</button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function App() {
  const jugadores = [
    { nombre: "KIRA", puntos: 7400 },
    { nombre: "NOVA", puntos: 9800 },
    { nombre: "BYTE", puntos: 5200 },
    { nombre: "PIXEL", puntos: 8650 },
  ];
  return <Leaderboard jugadores={jugadores} />;
}