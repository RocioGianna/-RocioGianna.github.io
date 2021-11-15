// Mostrar configuración de fondo (Parallax)  
import { getValue, setValue } from './Background.js';

let fondo = getValue();
console.log(fondo);

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

//let fondo;

function chooseBackgroundGame(){
    // @ts-ignore
    let chosenWallpapper = document.getElementById("select-wallpaper").value;  
    let vistaPrevia = document.getElementById("vista-previa");  
    let parallax = document.getElementById("parallax"); 
    let goToPlay = document.getElementById("go-to-play");
    let parallaxCity = "img/parallax-2.png";
    let parallaxMoon = "img/parallax-1.png";
    

    // Mostrar vista previa desde el select
    //Nombre-fondo-1
    switch (chosenWallpapper) {
        // @ts-ignore
        case "city":
            // @ts-ignore
            parallax.src = parallaxCity;
            console.log("elije city");
            //FondoAElegir.setValue("city");
            // @ts-ignore
            fondo = setValue("city");
            fondo = getValue();
            console.log(fondo);
            //console.log(Fondo);
            //fondo = "city";
            break;
        // @ts-ignore
        case "moon":  
            // @ts-ignore
            parallax.src = parallaxMoon;
            console.log("elije moon");
            // @ts-ignore
            fondo = setValue("moon");
            fondo = getValue();
            //console.log(Fondo);
            ///Fondo = "moon";
            //console.log(Fondo);
            //fondo = "moon";
            break;
    }
    console.log("fondo indications: ", fondo);
    //console.log(fondo);
    vistaPrevia.style.display = "block";
    goToPlay.style.display = "block";    
}

// let playGameCap = document.getElementById("play-game");
// playGameCap.addEventListener("click", playGame);

// function playGame(){
//     let indicaciones = document.getElementById("indicaciones-juego");
//     indicaciones.style.display = "none";
//     gameBackground = Fondo.getValue();
//     let juego = document.getElementById("game-capitan");
//     juego.style.display = "block";
//     console.log("gamebackground:", gameBackground);

//     let backgroundCity = document.getElementById("parallax-city");
//     let backgroundMoon = document.getElementById("parallax-moon");

//     if (gameBackground === "city"){
//         backgroundCity.style.display = "block";
//     }else{
//         backgroundMoon.style.display = "block";
//     }
//     //aa();
//     // @ts-ignore
//     //let newGame = new Juego();
//     //newGame.initGame();
// }

//export function background(){
    //return FondoAElegir.getValue();
//}



