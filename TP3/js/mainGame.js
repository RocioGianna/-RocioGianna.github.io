// Crear elementos del juego
// Creación del personaje
let Captain = new Personaje("Capitán America");

// Creación del juego
let juego = new Juego(Captain);
juego.initGame();
//juego.verificaColisiones(juego.obstaculo);

let chequear = setInterval(function(){
    juego.verificaColisiones(juego.obstaculo);
}, 100);

// GAME LOOP
let jugar = setInterval(function(){
    //juego.verificaColisiones(juego.obstaculo);
    //juego.acciones();
    juego.initGame();
}, 12000); // Sería el tiempo aprox que tardan las rocas y las gemas en avanzar de un extremo a otro

// function getCssProperty(elmId, property){
//     var elem = document.getElementById(elmId);
//     return window.getComputedStyle(elem,null).getPropertyValue(property);
//  }
//  // You could now get your value like
//  var left = getCssProperty("my-div", "left");



