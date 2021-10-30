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
            console.log("main entra cer");
            juego.personaje.caer();
            console.log("se chocó caminando, se cae y vuelve a caminar porque tiene vidas");
            setTimeout(function()
                { juego.personaje.walk(); console.log("jaja")}
                
                , 1000);
        }
        
    }
}, 1000);





