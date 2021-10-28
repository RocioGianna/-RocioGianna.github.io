// Clase principal del juego
class Juego{ 
    // Constructor
    constructor(personaje){
        this.personaje = personaje;
        this.obstaculo = [];
        this.gemas = [];
        //this.limite;
    }

    // Inicio del juego
    initGame(){
        //console.log("estaJugando? ", estaJugando);
        this.addGems(); // se agregan las gemas 
        this.acciones(); // se chequean las acciones del personaje
        this.addObstaculos(); // se agregan los obstáculos
    }

    //verificaColisiones(elemento){
    //    console.log(elemento.getColision(this.personaje.getPosicionX(), this.personaje.getPosicionY()));
    //    return elemento.getColision(this.personaje.getPosicionX(), this.personaje.getPosicionY());
    //}

    // Acciones del teclado -> movimientos del personaje
    acciones(){
        // Siempre verificamos la colisión con la roca porque se la puede chocar sin saltar (simplemente caminando) 
        // for (let i=0; i < this.obstaculo.length; i++){
        //     this.verificaColisiones(this.obstaculo[i]);                
        // }       
        // this.verificaColisiones();
        // SALTO -> KEYDOWN
        document.addEventListener('keydown', (e)=>{
            if(e.keyCode == 38){ 
                this.personaje.jump(); 
            }
            
            // COLISIÓN CON LA GEMA (RECOLECTA LA GEMA)
            // acá sería con LA GEMA QUE SE ESTÁ MOSTRANDO -> PREGUTNARLE A ROCÍO CÓMO VER ESTO  



            // COLISIÓN CON LA ROCA -> PIERDE UNA VIDA (O.. PIERDE EL JUEGO)
            // acá sería con EL OBSTÁCULO QUE SE ESTÁ MOSTRANDO -> PREGUTNARLE A ROCÍO CÓMO VER ESTO            
            // if (this.obstaculo.getColision(this.personaje.getPosicionX(), this.personaje.getPosicionY())){ 
            //     this.personaje.die();
            //     if (this.personaje.vidas > 1){ // si todavía tiene vidas, le descontamos
            //         this.personaje.quitarVida();
            //     }else{
            //         this.endGame(); // finaliza el juego
            //     }                
            // }
        })
        
         // SALTO -> KEYUP
        document.addEventListener('keyup', (e)=>{
            if(e.keyCode == 38){ /* arrow up */ 
                setTimeout(()=>{
                    this.personaje.walk(); 
                }, 720);
                
            }
        })

        
        // Prueba para morirse
        // Asigno una tecla rándom
        document.addEventListener('keydown', (e)=>{
            if(e.keyCode == 17){ /* arrow up */ 
                console.log(e.keyCode);
                // setTimeout(()=>{
                     this.personaje.die(); 
                // }, 720);
                
            }
        })
        document.addEventListener('keyup', (e)=>{
            if(e.keyCode == 17){ /* arrow up */ 
                console.log('levanta ctrl');
                setTimeout(()=>{
                    console.log('vuelve a caminar');
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
    
    // Fin del juego
    endGame(){
        // Iría a mostrar endgame.html de alguna forma
        console.log('Fin del juego');
    }
}