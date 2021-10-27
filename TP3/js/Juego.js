// Clase principal del juego
class Juego{ 
    // Constructor
    constructor(personaje){
        this.personaje = personaje;
        this.obstaculo = [];
        this.gemas = [];
        this.limite;
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
                setTimeout(()=>{
                    this.personaje.walk(); 
                }, 720);
                
            }
        })
        
    }

    // Agregar obstáculos
    addObstaculos(){
        for(let i = 0; i < 10; i++){
            let top =  600;
            let left = 1200;
            this.obstaculo.push(new Obstaculo(left, top));
        }
    }

    // Agregar gemas
    addGems(){
        let top = 440;
        let left = 1200;
        let names = ["spaceGem", "mindGem", "realityGem", "powerGem", "timeGem", "soulGem"]; // Gemas del infinito para agregar agregar 
        let puntajes = [100, 150, 200, 250, 300, 350];

        for(let i = 0; i < 10; i++){ // Creamos 10 gemas
            let random = Math.floor(Math.random() * names.length); // Selecciona una aleatoriamente (entre 0 y 5)
            let gema = names[random]; // El nombre de la gema va a corresponderse con la gema a mostrar
            let valor = puntajes[random];
            this.gemas.push(new Gema(gema, left, top, valor)); // Agregamos la gema al arreglo de gemas y la instanciamos
        }
    }         
    


    
  
}