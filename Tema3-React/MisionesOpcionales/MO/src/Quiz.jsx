import { useState } from 'react';
import { PREGUNTAS } from './Preguntas';
import { Resultado } from './Resultado';
import './Quiz.css';

export function Quiz() {
  const [indice, setIndice] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [seleccion, setSeleccion] = useState(null);

  const preguntaActual = PREGUNTAS[indice];
  const esFinDeJuego = indice >= PREGUNTAS.length;

  const manejarRespuesta = (indiceOpcion) => {
    if (seleccion !== null) return;

    setSeleccion(indiceOpcion);

    const esCorrecta = indiceOpcion === preguntaActual.correcta;
    if (esCorrecta) {
      setPuntos((prev) => prev + 1);
    }

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

  if (esFinDeJuego) {
    return (
      <Resultado
        puntos={puntos}
        total={PREGUNTAS.length}
        onReiniciar={reiniciarJuego}
      />
    );
  }

  return (
    <div className="quiz-container">
      <h2>Pregunta {indice + 1} de {PREGUNTAS.length}</h2>
      <p className="pregunta-texto">{preguntaActual.texto}</p>

      <div className="opciones-grid">
        {preguntaActual.opciones.map((opcion, i) => {
          let claseBoton = "btn-opcion";
          if (seleccion !== null) {
            if (i === preguntaActual.correcta) {
              claseBoton += " correcta";
            } else if (i === seleccion) {
              claseBoton += " incorrecta";
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