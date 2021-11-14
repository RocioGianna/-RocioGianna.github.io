let caer = false; //variable que impide que tome mas de una vez la colision con el obstaculo
let tomarGema = false; //variable que impide que tome mas de una vez la colision con la gema
let juego = new Juego();
juego.initGame();

//loop para crear las gemas
let gemas = setInterval(function(){
    juego.gema.restaurar();
    juego.addGems();
}, 9800);


//GameLoop del juego
let chequear = setInterval(function(){
    
    //en primer lugar verificamos si el personaje colisiono con un obstaculo
    //si es asi, se chequea que el personaje tenga vidas. Si tiene vidas, se le resta una, y luego vulve a caminar
    if (juego.verificarColisionObstaculo() && !caer){  
        if (juego.personaje.getVida() > 0){
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
            //caso contrario si ya no tiene vidas, se detiene el juego
            //denetemos ambos intervalos y luego mostramos la animacion de morir
            clearInterval(chequear);
            clearInterval(gemas);
            juego.personaje.die();
            juego.endGame();
        }
    }

    //en segundo lugar verificamos si el personaje tomo una gema
    //si es asi, actrualizamos el puntaje del personaje y se aplica la transformacion de la gema
    if(juego.verificarColisionGema() && !tomarGema){
        juego.personaje.actualizarPuntaje(juego.gema.getPuntaje());
        juego.gema.transformar();
        tomarGema = true;
        setTimeout(function(){
            tomarGema = false;}
        , 1000);
    }

}, 300);











