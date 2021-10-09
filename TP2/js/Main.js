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

let imgJ1 = "img/capitan.png";
let imgJ2 = "img/spiderman.png";


// Selección de imagen para cada jugador
  //function seleccionarFichaJugador(){
      document.getElementById("ficha-jugador-1").addEventListener("click", function(e){
          console.log('eligió el 1');
        
          // @ts-ignore
          let imagenSeleccionada = document.getElementById("select-image-player-1").value;
        //   console.log(imagenSeleccionada);
        //   switch (imagenSeleccionada) {
        //       case "ironman":              
        //           imgJ1 = "img/ironman.png";
        //           console.log(imgJ1);
        //           //break;
        //       case "capitan":
        //           imgJ1 = "img/capitan.png";
        //           //break;
        //       case "flash":
        //           imgJ1 = "img/flash.png";
        //       //break;
        //       case "hulk":
        //           imgJ1 = "img/hulk.png";
        //       //break;
        //       case "spiderman":
        //           imgJ1 = "img/spiderman.png";
        //       //break;
        //       case "superman":
        //           imgJ1 = "img/superman.png";
        //       //break;
          

        //   }


          if (imagenSeleccionada == "ironman"){
            imgJ1 = "img/ironman.png";
          }
          //return imgJ1;
      })
    
      document.getElementById("ficha-jugador-2").addEventListener("click", function(e){
            
            console.log('eligió el 2');
            //@ts-ignore
          let imagenSeleccionada = document.getElementById("select-image-player-2").value;
          console.log(imagenSeleccionada);
          if (imagenSeleccionada === "ironman"){
            imgJ2 = "img/ironman.png";
          }
        //   switch (imagenSeleccionada) {
        //       case "ironman":              
        //           imgJ2 = "img/ironman.png";
        //           //break;
        //       case "capitan":
        //           imgJ2 = "img/capitan.png";
        //           //break;
        //       case "flash":
        //           imgJ2 = "img/flash.png";
        //       //break;
        //       case "hulk":
        //           imgJ2 = "img/hulk.png";
        //       //break;
        //       case "spiderman":
        //           imgJ2 = "img/spiderman.png";
        //       //break;
        //       case "superman":
        //           imgJ2 = "img/superman.png";
        //       //break;  
              
              
        //   }
          //return imgJ2;
      })
 // }

  //seleccionarFichaJugador();




//Variables de instancia
// @ts-ignore
let tablero = new Tablero(100,100, objetivo ,ctx);
    tablero.crearMatriz();
    tablero.setCarga(false);

// @ts-ignore
let j1 = new Jugador(CANT_FICHAS, j1topeXSup, j1topeXInf, j1topeYSup, j1topeYInf, imgJ1, "Jugador 1"); 
j1.addFichaJugador();
dibujarFichasJugador(j1);

// @ts-ignore
let j2 = new Jugador(CANT_FICHAS, j2topeXSup,j2topeXInf, j2topeYSup,  j2topeYInf, imgJ2, "Jugador 2");
j2.addFichaJugador();
dibujarFichasJugador(j2);

/// HASTA ACÁ
/// DIBUJAR JUEGO EN LA PÁGINA Y REPRESENTAR ESTRUCTURAS -----------------
let indicadorTurno = document.querySelector(".turno");
iniciarPartida(); //Funcion que se encarga de elegir aleatoriamente el jugador que inicia en la primer ronda

function iniciarPartida(){

    let primerTurno = Math.round(Math.random() * (2 - 1) + 1); // elegir quién empieza, si j1 o j2

    if (primerTurno == 1){
        j1.setTurno(true);
        indicadorTurno.innerHTML = "Tiene el turno " + j1.nombre;
    }else{
        j2.setTurno(true);
        indicadorTurno.innerHTML = "Tiene el turno " + j2.nombre;
    }

    primeraRonda = false;    
}

let timer = new Timer(100, 0);
timer.contarSegundos();

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


//FUNCIONES PARA CORROBORAR Y DIBUJAR DENTRO DE LA MATRIZ Y TABLERO
function estaSobreElTablero(posX, posY){
    let inicioTablero = 100; 
    let topePosTableroY = (objetivo + 2) * 80 + 100;
    let topePosTableroX = (objetivo + 3) * 80 + 100;

    if (( posY <= topePosTableroY && posY >= inicioTablero) && (posX >= inicioTablero && posX <= topePosTableroX)){
        return true;
    }
    return false;
}
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
                indicadorTurno.innerHTML = "Tiene el turno el " + j2.nombre;
            }else{
                tablero.matriz[x][y] = 2;
                j2.setTurno(false);
                j1.setTurno(true);
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

function verificaVictoria(x, y, tablero, jugador){
        let valorJugadorMatriz;
        if (jugador.nombre == "Jugador 1"){
            valorJugadorMatriz = 1;
        }else{
            valorJugadorMatriz = 2;
        }
        // Chequeamos si por alguna de las posibilidades gana
        if (  (checkHorizontales(parseInt(y), tablero, valorJugadorMatriz))){//{
            gano = true;
        }else if (checkVerticales(parseInt(x), tablero, valorJugadorMatriz)) {
            gano = true;
        }else if (checkDiagonales(x, y, tablero, valorJugadorMatriz)) {
            gano = true;
        }
        finalizoElJuego();
           // if (! {

           // }
        //}
        
        //||   ) {// || checkVerticales(parseInt(x), tablero, valorJugadorMatriz)){
             //|| checkVerticales(x, y, tablero, valorJugadorMatriz) ||  checkDiagonales(x, y, tablero, valorJugadorMatriz)){
           // gano = true;
            console.log('gano el jugador ', jugador.nombre, '? ', gano)
            // mostrar mensaje en html
        //}     
}

function checkHorizontales(y, tablero, valorJugadorMatriz){
    let cantFichasSeguidas = 0;
	let columna = 0;
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
            return true;        
        }
    }
    return false;    
}

function checkVerticales(x,tablero, valorJugadorMatriz){
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
        }
 	}
     return false;	
    
 }

 function checkDiagonales(x, y, tablero, valorJugadorMatriz){
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
    return false;
}

function finalizoElJuego(){
    if(timer.getContador() >= 1 && gano){
        timer.stop();
        pararJuego(j1);
        pararJuego(j2);
    }else if(timer.getContador() == 1){
        pararJuego(j1);
        pararJuego(j2);
    }
}
function pararJuego(jugador){
    for(let i = 0; i < jugador.getSize(); i++){
        jugador.fichas[i].setMovible(false); //saco evento a las fichas
    }
}
//document.getElementById('id del boton reset').addEventListener('click', reiniciarJuego);
function reiniciarJuego(){

}





