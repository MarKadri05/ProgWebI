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
  };

  const siguientePregunta = () => {
    setSeleccion(null);
    setIndice((prev) => prev + 1);
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

  const porcentajeProgreso = (indice / PREGUNTAS.length) * 100;
  const esCorrectaSeleccion = seleccion === preguntaActual.correcta;

  return (
    <div className="quiz-card">
      {/* Barra de progreso visual */}
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${porcentajeProgreso}%` }}
        ></div>
      </div>

      <div className="quiz-header">
        <span className="badge">Pregunta {indice + 1} de {PREGUNTAS.length}</span>
        <span className="puntos-tag">Puntos: {puntos}</span>
      </div>

      <h2 className="pregunta-texto">{preguntaActual.texto}</h2>

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

      {/* Bloque explicativo y botón para continuar */}
      {seleccion !== null && (
        <div className={`feedback-card ${esCorrectaSeleccion ? 'feedback-exito' : 'feedback-error'}`}>
          <div className="feedback-header">
            {esCorrectaSeleccion ? "🎉 ¡Correcto! ¡Bien hecho!" : "❌ Opción incorrecta"}
          </div>
          <p className="feedback-explicacion">{preguntaActual.explicacion}</p>
          <button className="btn-siguiente" onClick={siguientePregunta}>
            Siguiente pregunta ➔
          </button>
        </div>
      )}
    </div>
  );
}