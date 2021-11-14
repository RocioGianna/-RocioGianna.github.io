class Personaje{
    
    constructor(nombre){
        this.nombre = nombre;
        this.div = document.getElementById("character");
        this.class = this.div.classList.add("character");
        this.ancho = this.div.offsetWidth ; 
        this.alto = this.div.offsetHeight; 
        this.vidas = 0; //cantidad de vidas
        this.puntaje = 0; 
    }  
    
    // Acción de salto
    jump(){
        setTimeout(() => {
            this.div.classList.remove("character-jump");
        }, 1000);

        character.classList.add("character-jump");
    }
    // Acción de caminar
    walk(){
        if (character.className == "character-jump"){
            character.classList.remove("character-jump");
        }else{
            character.classList.remove("character-caida");
        } 

        character.classList.add("character");
    }
    // Acción de muerte
    die(){ 
        character.classList.remove("character");
        character.classList.add("character-die");
        setTimeout(() => {
            character.classList.remove("character-die");
            character.classList.add("character-endgame");
        }, 1000);
        setTimeout(() => {
            character.classList.remove("character-endgame");
        }, 2000);
    }
    caer(){ //esto va a pasar cuando colisione con un enemigo y caiga
        
        character.classList.remove("character");
        character.classList.add("character-caida");
    }

    actualizarPuntaje(puntaje){
        this.puntaje += puntaje;
        let puntajeDisplay = document.getElementById("puntuacion");
        puntajeDisplay.innerHTML += this.puntaje;
       
    }



    // GETTERS
    
    getVida(){
        return this.vidas;
    }
   
    getAncho(){ //le restamos 25 al div para encontrar la posicion exacta de la imagen que representa al personaje
        return this.ancho - 25;
    }
    getAlto(){
        return this.alto;
    }
    getPosicionX(){ //le sumamos 20 al div para encontrar la posicion exacta de la imagen que representa al personaje
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