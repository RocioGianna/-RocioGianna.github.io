
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

const CANT_FICHAS = 4;

import Ficha from 'js/Ficha.js';

function cargarTablero(){
    let prueba = new Ficha(80, 80, ctx);
    prueba.cargarImagen();

    //230, 40 medidas donde comienza el primer bloque del tablero 
    //poner constantes para la posicion del tablero 230, 40
    let t1 = new Tablero(230, 40, CANT_FICHAS, ctx, prueba);
    t1.draw();
}

cargarTablero();



// ficha.onload = function(){

//     t1.draw();
//     // para ver cómo nos movemos.......
//     c.addEventListener("mouseup", function(e){
    
//         console.log(e.clientX - c.offsetLeft + " soy sin resta " + e.clientX);
//     //     if (e.clientX - c.offsetLeft )
//     //    ctx.drawImage(ficha,e.clientX - c.offsetLeft - (40 / 2), e.clientY - c.offsetTop - (40 / 2));
//     })


