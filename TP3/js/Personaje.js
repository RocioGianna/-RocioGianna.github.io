class Personaje{ 
    constructor(){
        this.div = document.getElementById("character");
        this.class = this.div.classList.add("character");
        this.ancho = this.div.offsetWidth ; 
        this.alto = this.div.offsetHeight; 
        this.vidas = 3; 
        this.puntaje = 0; 
    }  
    
    // Acción de salto
    jump(){
        setTimeout(() => {
            this.div.classList.remove("character-jump");
            // @ts-ignore
            saltando = false;
        }, 1000);
            // @ts-ignore
            character.classList.add("character-jump");
    }
    // Acción de caminar
    walk(){
        // @ts-ignore
        if (character.className == "character-jump"){
            // @ts-ignore
            character.classList.remove("character-jump");
        }else{
            // @ts-ignore
            character.classList.remove("character-caida");
        } 

        // @ts-ignore
        character.classList.add("character");
    }
    // Acción de muerte
    die(){ 
        // @ts-ignore
        character.classList.remove("character");
        // @ts-ignore
        character.classList.add("character-die");
        setTimeout(() => {
            // @ts-ignore
            character.classList.remove("character-die");
            // @ts-ignore
            character.classList.add("character-endgame");
        }, 1000);
        setTimeout(() => {
            // @ts-ignore
            character.classList.remove("character-endgame");
        }, 2000);
    }

    caer(){ //esto va a pasar cuando colisione con una piedra y se va a caer el personaje -> keyframe de caída.        
        // @ts-ignore
        character.classList.remove("character");
        // @ts-ignore
        character.classList.add("character-caida");
    }

    // Actualizar puntaje del juego
    actualizarPuntaje(puntaje){
        this.puntaje += puntaje;
        let puntajeDisplay = document.getElementById("puntaje-jugador");
        // @ts-ignore
        puntajeDisplay.innerHTML = this.getPuntaje();       
    }


    // GETTERS    
    getVida(){
        return this.vidas;
    }
   
    getAncho(){ //le restamos 25 al div para encontrar la posicion exacta de la imagen que representa al personaje para calcular bien la colision
        return this.ancho - 25;
    }
    getAlto(){
        return this.alto;
    }
    getPosicionX(){ //le sumamos 20 al div para encontrar la posicion exacta de la imagen que representa al personaje  para calcular bien la colision
        return this.div.offsetLeft + 20;
    }
    getPosicionY(){
        return this.div.getBoundingClientRect().y;
    }
    getPuntaje(){
        return this.puntaje;
    }

    // SETTERS
    setPosicionX(posicionX){
        this.posicionX = posicionX;
    }
    setPosicionY(posicionY){
        this.posicionY = posicionY;
    }
    setVida(vida){
        this.vidas = vida;
    }  

}