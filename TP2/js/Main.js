let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

const CANT_FICHAS = 4;

let tablero = new Tablero(0,0,CANT_FICHAS,ctx);
tablero.drawTablero();


//prueba para ver si funciona el arr en jugador (Funciona)
// let j1 = new Jugador();
// j1.addFicha();
// console.log(j1.getFichas())
