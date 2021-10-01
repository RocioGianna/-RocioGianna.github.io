let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

const CANT_FICHAS = 21;
const OBJETIVO = 4;

let tablero = new Tablero(100,100, OBJETIVO ,ctx);
tablero.drawTablero();


//prueba para ver si funciona el arr en jugador (Funciona)
let j1topeXSup = 770;
let j1topeXInf = 870;
let j1topeYSup = 100;
let j1topeYInf = 300;
let j1 = new Jugador(CANT_FICHAS, j1topeXSup, j1topeXInf, j1topeYSup, j1topeYInf); //

j1.addFichaJugador();
console.log(j1.getFichas());

// let j2 = new Jugador(CANT_FICHAS);
// j2.addFichaJugador();
// console.log(j1.getFichas());



//prueba de eventos y ver si funciona isPointInside (Funciona)
c.addEventListener("mousedown", prueba);
//c.addEventListener("mouseup", prueba);
//c.addEventListener("mousemove", prueba);

function prueba(e){
    x = e.layerX;
    y = e.layerY;

    // esta parte es para todas las fichas
    // poder hacerlo para cada ficha en parcticular
    for(let i = 0; i < j1.getSize(); i++){
        //console.log(x, y);
       //console.log( j1.fichas[i].isPonintInside(x, y));
       if(j1.fichas[i].isPonintInside(x, y)){
           console.log("funciona");
           console.log(j1.fichas[i].getPosition());
           return j1.fichas[i].getPosition(); // devuelve la figura que clickeamos
       }
       
    }
    
}

function verDondeHagoClick(e){
    x = e.layerX;
    y = e.layerY;
    console.log(x,y);
}

document.addEventListener("click", verDondeHagoClick);