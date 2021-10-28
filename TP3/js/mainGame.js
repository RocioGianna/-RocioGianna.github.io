// Crear elementos del juego
// Creación del personaje
let Captain = new Personaje("Capitán America");

// Creación del juego
let juego = new Juego(Captain);
juego.initGame();

// GAME LOOP
let jugar = setInterval(function(){
    juego.acciones();
    juego.initGame();
}, 12000); // Sería el tiempo aprox que tardan las rocas y las gemas en avanzar de un extremo a otro



