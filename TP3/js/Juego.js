// Clase principal del juego
let saltando = false;
class Juego{ 
    constructor(){
        this.personaje = new Personaje();
        this.obstaculo = new Obstaculo(); // 600 es el top
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
        return (new Gema(gema, left, top, valor)); // Agregamos la gema al arreglo de gemas y la instanciamos
        
    }  
    
    // Fin del juego
    endGame(){
     // Iría a mostrar endgame.html de alguna forma
        console.log('Fin del juego');
    }
}