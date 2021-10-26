// Clase principal del juego
class Juego{ 
    // Constructor
    constructor(personaje){
        this.personaje = personaje;
        this.obstaculo = [];
        this.gemas = [];
    }

    // Inicio del juego
    initGame(){
        this.addGems(); // se agregan las gemas 
        this.acciones(); // se chequean las acciones del personaje
        this.addObstaculos(); // se agregan los obstáculos
    }

    // Acciones del teclado -> movimientos del personaje
    acciones(){
        document.addEventListener('keydown', (e)=>{
            console.log(e.keyCode);
            if(e.keyCode == 38){ 
                this.personaje.jump();      
            }
            console.log(this.obstaculo.colision(this.personaje.getPosicionX(), this.personaje.getPosicionY()));
            if (this.obstaculo.colision(this.personaje.getPosicionX(), this.personaje.getPosicionY())){ 
                this.personaje.die();
            }
        })
        
        
        document.addEventListener('keyup', (e)=>{
            if(e.keyCode == 38){ /* arrow up */ 
               this.personaje.walk();
            }
            // if (e.keyCode == 32){ //este seria para levantarse...
            //     character.classList.add("character");
            //     character.classList.remove("character-attack");
            // }
        })
        
    }

    // Agregar obstáculos
    addObstaculos(){
        for(let i = 0; i < 10; i++){
            let top = 600;
            let left = Math.floor(Math.random() * (1000 - 500) + 500);
            this.obstaculo.push(new Obstaculo(left, top));
        }
        //this.obstaculo.push(new Obstaculo(900, 570));
    }

    // Agregar gemas
    addGems(){
        let top = 570;//fijo
        let topGema = 470;
        let names = ["spaceGem", "mindGem", "realityGem", "powerGem", "timeGem", "soulGem"]; // Gemas del infinito para agregar agregar 

        for(let i = 0; i < 10; i++){
            let left = Math.floor(Math.random() * (1000 - 500) + 500);
            let random = Math.floor(Math.random() * names.length); // Selecciona una aleatoriamente (entre 0 y 5)
            let gema = names[random]; // El nombre de la gema va a corresponderse con la gema a mostrar
            this.gemas.push(new Gema(gema, left, topGema)); // Agregamos la gema al arreglo de gemas y la instanciamos
        }
        
        // this.gemas = ["spaceGem", "mindGem", "realityGem", "powerGem", "timeGem", "soulGem"];    
        // //math random para que no se repitan las gemas
        // let random = Math.floor(Math.random() * this.gemas.length);
        // let gema = this.gemas[random];
        // this.gemas.splice(random, 1);

        // new Gema(gema, left, top);
    }         
    


    
  
}