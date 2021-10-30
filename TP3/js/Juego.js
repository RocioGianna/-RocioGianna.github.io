// Clase principal del juego
class Juego{ 
    // Constructor
    constructor(personaje){
        this.personaje = personaje;
        this.obstaculo = new Obstaculo("Piedra"); // 600 es el top
        this.gema = this.addGems();

    }

    // Inicio del juego
    initGame(){

        this.addGems(); // se agregan las gemas 
        this.acciones(); // se chequean las acciones del personaje

    }

    verificaColisiones(elemento){

        return elemento.getColision(this.personaje, elemento);
    }

     continuaJuego(){
        if (this.personaje.getVida() >= 1){ 

             this.personaje.vidas--;
             let vidas = document.getElementById("vida-personaje");
             vidas.innerHTML = this.personaje.vidas;

            return true;
         }else{
            this.personaje.die();
            this.verificarResultadoJuego();
         } 
     }

    

    // Acciones del teclado -> movimientos del personaje
    acciones(){




     

        document.addEventListener('keydown', (e)=>{
            if(e.keyCode == 38)// && (!this.verificaColisiones(this.obstaculo))){ 
                this.personaje.jump(); 
                if (this.verificaColisiones(this.obstaculo)){
                    this.personaje.caer();                    
                }else{

                    if (this.verificaColisiones(this.gema)){

                        this.personaje.actualizarPuntaje(this.gema.valor);
                        this.verificarResultadoJuego();
                    }
                }   

        });
        
         // SALTO -> KEYUP
        document.addEventListener('keyup', (e)=>{
            if(e.keyCode == 38)
                setTimeout(()=>{
                    this.personaje.walk(); 
                    if (this.verificaColisiones(this.obstaculo)){
                        this.personaje.caer();
                    }    
                }, 700); 

        })

        
        
    }

    addGems(){
        let top = 440;
        let left = 1200;
        let names = ["spaceGem", "mindGem", "realityGem", "powerGem", "timeGem", "soulGem"]; // Gemas del infinito para agregar agregar 
        let puntajes = [100, 150, 200, 250, 300, 350];

        
        let random = Math.floor(Math.random() * names.length); // Selecciona una aleatoriamente (entre 0 y 5)
        let gema = names[random]; // El nombre de la gema va a corresponderse con la gema a mostrar
        let valor = puntajes[random];
        return (new Gema(gema, left, top, valor)); // Agregamos la gema al arreglo de gemas y la instanciamos
        
    }  
    
    // Fin del juego
    verificarResultadoJuego(){
        // Iría a mostrar endgame.html de alguna forma
        let paginaPrincipal = document.getElementById("main-page");
        let lossGame = document.getElementById("loss-game");
        let winGame = document.getElementById("win-game");
        paginaPrincipal.style.display = "none";
        if (this.personaje.getVida() == 0){
            lossGame.style.display = "block";
        }else{
            if (this.personaje.getPuntaje() >= 3000){
                winGame.style.display = "block";
            }
        }       
        
    }
}