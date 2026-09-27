// ==========================================
// 1. ESTADO DEL JUEGO
// ==========================================

// Variables de configuración inicial del tablero
let filas = 4;
let columnas = 4;

// Array que almacenará la secuencia de números/parejas mezcladas. Guarda valores en memoria como [0, 0, 1, 1...] de forma aleatoria.
// POR QUÉ: Mantiene la lógica desacoplada del DOM.
// ALTERNATIVA DESCARTADA: Leer el número directamente del HTML (por seguridad y limpieza).
let tableroCartas = [];

// Control de flujo del juego
let primeraCarta = null;
let segundaCarta = null;
let bloqueoTablero = false; // Bloquea clics mientras se comprueba una pareja con setTimeout

// ==========================================
// 2. SELECCIÓN DE ELEMENTOS DEL DOM
// ==========================================

// Seleccionamos los elementos usando los IDs reales de Mision1.html
const formularioJuego = document.querySelector('#game-form');
const inputFilas = document.querySelector('#rows-input');
const inputColumnas = document.querySelector('#cols-input');
const contenedorTablero = document.querySelector('#board');
const mensajeEstado = document.querySelector('#status-message');

// Marcadores de estado
const contadorMovimientos = document.querySelector('#moves-counter');
const contadorParejas = document.querySelector('#pairs-counter');

// ==========================================
// 3. FUNCIONES DE LÓGICA Y VALIDACIÓN
// ==========================================

/**
 * Valida si las dimensiones del tablero son correctas para formar parejas.
 * @param {number} numFilas
 * @param {number} numColumnas
 * @returns {number|null} Retorna el número de parejas necesarias o null si falla.
 */
function validarDimensionesTablero(numFilas, numColumnas) {
  try {
    const totalCartas = numFilas * numColumnas;

    if (totalCartas % 2 !== 0) {
      // Lanzar error explícito si no se pueden formar parejas completas
      throw new Error(`Un tablero de ${numFilas}x${numColumnas} (${totalCartas} cartas) es impar. El total debe ser par.`);
    }

    // Limpiar mensajes de error y clases de fallo previas en el DOM
    if (mensajeEstado) {
      mensajeEstado.textContent = '¡Tablero válido! Generando partida...';
      mensajeEstado.classList.remove('error');
    }

    // Actualizar la variable CSS --cols en el tablero para ajustar la rejilla dinámicamente
    if (contenedorTablero) {
      contenedorTablero.style.setProperty('--cols', numColumnas);
    }

    // Retornar el número de parejas únicas requeridas
    return totalCartas / 2;

  } catch (error) {
    // CAPTURA DEL ERROR: Mostramos el aviso con textContent para prevenir vulnerabilidades XSS
    if (mensajeEstado) {
      mensajeEstado.textContent = `⚠️ Error: ${error.message}`;
      mensajeEstado.classList.add('error');
    }
    // Devolver null para detener la preparación del juego
    return null;
  }
}

/**
 * Genera el array de números ordenados en parejas e invoca el barajado
 * @param {number} numParejas
 */
function generarParejas(numParejas) {
  // 1. Crear un array base con números únicos [0, 1, 2, ..., numParejas - 1]
  const listaUnica = Array.from({ length: numParejas }, (_, indice) => indice);

  // 2. Duplica los elementos con .map() para formar el par [ [0,0], [1,1]... ] y se aplana con .flat() a [0,0,1,1,...]
  // QUÉ HACE: Transforma cada valor en un sub-array de dos elementos iguales y los une.
  // POR QUÉ: Cumple la norma de clase de no usar bucles 'for' o '.forEach()'.
  const parejas = listaUnica.map(numero => [numero, numero]).flat();

  // 3. Mezclar array usando .toSorted()
  tableroCartas = parejas.toSorted(() => Math.random() - 0.5);

  console.log('Cartas listas en memoria:', tableroCartas);
}

/**
 * Crea e inyecta dinámicamente las cartas en el DOM respetando las normas de seguridad.
 */
function renderizarTablero() {
  if (!contenedorTablero) return;

  // 1. Limpiamos el contenido anterior del tablero de forma segura
  contenedorTablero.textContent = '';

  // 2. Usamos un DocumentFragment para evitar repintados (reflows) innecesarios en el DOM
  const fragmento = document.createDocumentFragment();

  // 3. Transformamos cada número del array en un nodo HTML usando .map()
  // QUÉ HACE: Mapea cada valor a una carta 3D completa.
  // POR QUÉ: No usamos bucles 'for' ni '.forEach()', cumpliendo la regla de clase.
  tableroCartas.map((numero, indice) => {
    // Contenedor principal de la carta (.card)
    const carta = document.createElement('div');
    carta.classList.add('card');
    // Guardamos el índice y el número en datasets para identificarlos al hacer clic
    carta.dataset.index = indice;
    carta.dataset.value = numero;

    // Cara frontal (oculta por defecto)
    const caraFrontal = document.createElement('div');
    caraFrontal.classList.add('card-face', 'card-front');
    // Muestra un símbolo genérico mientras está boca abajo
    caraFrontal.textContent = '❓';

    // Cara trasera (descubierta, contiene el número)
    const caraTrasera = document.createElement('div');
    caraTrasera.classList.add('card-face', 'card-back');
    // USO SEGURO DE textContent (evita XSS frente a innerHTML)
    caraTrasera.textContent = numero;

    // Ensamblamos la carta
    carta.appendChild(caraFrontal);
    carta.appendChild(caraTrasera);

    // La agregamos al fragmento en memoria
    fragmento.appendChild(carta);
  });

  // 4. Inyectamos todo el conjunto de golpe en el DOM
  contenedorTablero.appendChild(fragmento);
}

// ==========================================
// 4. MANEJO DE EVENTOS (FORMULARIO)
// ==========================================

if (formularioJuego) {
  // Escuchar evento 'submit' del formulario (prohibido 'onclick' inline en HTML)
  formularioJuego.addEventListener('submit', (evento) => {
    // Evitar que el formulario recargue la página web por defecto
    evento.preventDefault();

    // Leer valores actualizados de los inputs del DOM conversos a Number
    filas = Number(inputFilas.value);
    columnas = Number(inputColumnas.value);

    // Validar dimensiones ingresadas
    const parejasNecesarias = validarDimensionesTablero(filas, columnas);
    
    // Si la validación fue exitosa, se genera el modelo de cartas y se dibuja
    if (parejasNecesarias !== null) {
      generarParejas(parejasNecesarias);
      renderizarTablero(); // <-- ¡Llamar aquí!
    }
  });
}

// ==========================================
// 5. DELEGACIÓN DE EVENTOS (CLIC EN CARTAS)
// ==========================================

if (contenedorTablero) {
  contenedorTablero.addEventListener('click', (evento) => {
    // Subir desde el origen del clic (event.target) hasta encontrar la tarjeta .card más cercana
    const cartaPulsada = evento.target.closest('.card');

    // VALIDACIÓN TEMPRANA:
    // Ignorar clic si:
    // - No se pulsó una carta.
    // - El tablero está bloqueado.
    // - La carta ya está volteada o emparejada.
    if (
      !cartaPulsada || 
      bloqueoTablero || 
      cartaPulsada.classList.contains('is-flipped') || 
      cartaPulsada.classList.contains('is-matched')
    ) {
      return;
    }

    // Voltear la carta visualmente añadiendo la clase CSS
    cartaPulsada.classList.add('is-flipped');

    // Imprimir el valor para verificar el funcionamiento
    console.log('Carta volteada:', cartaPulsada.dataset.value);

    // (La lógica del turno/parejas de la Fase 4 irá aquí)
  });
}