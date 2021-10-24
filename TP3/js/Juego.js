class Juego{
    constructor(personaje, obstaculo){
        this.personaje = personaje;
        this.obstaculo = obstaculo;
        this.gemas = [];
    }

    initGame(){
        this.assignAndShowGems();
        this.acciones();
    }

    acciones(){
        document.addEventListener('keydown', (e)=>{
            console.log(e.keyCode);
            if(e.keyCode == 38){ 
                this.personaje.jump();      
            }
            if (this.obstaculo.colision(this.personaje.getAncho(), this.personaje.getAlto())){ //esto hay que verlo bien
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

    assignAndShowGems(){
        let top = 470;//fijo
        let left = 1300;//dinamico con el fondo
        
        this.gemas = ["spaceGem", "mindGem", "realityGem", "powerGem", "timeGem", "soulGem"];    
        //math random para que no se repitan las gemas
        let random = Math.floor(Math.random() * this.gemas.length);
        let gema = this.gemas[random];
        this.gemas.splice(random, 1);

        new Gema(gema, left, top);
    }         
    


    
  
}