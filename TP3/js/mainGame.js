// Crear elementos del juego
// Creación del personaje
let Captain = new Personaje("Capitán America");

// Creación del juego
let juego = new Juego(Captain);
juego.initGame();
//juego.verificaColisiones(juego.obstaculo);

let chequear = setInterval(function(){
    if (juego.verificaColisiones(juego.obstaculo)){
        if (juego.continuaJuego()){

            juego.personaje.caer();

            setTimeout(function()
                { juego.personaje.walk(); }
                
                , 1000);
        }
        
    }
}, 1000);





