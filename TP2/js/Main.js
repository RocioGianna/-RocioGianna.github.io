//Variables y constantes
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
let seMueve = false;
let ultimaClickeada = null;
let estaEnZona = false;


const CANT_FICHAS = 21; //fichas que va a tener cada jugador para jugar
const OBJETIVO = 4; // objetivo de fichas a alinear para ganar el juego

/**
 * Rangos para dibujar fichas de jugadores aleatoriamente
 */
let j1topeXSup = 770;
let j1topeXInf = 870;
let j1topeYSup = 100;
let j1topeYInf = 300;

// Eventos
c.addEventListener("mousedown", mouseDown);
c.addEventListener("mousemove", mouseMove);
c.addEventListener("mouseup", mouseUp);

//Variables de instancia
let tablero = new Tablero(100,100, OBJETIVO ,ctx);
    tablero.crearMatriz();

let j1 = new Jugador(CANT_FICHAS, j1topeXSup, j1topeXInf, j1topeYSup, j1topeYInf); 
    j1.addFichaJugador();
    dibujarFichasJugador();

// let j2 = new Jugador(CANT_FICHAS);
// j2.addFichaJugador();
// console.log(j1.getFichas());

// FUNCIONES

function dibujarFichasJugador(){//Dibuja las fichas del jugador... hay que pasarle el jugador por parametro
    for(let i = 0; i < j1.getSize(); i++){
        let x = j1.fichas[i].getPosition().x;
        let y = j1.fichas[i].getPosition().y;
        j1.fichas[i].drawFicha(x,y,ctx);
    }
}
function fichaClickeada(x, y){ //funcion que nos devuelve la ficha que selecciono el usuario
    for(let i = 0; i < j1.getSize(); i++){
        const ficha = j1.fichas[i];
        if(ficha.isPonintInside(x, y)){
            return ficha;  // devuelve la figura que clickeamos
        }
    }
    return null;
}
function clearCanvas(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0, c.width, c.height);    
}

function mouseDown(e){
    seMueve = true;
    if(ultimaClickeada != null){
        ultimaClickeada = null;
    }
     
    let clickFig = fichaClickeada(e.layerX, e.layerY);
    if(clickFig != null && clickFig.isMovible()){
        ultimaClickeada = clickFig;
    }
}

function mouseMove(e){
    if(seMueve && ultimaClickeada != null){
        ultimaClickeada.setPosition(e.layerX,e.layerY);
        clearCanvas();
        tablero.drawTablero();
        dibujarFichasJugador();
    }
}

function mouseUp(e){
    seMueve = false;
    if(ultimaClickeada != null){
        let columnaX = zonaTirarFicha(e.layerX, e.layerY);
        verificarColumna(columnaX, ultimaClickeada);
    }
        console.log(tablero.matriz);
}

function zonaTirarFicha(posX, posY){ //la posicion que recibe es de la ficha que entro en la zona 
    let inicioTablero = 100;
    let posXenTablero = posX - inicioTablero;
    let topePosTablero = (OBJETIVO + 3) * 80;
    if(posY < inicioTablero){//corrobora que la ficha en la posicion Y este dentro del rango de tirada ----> entre 0 y 100
        if(posXenTablero >= 0 && posXenTablero <= topePosTablero){//corroboro que la ficha en posicion X este en el rango del tablero ---> 100 y 660
            estaEnZona = true;
            console.log("esta e la zona")
            console.log(Math.trunc(posXenTablero / 80));
            return Math.trunc(posXenTablero / 80);
        }
    }
}                  //RECORDAR

function verificarColumna(x, ficha){ //recibe posicion en x que me retorna zonaTirarFicha y ademas recibe la ficha clickeada 
    let y = 0;
    if(estaEnZona){
        while(y < OBJETIVO + 2 && tablero.matriz[x][y] == 0 ){
            y++
        }
        y--;
        if(y >= 0){
            tablero.matriz[x][y] = 1;
            x = x * 80 + 100;
            y = y * 80 + 100
            ficha.setPosition(x, y);
            dibujarFichasJugador();
            ficha.setMovible(false);
        }
    }
}

//Zona para tirar la ficha 
//habria que chequear la posicion actual de la ficha seleccionada por el jugador y consultar
/**
    let inicioTablero = 100; 
    let cuentaAux = la posicion en X de la ficha seleccionada - inicioTablero; //posicion dentro del rango del tablero
    let topePosTablero = OBJETIVO + 3 + inicioTablero * 80;   
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

    Preguntando si dentro tiene un 0, 1 o 2 . Siendo 0 vacio, 1 cargado con ficha jugador 1, 2 cargado con ficha jugador 2.
    Caso que la columna este vacia cuando la ficha se coloque en [1][6] (valor inicial 0) -----> tendra el valor de la ficha del jugador que sea el turno.
     y hay que hacer un putImageData() para que se dibuje la imagen dentro de la imagen de ese lugar.
 */
