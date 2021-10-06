//Variables y constantes
let c = document.getElementById("canvas");
// @ts-ignore
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


//Variables de instancia
// @ts-ignore
let tablero = new Tablero(100,100, OBJETIVO ,ctx);
    tablero.crearMatriz();
    tablero.setCarga(false);

let primeraRonda = true;

let imgJ1 = "img/ficha.png";
let j1 = new Jugador(CANT_FICHAS, j1topeXSup, j1topeXInf, j1topeYSup, j1topeYInf, imgJ1, "Jugador 1"); 
j1.addFichaJugador();
dibujarFichasJugador(j1);


let j2topeXSup = 770;
let j2topeXInf = 870;
let j2topeYSup = 500;
let j2topeYInf = 700;

let imgJ2 = "img/ficha2.png";
let j2 = new Jugador(CANT_FICHAS, j2topeXSup,j2topeXInf, j2topeYSup,  j2topeYInf, imgJ2, "Jugador 2");
j2.addFichaJugador();
dibujarFichasJugador(j2);



/// HASTA ACÁ
/// DIBUJAR JUEGO EN LA PÁGINA Y REPRESENTAR ESTRUCTURAS -----------------

iniciarPartida();

function iniciarPartida(){
    // ver qué jugador arranca
    let primerTurno = Math.round(Math.random() * (2 - 1) + 1); // elegir quién empieza, si j1 o j2
    console.log('primer turno' , primerTurno);
    // asignamos el primer turno
    if (primerTurno == 1){
        j1.setTurno(true);
        console.log('juega el 1: ', j1.getTurno());
        console.log('juega el 2: ', j2.getTurno());
    }else{
        j2.setTurno(true);
        console.log('juega el 2: ', j2.getTurno());
        console.log('juega el 1: ', j1.getTurno());
    }
    primeraRonda = false;
    // ya sabemos quién tiene el primer turno
    
    if (!primeraRonda){
        console.log('turno del jugador 1: ' + j1.getTurno());
        if (j1.getTurno()){            
            // juega el 1
            jugar(j1);
            console.log('ya jugó el 1, ahora le toca al 2') ;           
        }else{
            console.log('turno del jugador 2: ' + j2.getTurno());
            // juega el 2
            jugar(j2);
            console.log('ya jugó el 2, ahora le toca al 1') ;     
        }
        // FALTA HACER:
        // se corrobora la lógica de si termina o no para actualizar terminoJuego (variable)
    }
}

// jugar "general" de cada jugador
function jugar(jugador){
    c.addEventListener("mousedown", function(e){
        mouseDown(e, jugador)
    });
    c.addEventListener("mousemove", function(e){
        mouseMove(e)
    });
    c.addEventListener("mouseup", function(e){
        mouseUp(e, jugador)
    });
}

function mouseDown(e, jugador){
    seMueve = true;
    if(ultimaClickeada != null){
        ultimaClickeada = null;
    }
    // Sortear    
    let clickFig = fichaClickeada(e.layerX, e.layerY, jugador);
    if(clickFig != null && clickFig.isMovible()){
        ultimaClickeada = clickFig;
    }

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
        //tablero.drawTablero();
        verificarColumna(columnaX, ultimaClickeada, jugador);
    }
        console.table(tablero.matriz);
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

function verificarColumna(x, ficha, jugador){ //recibe posicion en x que me retorna zonaTirarFicha y ademas recibe la ficha clickeada 
    let y = 0;
    if(estaEnZona){
        while(y < OBJETIVO + 2 && tablero.matriz[x][y] == 0 ){ // OBJETIVO + 2  -> largo del tablero
            y++
        }
        y--;
        if(y >= 0){
            if (jugador.nombre == "Jugador 1"){
                console.log(jugador.nombre);
                tablero.matriz[x][y] = 1;
                j2.setTurno(true);
                j1.setTurno(false);
            }else{
                console.log(jugador.nombre);
                tablero.matriz[x][y] = 2;
                j1.setTurno(true);
                j2.setTurno(false);
            }            
            x = x * 80 + 100;
            y = y * 80 + 100;
            ficha.setPosition(x, y);
            actualizarDisplay();
            dibujarFichasJugador(jugador);
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
