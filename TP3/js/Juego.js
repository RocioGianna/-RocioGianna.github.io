class Juego{
    constructor(personaje, obstaculo){
        this.personaje = personaje;
        this.obstaculo = obstaculo;
        this.gemas = [];
    }

    // Metodo que inicializa el juego       
    // iniciar(){
    //     // Se crea el personaje
    //     let Captain = new Personaje("Capitán America", 117, 212, );
    //     // Se crea el obstaculo
    //     this.Obstaculo.crear();
    //     // Se crea la gema
    //     this.Gema.crear();
    //     // Se crea el puntaje
    //     this.puntaje.crear();
    //     // Se crea el movimiento del personaje
    //     this.movimiento();
    // }

    initGame(){
        this.assignAndShowGems();
    }

    assignAndShowGems(){
        let spaceGem = new Gema("spaceGem", 334, 100, 0, 0);
        let mindGem = new Gema("mindGem", 332, 96, 0, 0);
        let realityGem = new Gema("realityGem", 336, 100, 0, 0);
        let powerGem = new Gema("powerGem", 338, 95, 0, 0);
        let timeGem = new Gema("timeGem", 335, 97, 0, 0);
        let soulGem = new Gema("soulGem", 334, 97, 0, 0);
        this.gemas = [spaceGem, mindGem, realityGem, powerGem, timeGem, soulGem]; 
        let posicion = Math.floor(Math.random() * (5 - 0) + 0);
        let divGema = document.getElementById("gemaAMostrar");
        let gemaQueSeMuestra = "url('img/" + this.gemas[posicion].nombre + ".png') left center";
        divGema.style.background = gemaQueSeMuestra;    
        console.log("background solo " + divGema.getAttribute(background));  
    }         
    

}