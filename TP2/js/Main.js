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

/**
 * Rangos para dibujar fichas de jugadores aleatoriamente
 */
let j1topeXSup = 1170;
let j1topeXInf = 1270;
let j1topeYSup = 100;
let j1topeYInf = 300;

let j2topeXSup = 1170;
let j2topeXInf = 1270;
let j2topeYSup = 500;
let j2topeYInf = 700;

let imgJ1;// = "img/capitan.png";
let imgJ2;// = "img/spiderman.png";

let j1;
let j2;
let tablero;
let timer;

let imgJugadorConTurno = document.getElementById('img-player-actual');
let gifCasiGana = document.getElementById('gif-emotion');

let indicadorTurno = document.getElementById("turno");


mostrarMenuJugador1();
mostrarMenuJugador2();
seleccionarObjetivo();


function seleccionarObjetivo(){
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    document.getElementById("click-objetivo-juego").addEventListener("click", function(e){
        
        // @ts-ignore
        objetivo= parseInt(document.getElementById("objetivo-juego").value); // objetivo de fichas a alinear para ganar el juego
        // @ts-ignore
        console.log("objetivo", objetivo);
        menuJuego.style.display="none";
        c.style.display="inline-block";
        //objetivo = 4;
        // iniciarPartida(); //Funcion que se encarga de elegir aleatoriamente el jugador que inicia en la primer ronda

        // function iniciarPartida(){

            let primerTurno = Math.round(Math.random() * (2 - 1) + 1); // elegir quién empieza, si j1 o j2

            if (primerTurno == 1){
                j1.setTurno(true);
                indicadorTurno.innerHTML = "Tiene el turno el " + j1.nombre;
                console.log(j1.imagenFicha);
                // @ts-ignore
                imgJugadorConTurno.src = j1.imagenFicha;
            }else{
                j2.setTurno(true);
                indicadorTurno.innerHTML = "Tiene el turno el " + j2.nombre;
                // @ts-ignore
                imgJugadorConTurno.src = j2.imagenFicha;
                
            }

            primeraRonda = false;  

            // @ts-ignore
            let inicio = document.getElementById('inicio');
            inicio.style.display = "none";
            tablero = new Tablero(100,100, objetivo ,ctx);
            tablero.crearMatriz();
            tablero.setCarga(false);
            // @ts-ignore
            timer = new Timer(20, 0);
            timer.contarSegundos();
            // @ts-ignore
            let jugadorVacio = new Jugador(0, 0,0, 0,  0, 0, "nada")
            
            finalizoElJuego(jugadorVacio);
    })
    
}

function mostrarMenuJugador1(){
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    document.getElementById("ficha-jugador-1").addEventListener("click", function(e){
        console.log('eligió el 1');
      
         //@ts-ignore
        let imagenSeleccionada = document.getElementById("select-image-player-1").value;
          console.log(imagenSeleccionada);
          switch (imagenSeleccionada) {
              case "ironman":              
                  imgJ1 = "img/fichas/ironman.png";
                  //console.log(imgJ1);
                   break;
              case "capitan":
                  imgJ1 = "img/fichas/capitan.png";
                  console.log(imgJ1);
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
          
    // c.style.display="inline-block"; 
    // @ts-ignore
    j1 = new Jugador(CANT_FICHAS, j1topeXSup, j1topeXInf, j1topeYSup, j1topeYInf, imgJ1, "Jugador 1"); 
    j1.addFichaJugador();
    dibujarFichasJugador(j1);
    menuJ1.style.display="none";
    menuJ2.style.display="inline-block"; 
    })
    
}

function mostrarMenuJugador2(){
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    document.getElementById("ficha-jugador-2").addEventListener("click", function(e){
        console.log('eligió el 2');
      
         //@ts-ignore
        let imagenSeleccionada = document.getElementById("select-image-player-2").value;
        let mismaFicha = document.getElementById('misma-ficha');
          console.log(imagenSeleccionada);
          
          switch (imagenSeleccionada) {
              case "ironman":              
                  imgJ2 = "img/fichas/ironman.png";
                  //console.log(imgJ2);
                   break;
              case "capitan":
                  imgJ2 = "img/fichas/capitan.png";
                  
                   break;
              case "flash":
                  imgJ2 = "img/fichas/flash.png";
                  console.log(imgJ2);
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
          if (imgJ1 === imgJ2){
            console.log('son iguales');
            alert('son iguales volvé a elegir');
            mismaFicha.innerHTML = 'misma-ficha';
            mostrarMenuJugador2();
            console.log('sale del segundo');
          }else{
             // @ts-ignore
                j2 = new Jugador(CANT_FICHAS, j2topeXSup,j2topeXInf, j2topeYSup,  j2topeYInf, imgJ2, "Jugador 2");
                j2.addFichaJugador();
                dibujarFichasJugador(j2);
                menuJ2.style.display="none"; 
                menuJuego.style.display="inline-block"; 
                mismaFicha.style.display="none";
          }
         
    })
    
}

/// DIBUJAR JUEGO EN LA PÁGINA Y REPRESENTAR ESTRUCTURAS -----------------
  
//}


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
    //ultimaClickeada.cargarFicha(e.layerX-40, e.layerY-40, ctx);
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
        if(estaSobreElTablero(e.layerX,e.layerY)){
            ultimaClickeada.setPosition((objetivo + 5) * 80, e.layerY);
            actualizarDisplay();
        }
        let columnaX = zonaTirarFicha(e.layerX, e.layerY); // es la coord X donde la suelta
        let columnaY = verificarColumna(columnaX, ultimaClickeada); // es la coord Y donde la suelta
        verificaVictoria(columnaX, columnaY, tablero, jugador);
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
function zonaTirarFicha(posX, posY){ //la posicion que recibe es de la ficha que entro en la zona 
    let inicioTablero = 100; 
    let posXenTablero = posX - inicioTablero;
    let topePosTablero = (objetivo + 3) * 80;
   
    if(posY < inicioTablero){//corrobora que la ficha en la posicion Y este dentro del rango de tirada ----> entre 0 y 100
        if(posXenTablero >= 0 && posXenTablero <= topePosTablero){//corroboro que la ficha en posicion X este en el rango del tablero ---> 100 y 660
            estaEnZona = true;
            console.log("esta en la zona")
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
            // verificar si ganó
            //console.log('colocó la ficha');
            actualizarDisplay();
            //console.log('actualizó el display');
            ficha.setMovible(false);
            //console.log('ficha no movible');
        }
        // acá la ubica abajo del tablero
        // if(tablero.matriz[x][y] != 0){
        //     ficha.setPosition(160, 672);
        //     actualizarDisplay();
        // }  
        //console.log('casi que sale');
    }   
    //console.log('casi que sale 2'); 
    return Math.floor((y-100)/80);
}

function verificaVictoria(x, y, tablero, jugador){
    console.log('entra a vv');
        
        let valorJugadorMatriz;
        if (jugador.nombre == "Jugador 1"){
            valorJugadorMatriz = 1;
        }else{
            valorJugadorMatriz = 2;
        }
        console.log('pos ultima clickeada: ', 'x:', x,  'y:', y);
        // Chequeamos si por alguna de las posibilidades gana
        console.log('valor jugador matriz', valorJugadorMatriz);
        console.log('fila fija: ', y);
        let emotion = document.getElementById('emotion');
        if (  (checkHorizontales(parseInt(y), tablero, valorJugadorMatriz, emotion))){//{
            gano = true;
        }else if (checkVerticales(parseInt(x), tablero, valorJugadorMatriz, emotion)) {
            gano = true;
        }else if (checkDiagonales(x, y, tablero, valorJugadorMatriz, emotion)) {
            gano = true;
        }
        finalizoElJuego(jugador);
           // if (! {

           // }
        //}
        
        //||   ) {// || checkVerticales(parseInt(x), tablero, valorJugadorMatriz)){
             //|| checkVerticales(x, y, tablero, valorJugadorMatriz) ||  checkDiagonales(x, y, tablero, valorJugadorMatriz)){
           // gano = true;
            console.log('gano el jugador ', jugador.nombre, '? ', gano)
            // mostrar mensaje en html
        //} 
        console.table(tablero.matriz);
            
        
    
}

function checkHorizontales(y, tablero, valorJugadorMatriz, emotion){
    let cantFichasSeguidas = 0;
	let columna = 0;
    console.log('objetivo:', objetivo);
    console.log('check horizontales:');
    console.log('x inicial: ', columna);
    console.log('cantFichasSeguidas antes del for', cantFichasSeguidas);
    //console.log(tablero.matrix[columna][y]);
    //console.log(tablero.matriz[y][columna]);
    while (columna <= (objetivo + 2) && cantFichasSeguidas < objetivo){
        console.log('cantFichasSeguidas dentro del for', cantFichasSeguidas);
        //console.table(tablero.matriz);
        if (tablero.matriz[columna][y]==valorJugadorMatriz){
            cantFichasSeguidas++;
        }else{
            cantFichasSeguidas=0;
        }             	
        columna++;

        if (cantFichasSeguidas == objetivo) {
            console.log('cantFichasSeguidas ', cantFichasSeguidas);            
            return true;        
        }
    }
    if (cantFichasSeguidas == objetivo-1){
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
    //console.log('cantFichasSeguidas ', cantFichasSeguidas); 

    
}

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
            if (cantFichasSeguidas == (objetivo-1)){
                console.log('son 3', cantFichasSeguidas);
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
     
    //console.log('son 3', cantFichasSeguidas);
     return false;	
    
 }

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
    if (cantFichasSeguidas == objetivo-1){
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
let botonReset = document.getElementById('button-reset-game').addEventListener("click", loadPage);

function finalizoElJuego(jugador){
    console.log('contador timer inicio finalizoJuego', timer.getContador());
    if(timer.contador == 0){
        console.log('contador timer terminó', timer.getContador());
        // @ts-ignore
        pararJuego(j1);
        // @ts-ignore
        pararJuego(j2);
        // @ts-ignore
        resetJuego();
    }
    else{
        if(timer.contador >= 1 && gano){ // alguien ganó
            console.log('contador timer', timer.getContador());
            console.log('gano? ', gano);
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
            timer.stop();
            // @ts-ignore
            pararJuego(j1);
            // @ts-ignore
            pararJuego(j2);
            // @ts-ignore
            mostrarResultados(jugador);
            // @ts-ignore
            resetJuego();
        }
    }    
}

function obtenerDatoFicha(jugador, gifJugador1, gifJugador2){   
    // Obtengo dato de la imagen del j1
        switch(j1.imagenFicha){
            case "img/fichas/ironman.png":              
                gifJugador1.src = "img/gifs/ironman";
            //console.log(imgJ1);
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
            //console.log(imgJ1);
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
        console.log(gifJugador1.src);
        console.log(gifJugador2.src);
        return {
            gifJ1: gifJugador1.src,
            gifJ2: gifJugador2.src
        }
}
  


// @ts-ignore
function mostrarResultados(jugador){
    let resultados = document.getElementById('resultados');
    let gifJugador1 = document.getElementById('gif-result-player1');
    let gifJugador2 = document.getElementById('gif-result-player2');;
    let jugador1 = obtenerDatoFicha(jugador, gifJugador1, gifJugador2).gifJ1;
    let jugador2 = obtenerDatoFicha(jugador, gifJugador1, gifJugador2).gifJ2;  
    if (jugador1 !== null && jugador2 !== null){        
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
        jugador.fichas[i].setMovible(false); //saco evento a las fichas
        console.log('se puede mover esta ficha?', jugador.fichas[i].isMovible());
    }
    console.log('paró fichas del jugador', jugador);
}

// @ts-ignore
function resetJuego(){
    let botonReset = document.getElementById('reset');
    botonReset.style.display="inline-block";    
}

// @ts-ignore
function loadPage(){
    location.reload();
}


//loadPage();



// @ts-ignore
