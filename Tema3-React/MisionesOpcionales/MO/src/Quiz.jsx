import { useState } from 'react';
import { PREGUNTAS } from '../misiones/quiz/preguntas';
import { Resultado } from './Resultado';

export function Quiz() {
  const [indice, setIndice] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [seleccion, setSeleccion] = useState(null); // Guarda el índice pulsado

  const preguntaActual = PREGUNTAS[indice];
  const esFinDeJuego = indice >= PREGUNTAS.length;

  const manejarRespuesta = (indiceOpcion) => {
    // Evita múltiples clics durante el feedback
    if (seleccion !== null) return;

    setSeleccion(indiceOpcion);

    const esCorrecta = indiceOpcion === preguntaActual.correcta;
    if (esCorrecta) {
      setPuntos((prev) => prev + 1);
    }

    // Espera 1 segundo para mostrar el feedback visual antes de pasar de pregunta
    setTimeout(() => {
      setSeleccion(null);
      setIndice((prev) => prev + 1);
    }, 1000);
  };

  const reiniciarJuego = () => {
    setIndice(0);
    setPuntos(0);
    setSeleccion(null);
  };

  // Renderizado condicional: Pantalla Final
  if (esFinDeJuego) {
    return (
      <Resultado
        puntos={puntos}
        total={PREGUNTAS.length}
        onReiniciar={reiniciarJuego}
      />
    );
  }

  // Renderizado de la pregunta actual
  return (
    <div className="quiz-container">
      <h2>Pregunta {indice + 1} de {PREGUNTAS.length}</h2>
      <p className="pregunta-texto">{preguntaActual.texto}</p>

      <div className="opciones-grid">
        {preguntaActual.opciones.map((opcion, i) => {
          // Determina la clase CSS durante la selección
          let claseBoton = "btn-opcion";
          if (seleccion !== null) {
            if (i === preguntaActual.correcta) {
              claseBoton += " correcta"; // Verde
            } else if (i === seleccion) {
              claseBoton += " incorrecta"; // Rojo
            }
          }

          return (
            <button
              key={`${preguntaActual.id}-${i}`}
              className={claseBoton}
              onClick={() => manejarRespuesta(i)}
              disabled={seleccion !== null}
            >
              {opcion}
            </button>
          );
        })}
      </div>
    </div>
  );
}