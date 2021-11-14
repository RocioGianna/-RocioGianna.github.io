
//Clase que maneja el gameloop

let Captain = new Personaje("Capitán America");

let juego = new Juego(Captain);
juego.initGame();
let caer = false;
let tomarGema = false;

let gemas = setInterval(function(){
    juego.gema.restaurar();
    juego.addGems();
}, 9800);

let chequear = setInterval(function(){
    
    if (juego.verificarColisionObstaculo() && !caer){
        if (juego.personaje.getVida() > 0){
            console.log("entro al if " + juego.personaje.getVida());
            juego.personaje.caer();
            caer = true;
            juego.personaje.setVida(juego.personaje.getVida() - 1);
            let vidas = document.getElementById("vida-personaje");
            vidas.innerHTML = juego.personaje.getVida();
            setTimeout(function() {
                juego.personaje.walk(); 
                caer = false;}
            , 1000);
        } else {
            clearInterval(chequear);
            clearInterval(gemas);
            juego.personaje.die();
            juego.endGame();
        }
    }

    if(juego.verificarColisionGema() && !tomarGema){
        console.log(juego.gema.getPuntaje());
        juego.personaje.actualizarPuntaje(juego.gema.getPuntaje());
        juego.gema.transformar();
        tomarGema = true;
        setTimeout(function(){
            tomarGema = false;}
        , 1000);
    }

}, 300);



//CUANDO TERMINA EL JUEGO TERMINAR EL INTERVALO












// GAME LOOP
// let jugar = setInterval(function(){
//     //juego.verificaColisiones(juego.obstaculo);
//     //juego.acciones();
//     juego.initGame();
// }, 12000); // Sería el tiempo aprox que tardan las rocas y las gemas en avanzar de un extremo a otro

// function getCssProperty(elmId, property){
//     var elem = document.getElementById(elmId);
//     return window.getComputedStyle(elem,null).getPropertyValue(property);
//  }
//  // You could now get your value like
//  var left = getCssProperty("my-div", "left");



