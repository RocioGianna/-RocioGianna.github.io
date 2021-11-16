// Clase principal del juego
let saltando = false;
class Juego{ 
    // Constructor
    constructor(){
        // @ts-ignore
        this.personaje = new Personaje();
        // @ts-ignore
        this.obstaculo = new Obstaculo(); 
        this.gema = this.addGems();
    }
    // Inicio del juego
    initGame(){
        this.acciones(); // se chequean las acciones del personaje
    }
    // Verifica colisión con obstáculo
    verificarColisionObstaculo(){ 
        return this.obstaculo.getColision(this.personaje);
    }
    // Verifica colisión con la gema
    verificarColisionGema(){ 
        return this.gema.getColision(this.personaje);
    }
    // Control de eventos para el salto
    acciones(){
        // Presión de tecla W
        document.addEventListener('keypress', (e)=>{
            if(e.key === 'w' && !saltando){
                this.personaje.jump();
                saltando = true;
            }
        });    
        // Levantar tecla
        document.addEventListener('keyup', (e)=>{
            this.personaje.walk();
        });  
    }

    // Agregar gemas
    addGems(){
        let top = 60;
        let left = 90;
        let names = ["spaceGem", "mindGem", "realityGem", "powerGem", "timeGem", "soulGem"]; // Gemas del infinito para agregar agregar 
        let puntajes = [100, 150, 200, 250, 300, 350];
        let random = Math.floor(Math.random() * names.length); // Selecciona una aleatoriamente (entre 0 y 5)
        let gema = names[random]; // El nombre de la gema va a corresponderse con la gema a mostrar
        let valor = puntajes[random];
        // @ts-ignore
        return (new Gema(gema, left, top, valor)); // Agregamos la gema al arreglo de gemas y la instanciamos  
    }  
    
    // Pierde el juego
    lossGame(){
        let paginaPrincipal = document.getElementById("main-page");
        let lossGame = document.getElementById("loss-game"); 
        // Dos segundos después de que muestre la animación de muerte, mostramos una "pantalla" indicando que perdió y le damos la opción de volver a jugar     
        setTimeout(()=> {
            paginaPrincipal.style.display = "none";
            lossGame.style.display = "block";  
        }, 2000);             
    }

    // Gana el juego 
    winGame(){  
        let ganoElJuego;     
        let paginaPrincipal = document.getElementById("main-page");
        let winGame = document.getElementById("win-game");
        let finalScore = document.getElementById("final-score"); 
        // Si ganó, mostramos una "pantalla" con los puntos obtenidos y la opción de volver a jugar      
        if (this.personaje.getPuntaje() >= 3000){
            paginaPrincipal.style.display = "none";
            winGame.style.display = "block";
            finalScore.innerHTML = "Conseguiste " + this.personaje.getPuntaje() + " puntos!";
            ganoElJuego = true;
        }else{
            ganoElJuego = false;
        }
        return ganoElJuego;
    }   
}    