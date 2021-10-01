//Variables y constantes
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

const CANT_FICHAS = 21; //fichas que va a tener cada jugador para jugar
const OBJETIVO = 4; // objetivo de fichas a alinear para ganar el juego
/**
 * Rangos para dibujar fichas de jugadores aleatoriamente
 */
let j1topeXSup = 770;
let j1topeXInf = 870;
let j1topeYSup = 100;
let j1topeYInf = 300;


//Variables de instancia
let tablero = new Tablero(100,100, OBJETIVO ,ctx);
tablero.drawTablero();

let j1 = new Jugador(CANT_FICHAS, j1topeXSup, j1topeXInf, j1topeYSup, j1topeYInf); 
j1.addFichaJugador();

// let j2 = new Jugador(CANT_FICHAS);
// j2.addFichaJugador();
// console.log(j1.getFichas());



//prueba de eventos y ver si funciona isPointInside (Funciona)
c.addEventListener("mousedown", fichaClickeada);
//c.addEventListener("mousemove", prueba);
//c.addEventListener("mouseup", prueba);

function fichaClickeada(e){ //funcion que nos devuelve la ficha que selecciono el usuario
    x = e.layerX;
    y = e.layerY;

    for(let i = 0; i < j1.getSize(); i++){
       if(j1.fichas[i].isPonintInside(x, y)){
           console.log("funciona");
           console.log("posicion ficha clickeada ", j1.fichas[i].getPosition());
           console.log(j1.fichas[i]) // devuelve la figura que clickeamos
           return j1.fichas[i]; // devuelve la figura que clickeamos
       }
    }
}

function verDondeHagoClick(e){
    x = e.layerX;
    y = e.layerY;
    console.log(x,y);
}

document.addEventListener("click", verDondeHagoClick);

//Zona para tirar la ficha 
//habria que chequear la posicion actual de la ficha seleccionada por el jugador y consultar
/**
    let inicioTablero = 100; 
    let cuentaAux = la posicion en X de la ficha seleccionada - inicioTablero; //posicion dentro del rango del tablero
    let topePosTablero = OBJETIVO + inicioTablero * 80;   
    if(la posicion en Y de la ficha seleccionada es menor a inicioTablero){ 
        if(cuentaAux >= 0 && cuentaAux <= topePosTablero){
            return cuentaAux / 80;  ---> obtenemos numero entero(si es 1,23435 nos devuelve 1 que va a ser la posicion de la columna del tablero)
        }
    }

    Una vez que tenemos el numero de columna, en otra funcion deberiamos de recorrer la columna      X         Y
                                                                                                [posRetornada][1]
                                                                                                [posRetornada][2]
                                                                                                [posRetornada][3]
                                                                                                [posRetornada][4]
                                                                                                [posRetornada][5]
                                                                                                [posRetornada][6]
                                                                                                [posRetornada][7]

    Preguntando si dentro tiene un 0, 1 o 2 . Siendo 0 vacio, 1 cargado con ficha jugador 1, 2 cargado con ficha jugador 2.
    Caso que la columna este vacia cuando la ficha se coloque en [1][7] (valor inicial 0) -----> tendra el valor de la ficha del jugador que sea el turno.
     y hay que hacer un putImageData() para que se dibuje la imagen dentro de la imagen de ese lugar.
 */
