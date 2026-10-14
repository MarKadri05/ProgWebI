export function Resultado({ puntos, total, onReiniciar }) {
  // Estado derivado (sin useState)
  const porcentaje = Math.round((puntos / total) * 100);

  let mensaje = "¡Sigue practicando!";
  if (porcentaje >= 80) {
    mensaje = "¡Excelente dominio de React!";
  } else if (porcentaje >= 50) {
    mensaje = "¡Buen trabajo, casi lo tienes!";
  }

  return (
    <div className="resultado-card">
      <h2>Pantalla Final</h2>
      <p>Has obtenido <strong>{puntos}</strong> de <strong>{total}</strong> aciertos ({porcentaje}%).</p>
      <p className="mensaje-feedback">{mensaje}</p>

      <button className="btn-siguiente" style={{ marginTop: '1.5rem' }} onClick={onReiniciar}>
        Jugar otra vez
      </button>
    </div>
  );
}