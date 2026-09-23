// Checkpoint 1: Selección de elementos del DOM
const inputNumero = document.querySelector('#numero-input');
const botonComprobar = document.querySelector('#comprobar-btn');
const botonReiniciar = document.querySelector('#reiniciar-btn');
const mensajeFeedback = document.querySelector('#mensaje-feedback');
const marcadorIntentos = document.querySelector('#marcador');
const historialTexto = document.querySelector('#historial-intentos');

// Inicialización del número secreto
let secreto = Math.floor(Math.random() * 100) + 1;

// Checkpoint 4: Contador de intentos
let intentos = 0;
let historialJugador = [];

// Listener para el botón de probar
botonComprobar.addEventListener('click', () => {
    // Checkpoint 2: Lectura y conversión del valor del input
    const valorInput = inputNumero.value;
    const numUsuario = Number(valorInput);
    const maxIntentos = 7;

    // Checkpoint 3: Validación de valor vacío o fuera de rango (1-100) sin gastar intento
    if (valorInput.trim() === '' || isNaN(numUsuario) || numUsuario < 1 || numUsuario > 100) {
        mensajeFeedback.textContent = 'Introduce un número válido entre 1 y 100.';
        return; // Salimos de la función sin incrementar intentos
    }

    // Si la entrada es válida, sumamos intento y actualizamos marcador
    intentos++;
    marcadorIntentos.textContent = `Intentos realizados: ${intentos}`;

    // Guardar el numero introducido en el array y actualizar en pantalla
    historialJugador.push(numUsuario);
    historialTexto.textContent = `Historial de numeros introducidos: ${historialJugador.join(', ')}.`;

    // Checkpoint 3 y 5: Comprobación de la respuesta
    if (numUsuario === secreto) {
        mensajeFeedback.textContent = `Correcto! El Oráculo ha revelado el ${secreto} en ${intentos} intento(s).`;
        // Checkpoint 5: Fin de partida
        botonComprobar.disabled = true;
        inputNumero.disabled = true;
    } else if (intentos == maxIntentos){
        mensajeFeedback.textContent = `Has agotado tus intentos! el numero secreto era ${secreto}.`
    } else if (numUsuario < secreto) {
        mensajeFeedback.textContent = `El número secreto es MAYOR que ${numUsuario}.`;
    } else if(numUsuario > secreto) {
        mensajeFeedback.textContent = `El número secreto es MENOR que ${numUsuario}.`;
    }

    // Limpiar input tras cada intento
    inputNumero.value = '';
    inputNumero.focus();

    // Eliminar botones si se ha ganado o perdido
    if(numUsuario == secreto || maxIntentos == intentos){
        botonComprobar.disabled = true;
        inputNumero.disabled = true;
    }
});

// Listener para el botón de empezar una nueva partida
botonReiniciar.addEventListener('click', () => {
    intentos = 0;
    historialJugador = [];
    secreto = Math.floor(Math.random() * 100) + 1;

    botonComprobar.disabled = false;
    inputNumero.disabled = false;

    // Limpieza de mensajes e interfaz en pantalla
    mensajeFeedback.textContent = '';
    marcadorIntentos.textContent = 'Intentos realizados: 0';
    historialTexto.textContent = 'Historial de numeros introducidos: ';

    // Dejar el input listo para escribir de nuevo
    inputNumero.value = '';
    inputNumero.focus();
});