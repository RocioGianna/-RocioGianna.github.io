
let empezoElJuego;
let fondo;

let backgroundCity = document.getElementById("parallax-city");
let backgroundMoon = document.getElementById("parallax-moon");

// Mostrar configuración de fondo (Parallax)  
function elegirFondo(){
    let btnParallax = document.getElementById("go-to-settings");
    btnParallax.addEventListener("click", showSettings);

    function showSettings(){
        let indications = document.getElementById("indications");
        let settings = document.getElementById("settings");
        indications.style.display = "none";
        settings.style.display = "block";   
    }

    // Selección de fondo

    let chooseBackGround = document.getElementById("chooseBackGround");
    chooseBackGround.addEventListener("click", chooseBackgroundGame);

    

    function chooseBackgroundGame(){
        // @ts-ignore
        let chosenWallpapper = document.getElementById("select-wallpaper").value;  
        let vistaPrevia = document.getElementById("vista-previa");  
        let parallax = document.getElementById("parallax"); 
        let goToPlay = document.getElementById("go-to-play");
        let parallaxCity = "img/parallax-2.png";
        let parallaxMoon = "img/parallax-1.png";       
        // Mostrar vista previa desde el select
        switch (chosenWallpapper) {
            // @ts-ignore
            case "city":
                // @ts-ignore
                parallax.src = parallaxCity;
                // @ts-ignore
                fondo = "city";
                break;
            // @ts-ignore
            case "moon":  
                // @ts-ignore
                parallax.src = parallaxMoon;
                fondo = "moon";
                break;
        }
        vistaPrevia.style.display = "block";
        goToPlay.style.display = "block";    
    }  

}
// Ejecuta la elección de fondo (eventos)
elegirFondo();

// MAIN GAME

let playGame = document.getElementById("play-game");
playGame.addEventListener("click", jugar);

// Jugar -> Game Loop

function jugar(){
    // Oculta div de indicaciones
    let nuevasdIndicaciones = document.getElementById("nuevas-indicaciones");
    nuevasdIndicaciones.style.display = "none";
    let divJuego = document.getElementById("game");
    divJuego.style.display = "block";
    if (fondo === "city") {
        backgroundCity.style.display = "block";
        empezoElJuego = true;
    } else if (fondo === "moon") {
        backgroundMoon.style.display = "block";
        empezoElJuego = true;
    }
    // Actualiza con el fondo elegido
    let caer = false; //variable que impide que tome mas de una vez la colision con el obstaculo
    let tomarGema = false; //variable que impide que tome mas de una vez la colision con la gema
    // @ts-ignore
    let juego = new Juego();
    juego.initGame();
    // Loop para crear las gemas
    let gemas = setInterval(function () {
        juego.gema.restaurar();
        juego.addGems();
    }, 9800);

    //GameLoop del juego
    let chequear = setInterval(function () {
        // En primer lugar verificamos si el personaje colisiono con un obstáculo
        // De ser asi, se chequea que el personaje tenga vidas. Si tiene vidas, se le resta una, y luego vuelve a caminar
        if (juego.verificarColisionObstaculo() && !caer) {
            if (juego.personaje.getVida() > 0) {
                juego.personaje.caer();
                caer = true;
                juego.personaje.setVida(juego.personaje.getVida() - 1);
                let vidas = document.getElementById("vida-personaje");
                // @ts-ignore
                vidas.innerHTML = juego.personaje.getVida();
                setTimeout(function () {
                    juego.personaje.walk();
                    caer = false;
                }, 1000);
            } else {
                // Caso contrario si ya no tiene vidas, se detiene el juego.
                // Detenemos ambos intervalos y luego mostramos la animación de morir.
                clearInterval(chequear);
                clearInterval(gemas);
                juego.personaje.die();
                juego.lossGame();
            }
        } else {
            if (juego.winGame()) {
                // Si ganó, cerramos los intervalos
                clearInterval(chequear);
                clearInterval(gemas);
            }

        }
        // En segundo lugar verificamos si el personaje tomo una gema
        // De ser asi, actualizamos el puntaje del personaje y se aplica la transformación de la gema
        if (juego.verificarColisionGema() && !tomarGema) {
            juego.personaje.actualizarPuntaje(juego.gema.getPuntaje());
            juego.gema.transformar();
            tomarGema = true;
            setTimeout(function () {
                tomarGema = false;
            }, 1000);
        }
    }, 300);
}
    
    




    

















