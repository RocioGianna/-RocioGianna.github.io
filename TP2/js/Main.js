//Variables y constantes del juego
let c = document.getElementById("canvas");
// @ts-ignore
let ctx = c.getContext("2d");
let seMueve = false;
let ultimaClickeada = null;
let estaEnZona = false;
let jugador = null;
let primeraRonda = true;


const CANT_FICHAS = 21; //fichas que va a tener cada jugador para jugar
const OBJETIVO = 4; // objetivo de fichas a alinear para ganar el juego

/**
 * Rangos para dibujar fichas de jugadores aleatoriamente
 */
let j1topeXSup = 770;
let j1topeXInf = 870;
let j1topeYSup = 100;
let j1topeYInf = 300;

let j2topeXSup = 770;
let j2topeXInf = 870;
let j2topeYSup = 500;
let j2topeYInf = 700;

let imgJ1 = "img/ironman.png";
let imgJ2 = "img/flash.png";


//Variables de instancia
// @ts-ignore
let tablero = new Tablero(100,100, OBJETIVO ,ctx);
    tablero.crearMatriz();
    tablero.setCarga(false);

let j1 = new Jugador(CANT_FICHAS, j1topeXSup, j1topeXInf, j1topeYSup, j1topeYInf, imgJ1, "Jugador 1"); 
j1.addFichaJugador();
dibujarFichasJugador(j1);

let j2 = new Jugador(CANT_FICHAS, j2topeXSup,j2topeXInf, j2topeYSup,  j2topeYInf, imgJ2, "Jugador 2");
j2.addFichaJugador();
dibujarFichasJugador(j2);

/// HASTA ACÁ
/// DIBUJAR JUEGO EN LA PÁGINA Y REPRESENTAR ESTRUCTURAS -----------------

iniciarPartida(); //Funcion que se encarga de elegir aleatoriamente el jugador que inicia en la primer ronda

function iniciarPartida(){

    let primerTurno = Math.round(Math.random() * (2 - 1) + 1); // elegir quién empieza, si j1 o j2

    if (primerTurno == 1){
        j1.setTurno(true);
    }else{
        j2.setTurno(true);
    }
    primeraRonda = false;    
}
//EVENTOS MOUSE
c.addEventListener("mousedown", function(e){
    if(j1.getTurno()){
        jugador = j1;
        mouseDown(e, jugador);
    }else{
        jugador = j2;
        mouseDown(e, jugador);
    }
});
c.addEventListener("mousemove", function(e){
    mouseMove(e)
});
c.addEventListener("mouseup", function(e){
    mouseUp(e, jugador)
});

// FUNCIONES EVENTOS
function mouseDown(e, jugador){
    seMueve = true;
    if(ultimaClickeada != null){
        ultimaClickeada = null;
    }

    let clickFig = fichaClickeada(e.layerX, e.layerY, jugador);
    if(clickFig != null && clickFig.isMovible()){
        ultimaClickeada = clickFig;
    }
}
function mouseMove(e){
    if(seMueve && ultimaClickeada != null){
        ultimaClickeada.setPosition(e.layerX,e.layerY);
        // drawFigure ->
        //      clear canvas
        //      for para dibujar todas las figuras (fichas) y cada ficha tiene .draw()
        actualizarDisplay();
        
    }
}
function mouseUp(e, jugador){
    seMueve = false;
    if(ultimaClickeada != null){
        let columnaX = zonaTirarFicha(e.layerX, e.layerY); // es donde la suelta
        verificarColumna(columnaX, ultimaClickeada, jugador);
    }
       // console.table(tablero.matriz);
}

// FUNCIONES 
function dibujarFichasJugador(jugador){//Dibuja las fichas del jugador... hay que pasarle el jugador por parametro
    for(let i = 0; i < jugador.getSize(); i++){
        let x = jugador.fichas[i].getPosition().x;
        let y = jugador.fichas[i].getPosition().y;
        if(primeraRonda){
            jugador.fichas[i].drawFicha(x,y,ctx);//carga y dibuja la ficha
        } else{
            jugador.fichas[i].cargarFicha(x, y, ctx); //solo dibuja la ficha
        }
    }
}
function fichaClickeada(x, y, jugador){ //funcion que nos devuelve la ficha que selecciono el usuario
    for(let i = 0; i < jugador.getSize(); i++){
        const ficha = jugador.fichas[i];
        if(ficha.isPonintInside(x, y)){
            return ficha;  // devuelve la figura que clickeamos
        }
    }
    return null;
}
function actualizarDisplay(){
    ctx.fillStyle = "#FFFFFF";
    // @ts-ignore
    ctx.fillRect(0,0, c.width, c.height); 
    tablero.drawTablero();
    dibujarFichasJugador(j1);
    dibujarFichasJugador(j2);
}


//FUNCIONES PARA CORROBORAR Y DIBUJAR DENTRO DE LA MATRIZ Y TABLERO
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
}             
function verificarColumna(x, ficha){ //recibe posicion en x que me retorna zonaTirarFicha y ademas recibe la ficha clickeada 
    let y = 0;
    if(estaEnZona){
        while(y < OBJETIVO + 2 && tablero.matriz[x][y] == 0 ){ // OBJETIVO + 2  -> largo del tablero
            y++
        }
        y--;
        if(y >= 0){
            if (j1.getTurno()){
                tablero.matriz[x][y] = 1;
                j1.setTurno(false);
                j2.setTurno(true);
            }else{
                tablero.matriz[x][y] = 2;
                j2.setTurno(false);
                j1.setTurno(true);
            }            
            x = x * 80 + 100;
            y = y * 80 + 100;
            ficha.setPosition(x, y);
            actualizarDisplay();
            ficha.setMovible(false);
        }
        if(tablero.matriz[x][y] != 0){
            ficha.setPosition(160, 672);
           actualizarDisplay();
        }
    }
}

