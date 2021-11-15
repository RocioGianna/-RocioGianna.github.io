// Clase principal del juego
let saltando = false;
class Juego{ 
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

    verificarColisionObstaculo(){ 
        return this.obstaculo.getColision(this.personaje);
    }
    verificarColisionGema(){ 
        return this.gema.getColision(this.personaje);
    }

    acciones(){
        document.addEventListener('keypress', (e)=>{
            if(e.key === 'w' && !saltando){
                this.personaje.jump();
                saltando = true;
            }
        });    

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
    
    lossGame(){
        let paginaPrincipal = document.getElementById("main-page");
        let lossGame = document.getElementById("loss-game");       
        console.log('Fin del juego');
        paginaPrincipal.style.display = "none";
        lossGame.style.display = "block";        
    }

    winGame(){       
        console.log('Ganó el juego');
        let paginaPrincipal = document.getElementById("main-page");
        let winGame = document.getElementById("win-game");
        let finalScore = document.getElementById("final-score");
        console.log("vidas: ", this.personaje.getVida());        
        if (this.personaje.getPuntaje() >= 100){
            console.log('ya ganó');
            paginaPrincipal.style.display = "none";
            winGame.style.display = "block";
            finalScore.innerHTML = "Conseguiste " + this.personaje.getPuntaje() + "puntos!";
            console.log("puntaje final: ", this.personaje.getPuntaje());
            clearInterval(chequear);
            clearInterval(gemas);
        }else{
            console.log('sigue con vidas y todavía no ganó');
        }
    }   
}    