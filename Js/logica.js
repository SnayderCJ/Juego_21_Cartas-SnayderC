
let jugador = [];
let pc = [];
let puntosJugador = 0;
let puntosPc = 0;
let mazo

window.onload = function () { 
    reiniciar(); 
    document.getElementById('empezar').addEventListener('click', reiniciar); 
    document.getElementById('pedirCarta').addEventListener('click', pedirCarta); 
    document.getElementById('finalizar').addEventListener('click', finalizarJuego);
}

function iniciarMazo() {
    let valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let cartas = ['CorazonRojo', 'BrilloRojo', 'CorazonNegro', 'TrebolNegro'];
    mazo = [];

    for (let i = 0; i < cartas.length; i++) { 
        for (let j = 0; j < valores.length; j++) { 
            mazo.push(valores[j] + '-' + cartas[i]); 
        }
    }
}

function barajar() {
    
    for (let i = 0; i < mazo.length; i++) {
        let j = Math.floor(Math.random() * mazo.length);
        let temp = mazo[i]; 
        mazo[i] = mazo[j];
        mazo[j] = temp;

    }
  
}

function reiniciar() { 
    iniciarMazo(); 
    barajar(); 
    jugador = [];  
    pc = [];
    puntosJugador = 0;
    puntosPc = 0;
    document.getElementById('resultado').innerHTML = '';
    repartirCartas(); 
}

function repartirCartas() {
    for (let i = 0; i < 2; i++) {
        let cartaJugador = mazo[mazo.length - 1];
        let cartaPc = mazo[mazo.length - 2]; 

        puntosJugador += obtenerValor(cartaJugador);
        puntosPc += obtenerValor(cartaPc); 

        jugador.push(cartaJugador); 
        pc.push(cartaPc); 
        mazo.length -= 2; 
    }
    mostrarCartas() 
}

function mostrarCartas() {
    document.getElementById('cartasJugador').textContent = jugador.toString();
    document.getElementById('cartasPc').textContent = pc[0] + ', ???' // <--- or pc.toString()
    document.getElementById('puntosJugador').textContent = 'Puntos del Jugador: ' + puntosJugador;
    document.getElementById('puntosPc').textContent = 'Puntos de la Máquina: ' + puntosPc;
}

function pedirCarta() {
    if (puntosJugador >= 21) {
        return 
    }
    let carta = mazo[mazo.length - 1]; 
    jugador.push(carta); 
    puntosJugador += obtenerValor(carta); 

    mazo.length--; 

    mostrarCartas();

    if (puntosJugador > 21) {
        finalizarJuego();
    }
}

function obtenerValor(card) {
    let datos = card.split('-'); // 
    let valor = datos[0];

    if (isNaN(valor)) { 
        if (valor === 'A') {
            return 1; 
        }
        return 10; 
    }
    return parseInt(valor);
}

function finalizarJuego() {
    while (puntosPc < 17) { 
        let carta = mazo[mazo.length - 1] 
        pc.push(carta); 
        puntosPc += obtenerValor(carta); 

        mazo.length-- 

    }

    let resultado = '';
    if (puntosJugador > 21 || (puntosPc <= 21 && puntosPc > puntosJugador)) { 
        resultado = '¡La Máquina gana!';
    } else if (puntosPc > 21 || (puntosJugador <= 21 && puntosJugador > puntosPc)) { 
        resultado = '¡El Jugador gana!';
    } else { 
        resultado = '¡Es un empate!';
    }

    document.getElementById('cartasPc').textContent = pc.toString(); 
    document.getElementById('puntosPc').textContent = 'Puntos de la Máquina: ' + puntosPc;
    document.getElementById('resultado').textContent = resultado;
}