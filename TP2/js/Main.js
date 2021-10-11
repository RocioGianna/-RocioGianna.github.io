//Variables y constantes del juego
let c = document.getElementById("canvas");
// @ts-ignore
let ctx = c.getContext("2d");
let seMueve = false;
let ultimaClickeada = null;
let estaEnZona = false;
let jugador = null;
let primeraRonda = true;
let gano = false;

let menuJ1 = document.getElementById("menu-jugador-1");
let menuJ2 = document.getElementById("menu-jugador-2");
let menuJuego = document.getElementById("menu-cant-objetivo");

let showTimer = document.getElementById('timer');

const mitadFicha = 40;

const CANT_FICHAS = 21; //fichas que va a tener cada jugador para jugar
let objetivo = 4; // objetivo de fichas a alinear para ganar el juego

/* Rangos para dibujar fichas de jugadores aleatoriamente*/
let j1topeXSup = 1170;
let j1topeXInf = 1270;
let j1topeYSup = 100;
let j1topeYInf = 300;

let j2topeXSup = 1170;
let j2topeXInf = 1270;
let j2topeYSup = 500;
let j2topeYInf = 700;

/* Variables de las imágenes de cada jugador*/
let imgJ1;
let imgJ2;

/* Jugadores, tablero y timer */
let j1;
let j2;
let tablero;
let timer;

/* Imagen del turno del jugador, gif cuando está a punto de ganar algún jugador e indicador de turno*/
let imgJugadorConTurno = document.getElementById('img-player-actual');
let gifCasiGana = document.getElementById('gif-emotion');
let indicadorTurno = document.getElementById("turno");

/* Inicio de página con los tres menús -> selección de ficha de cada jugador y fichas a alinear */

mostrarMenuJugador1();
mostrarMenuJugador2();
seleccionarObjetivo();

/* Función para selecionar la cantidad de fichas a alinear */
function seleccionarObjetivo(){
    document.getElementById("click-objetivo-juego").addEventListener("click", function(e){        
        // @ts-ignore
        objetivo= parseInt(document.getElementById("objetivo-juego").value); // objetivo de fichas a alinear para ganar el juego
        menuJuego.style.display="none"; // oculta el menú de objetivos
        c.style.display="inline-block"; // muestra el canvas luego de elegir el objetivo
        let primerTurno = Math.round(Math.random() * (2 - 1) + 1); // elije aleatoriamente quién empieza, si j1 o j2
        if (primerTurno == 1){ // indicamos quién tiene el primer turno de todo el juego
            j1.setTurno(true);
            indicadorTurno.innerHTML = "Tiene el turno el " + j1.nombre;
            // @ts-ignore
            imgJugadorConTurno.src = j1.imagenFicha;
        }else{
            j2.setTurno(true);
            indicadorTurno.innerHTML = "Tiene el turno el " + j2.nombre;
            // @ts-ignore
            imgJugadorConTurno.src = j2.imagenFicha;
            
        }
        primeraRonda = false; // termina la primera ronda
        let inicio = document.getElementById('inicio');
        inicio.style.display = "none"; // ocultamos la imagen de inicio para mostrar correctamente el canvas
        // creamos el tablero
        tablero = new Tablero(100,100, objetivo ,ctx);
        tablero.crearMatriz();
        tablero.setCarga(false);
        // creamos el timer
        if(objetivo == 4){
            timer = new Timer(100, 0);
        }else if(objetivo == 6){
            timer = new Timer(150, 0);
        }else if(objetivo == 7){
            timer = new Timer(200, 0);
        }else if(objetivo == 8){
            timer = new Timer(250, 0);
        }
        timer.contarSegundos();
        // jugador vacío por si nadie gana y tiene que mostrar resultados si nadie ganó
        // @ts-ignore
        let jugadorVacio = new Jugador(0, 0,0, 0,  0, 0, "nada");
        // chequeamos si termina el juego
        finalizoElJuego(jugadorVacio);
    })
    
}

/* Menú para elegir la ficha del j1 */
function mostrarMenuJugador1(){
    document.getElementById("ficha-jugador-1").addEventListener("click", function(e){   
         //@ts-ignore
        let imagenSeleccionada = document.getElementById("select-image-player-1").value;
          switch (imagenSeleccionada) {
              case "ironman":              
                  imgJ1 = "img/fichas/ironman.png";
                   break;
              case "capitan":
                  imgJ1 = "img/fichas/capitan.png";
                   break;
              case "flash":
                  imgJ1 = "img/fichas/flash.png";
               break;
              case "hulk":
                  imgJ1 = "img/fichas/hulk.png";
               break;
              case "spiderman":
                  imgJ1 = "img/fichas/spiderman.png";
               break;
              case "superman":
                  imgJ1 = "img/fichas/superman.png";
               break;
          }
    // @ts-ignore
    // Creamos instancia del j2, dibujamos las fichas y las agregamos al arreglo de fichas
    j1 = new Jugador(CANT_FICHAS, j1topeXSup, j1topeXInf, j1topeYSup, j1topeYInf, imgJ1, "Jugador 1"); 
    j1.addFichaJugador();
    dibujarFichasJugador(j1);
    // Ocultamos los divs correspondientes para sólo mostrar el canvas, el turno y el timer
    menuJ1.style.display="none";
    menuJ2.style.display="inline-block"; 
    })
    
}

/* Menú para elegir la ficha del j2 */
function mostrarMenuJugador2(){
    document.getElementById("ficha-jugador-2").addEventListener("click", function(e){   
         //@ts-ignore
        let imagenSeleccionada = document.getElementById("select-image-player-2").value;
        let mismaFicha = document.getElementById('misma-ficha');
                    switch (imagenSeleccionada) {
              case "ironman":              
                  imgJ2 = "img/fichas/ironman.png";
                   break;
              case "capitan":
                  imgJ2 = "img/fichas/capitan.png";
                  break;
              case "flash":
                  imgJ2 = "img/fichas/flash.png";
               break;
              case "hulk":
                  imgJ2 = "img/fichas/hulk.png";
               break;
              case "spiderman":
                  imgJ2 = "img/fichas/spiderman.png";
               break;
              case "superman":
                  imgJ2 = "img/fichas/superman.png";
               break;
          }
          if (imgJ1 === imgJ2){ // si el jugador 2 elije la misma ficha que el 1, se le informa
             alert('Tu fichas son iguales a las del Jugador 1, por favor volvé a elegir');
            mostrarMenuJugador2();
          }else{
             // @ts-ignore
                // Creamos instancia del j2, dibujamos las fichas y las agregamos al arreglo de fichas
                j2 = new Jugador(CANT_FICHAS, j2topeXSup,j2topeXInf, j2topeYSup,  j2topeYInf, imgJ2, "Jugador 2");
                j2.addFichaJugador();
                dibujarFichasJugador(j2);
                // Ocultamos los divs correspondientes para sólo mostrar el canvas, el turno y el timer
                menuJ2.style.display="none"; 
                menuJuego.style.display="inline-block"; 
                mismaFicha.style.display="none";
          }
         
    })
    
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
    // Obtenemos la última clickeada y la ponemos como activa para moverse
    let clickFig = fichaClickeada(e.layerX, e.layerY, jugador);    
    if(clickFig != null && clickFig.isMovible()){
        ultimaClickeada = clickFig;

    }
}

// Movemos la ficha con el mouse y a medida que esto ocurre vamos dibujando todo el canvas de nuevo para actualizar la posición de la ficha
function mouseMove(e){
    if(seMueve && ultimaClickeada != null){
        ultimaClickeada.setPosition(e.layerX,e.layerY);
        actualizarDisplay();       
    }
    
}

// Al levantar la tecla del mouse verificamos si la fecha está sobre el tablero para ser tirada
function mouseUp(e, jugador){
    seMueve = false;
    if(ultimaClickeada != null){
        if(estaSobreElTablero(e.layerX,e.layerY)){
            ultimaClickeada.setPosition((objetivo + 5) * 80, e.layerY);
            actualizarDisplay();
        }
        let columnaX = zonaTirarFicha(e.layerX, e.layerY); // es la coord X donde la suelta
        let columnaY = verificarColumna(columnaX, ultimaClickeada); // es la coord Y donde la suelta
        verificaVictoria(columnaX, columnaY, tablero, jugador); // verificamos si luego de soltar la ficha el jugador ganó
    }
}

// FUNCIONES 
// Dibujamos la ficha del jugador dentro del tablero
function dibujarFichasJugador(jugador){
    for(let i = 0; i < jugador.getSize(); i++){
        let x = jugador.fichas[i].getPosition().x;
        let y = jugador.fichas[i].getPosition().y;
        if(primeraRonda){ // Para no cargar constantemente imágenes con onload
            jugador.fichas[i].drawFicha(x,y,ctx); //carga y dibuja la ficha
        } else{
            jugador.fichas[i].cargarFicha(x, y, ctx); //solo dibuja la ficha
        }
    }
}


// Nos devuelve la ficha que selecciono el usuario
function fichaClickeada(x, y, jugador){ 
    for(let i = 0; i < jugador.getSize(); i++){
        const ficha = jugador.fichas[i];
        if(ficha.isPonintInside(x, y)){
            return ficha;  // devuelve la figura que clickeamos
        }
    }
    return null;
}


// Dibujamos el canvas en blanco, luego el tablero actualizado y las fichas de cada jugador
function actualizarDisplay(){
    ctx.fillStyle = "#FFFFFF";
    // @ts-ignore
    ctx.fillRect(0,0, c.width, c.height); 
    tablero.drawTablero();
    dibujarFichasJugador(j1);
    dibujarFichasJugador(j2);
}

// Verificamos si el jugador tiene la ficha por encima del tablero (dentro del tablero)
function estaSobreElTablero(posX, posY){
    let inicioTablero = 100; 
    let topePosTableroY = (objetivo + 2) * 80 + 100;
    let topePosTableroX = (objetivo + 3) * 80 + 100;
    if (( posY <= topePosTableroY && posY >= inicioTablero) && (posX >= inicioTablero && posX <= topePosTableroX)){
        return true;
    }
    return false;
}


//FUNCIONES PARA CORROBORAR Y DIBUJAR DENTRO DE LA MATRIZ Y TABLERO
function zonaTirarFicha(posX, posY){ //la posicion que recibe es de la ficha que entro en la zona habilitada para tirar
    let inicioTablero = 100; 
    let posXenTablero = posX - inicioTablero;
    let topePosTablero = (objetivo + 3) * 80;   
    if(posY < inicioTablero){//corrobora que la ficha en la posicion Y este dentro del rango de tirada ----> entre 0 y 100
        if(posXenTablero >= 0 && posXenTablero <= topePosTablero){//corroboro que la ficha en posicion X este en el rango del tablero ---> 100 y 660
            estaEnZona = true;
            return Math.trunc(posXenTablero / 80);
        }
    }    
}


function verificarColumna(x, ficha){ //recibe posicion en x que me retorna zonaTirarFicha y ademas recibe la ficha clickeada 
    let y = 0;
    if(estaEnZona){        
        while(y < objetivo + 2 && tablero.matriz[x][y] == 0 ){ // OBJETIVO + 2  -> largo del tablero
            y++
        }
        y--;
        if(y >= 0){
            if (j1.getTurno()){
                tablero.matriz[x][y] = 1;
                j1.setTurno(false);
                j2.setTurno(true);
                // @ts-ignore
                imgJugadorConTurno.src = j2.imagenFicha;
                // @ts-ignore
                indicadorTurno.innerHTML = "Tiene el turno el " + j2.nombre;
            }else{
                tablero.matriz[x][y] = 2;
                j2.setTurno(false);
                j1.setTurno(true);
                // @ts-ignore
                imgJugadorConTurno.src = j1.imagenFicha;
                // @ts-ignore
                indicadorTurno.innerHTML = "Tiene el turno el " + j1.nombre;
            }            
            x = x * 80 + 100 + mitadFicha;
            y = y * 80 + 100 + mitadFicha;
            ficha.setPosition(x, y);
            actualizarDisplay();
            ficha.setMovible(false);
        } 
    }   
    return Math.floor((y-100)/80);
}

// Verificamos si el jugador ganó, obteniendo a través de su nombre el valor de la matriz que representa estructuralmente al tablero, para corroborar
// 1 = Jugador 1
// 2 = Jugador 2
function verificaVictoria(x, y, tablero, jugador){        
        let valorJugadorMatriz;
        if (jugador.nombre == "Jugador 1"){
            valorJugadorMatriz = 1;
        }else{
            valorJugadorMatriz = 2;
        }
        // Chequeamos si por alguna de las posibilidades gana -> siempre tomando como partida la última ficha arrojada
        let emotion = document.getElementById('emotion');
        if (  (checkHorizontales(parseInt(y), tablero, valorJugadorMatriz, emotion))){//{
            gano = true;
        }else if (checkVerticales(parseInt(x), tablero, valorJugadorMatriz, emotion)) {
            gano = true;
        }else if (checkDiagonales(x, y, tablero, valorJugadorMatriz, emotion)) {
            gano = true;
        }
        // Verificamos el timer
        finalizoElJuego(jugador);               
}

// Chequea si ganó de forma horizontal
function checkHorizontales(y, tablero, valorJugadorMatriz, emotion){
    let cantFichasSeguidas = 0;
	let columna = 0;
    while (columna <= (objetivo + 2) && cantFichasSeguidas < objetivo){
        if (tablero.matriz[columna][y]==valorJugadorMatriz){
            cantFichasSeguidas++;
        }else{
            cantFichasSeguidas=0;
        }             	
        columna++;
        if (cantFichasSeguidas == objetivo) {          
            return true;        
        }
    }
    if (cantFichasSeguidas == objetivo-1){ // El jugador que recién puso la ficha está a una ficha de ganar, se muestra un gif
        emotion.style.display = "inline-block";
        if (j1.geTurno()){
            // @ts-ignore
            gifCasiGana.src = "img/gifs/hamburgeusas.gif";
        }else{
            // @ts-ignore
            gifCasiGana.src = "img/gifs/willsmith.gif";
        }        
    }
    return false;    
}
// Chequea si ganó de forma vertical
function checkVerticales(x,tablero, valorJugadorMatriz, emotion){
    let cantFichasSeguidas = 0;
 	let fila = 0;
 	while (fila <= (objetivo + 3) && cantFichasSeguidas < objetivo) {
 		if (tablero.matriz[x][fila]==valorJugadorMatriz){
            cantFichasSeguidas++;
        }else{
            cantFichasSeguidas=0;
        }              	
 		fila++;
        if (cantFichasSeguidas == objetivo) {
            return true;
        }else{
            if (cantFichasSeguidas == (objetivo-1)){ // El jugador que recién puso la ficha está a una ficha de ganar, se muestra un gif
                emotion.style.display = "inline-block";
               if (j1.getTurno()){
                   // @ts-ignore                   
                   gifCasiGana.src = "img/gifs/hamburguesas.gif";
               }else{
                   // @ts-ignore
                   gifCasiGana.src = "img/gifs/willsmith.gif";
               }        
           }
        }
 	}
     return false;	
    
 }

// Chequea si ganó por sobre alguna de las diagonales
 function checkDiagonales(x, y, tablero, valorJugadorMatriz, emotion){
    //  Verificamos la diagonal hacia la abajo y haca la izquierda 
 	let cantFichasSeguidas = 0;
 	let fila = y - 3;
 	let columna = x - 3;
 	while (fila < y + objetivo && columna<  x + objetivo && cantFichasSeguidas < objetivo) {
 		if (0 <= fila && fila< (objetivo+2) && 0 <= columna && (columna < objetivo+3)) {
 			if (tablero.matriz[columna][fila]===valorJugadorMatriz) 
                 cantFichasSeguidas++;
 			else 
                 cantFichasSeguidas=0;
 		}
 		fila++;
        columna++; 
 	}
 	 // Verificamos la diagonal hacia la arriba y haca la derecha 
 	if (cantFichasSeguidas < objetivo) {
 		cantFichasSeguidas = 0;
 		fila = y + 3;
 		columna = x - 3;
 		while (fila>y-4 && columna<x+4 && cantFichasSeguidas< objetivo) {
 			if (0<=fila && fila< (objetivo +2) && 0 <= columna && columna< (objetivo + 3)) {
 				if (tablero.matriz[columna][fila]==valorJugadorMatriz) 
                     cantFichasSeguidas++;
 				else 
                     cantFichasSeguidas=0;	
 			}
         fila--; 
         columna++; 
 		}
 	} 	 
 	if (cantFichasSeguidas == objetivo) {
         return true;        
    }
    if (cantFichasSeguidas == objetivo-1){ // El jugador que recién puso la ficha está a una ficha de ganar, se muestra un gif
        emotion.style.display = "inline-block";
        if (j1.geTurno()){
            // @ts-ignore
            gifCasiGana.src = "img/gifs/hamburguesas.gif";
        }else{
            // @ts-ignore
            gifCasiGana.src = "img/gifs/willsmith.gif";
        }        
    }
    return false;
}

// @ts-ignore
// Botón para reiniciar el juego
let botonReset = document.getElementById('button-reset-game').addEventListener("click", loadPage);

// Verificamos si ganó el juego ya sea porque se terminó el tiempo o porque alguien ganó
function finalizoElJuego(jugador){
    if(timer.contador == 0){
        pararJuego(j1);
        pararJuego(j2);
        resetJuego();
    }
    else{
        if(timer.contador >= 1 && gano){ // alguien ganó
            // Sólo mostramos dos gifs con un personaje que se corresponde con la ficha que elijió cada jugador
            // Hay un gif para victoria y derrota de cada tipo de ficha
            let seccionTurnos = document.getElementById("seccion-turno");
            seccionTurnos.style.display = "none";
            c.style.display = "none";
            let resultados = document.getElementById("resultados");
            resultados.style.display = "flex";
            let emotion = document.getElementById('emotion');
            emotion.style.display = "none";
            let resultado = document.getElementById('show-resultado');
            resultado.innerHTML = "Ganó el " + jugador.nombre + "!!!!!";
            let fondoJuego = document.getElementById('fondo-juego');
            fondoJuego.style.display = "none";
            // Paramos el timer
            timer.stop();
            pararJuego(j1);
            pararJuego(j2);
            // Mostramos el resultado
            mostrarResultados(jugador);
            // Mostramos botón para resetear el juego
            resetJuego();
        }
    }    
}

// Obtenemos el personaje que eligió cada jugador para mostrarlo en el gif correspondiente, tanto para la victoria como para la derrota
function obtenerDatoFicha(jugador, gifJugador1, gifJugador2){   
    // Obtengo dato de la imagen del j1
        switch(j1.imagenFicha){
            case "img/fichas/ironman.png":              
                gifJugador1.src = "img/gifs/ironman";
            break;
            case "img/fichas/capitan.png":
                gifJugador1.src = "img/gifs/capitan";
                break;
            case "img/fichas/flash.png":
                gifJugador1.src = "img/gifs/flash";
            break;
            case "img/fichas/hulk.png":
                gifJugador1.src = "img/gifs/hulk";
            break;
            case "img/fichas/spiderman.png":
                gifJugador1.src = "img/gifs/spiderman";
            break;
            case "img/fichas/superman.png":
                gifJugador1.src = "img/gifs/superman";
            break;
        }
    // Obtengo dato de la imagen del j2
        switch(j2.imagenFicha){
            case "img/fichas/ironman.png":              
                gifJugador2.src = "img/gifs/ironman";
            break;
            case "img/fichas/capitan.png":
                gifJugador2.src = "img/gifs/capitan";
                break;
            case "img/fichas/flash.png":
                gifJugador2.src = "img/gifs/flash";
            break;
            case "img/fichas/hulk.png":
                gifJugador2.src = "img/gifs/hulk";
            break;
            case "img/fichas/spiderman.png":
                gifJugador2.src = "img/gifs/spiderman";
            break;
            case "img/fichas/superman.png":
                gifJugador2.src = "img/gifs/superman";
            break;
        }  

        if (jugador.nombre == "Jugador 1"){
            gifJugador1.src += "Wins.gif";
            gifJugador2.src += "Loses.gif";
        }else{
            if (jugador.nombre == "Jugador 2"){
                gifJugador2.src += "Wins.gif";
                gifJugador1.src += "Loses.gif";            
            }else{
                if (jugador.nombre == "nada"){
                    return null;
                }
            }        
        }
        return {
            gifJ1: gifJugador1.src,
            gifJ2: gifJugador2.src
        }
}

// Mostramos los resultados luego de que se oculta el canvas
function mostrarResultados(jugador){
    let resultados = document.getElementById('resultados');
    let gifJugador1 = document.getElementById('gif-result-player1');
    let gifJugador2 = document.getElementById('gif-result-player2');;
    let jugador1 = obtenerDatoFicha(jugador, gifJugador1, gifJugador2).gifJ1;
    let jugador2 = obtenerDatoFicha(jugador, gifJugador1, gifJugador2).gifJ2;  
    if (jugador1 !== null && jugador2 !== null){     
        showTimer.style.display = "none";   
        resultados.style.display = "inline-block";
        // @ts-ignore
        gifJugador1.src = obtenerDatoFicha(jugador, gifJugador1, gifJugador2).gifJ1;
        // @ts-ignore
        gifJugador2.src = obtenerDatoFicha(jugador, gifJugador1, gifJugador2).gifJ2;  
    }  
}
    
// @ts-ignore
function pararJuego(jugador){
    for(let i = 0; i < jugador.getSize(); i++){
        jugador.fichas[i].setMovible(false); // Anulamos las fichas
    }
}

// Mostramos el div donde está el botón de reset
function resetJuego(){
    let botonReset = document.getElementById('reset');
    botonReset.style.display="inline-block";    
}

// Recargamos la página
function loadPage(){
    location.reload();
}
