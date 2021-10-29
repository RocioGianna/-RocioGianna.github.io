class Personaje{
    
    constructor(nombre){
        this.nombre = nombre;
        this.div = document.getElementById("character");
        this.class = this.div.classList.add("character");
        this.ancho = this.div.offsetWidth ; 
        this.alto = this.div.offsetHeight; 
        this.posicionX = this.div.getBoundingClientRect().left;
        this.posicionY = this.div.getBoundingClientRect().top;
        this.vidas = 3; //cantidad de vidas
        this.puntaje = 0; 
    }  
    // Manejadores de clases de CSS (acciones del personaje)
    // Acción de salto
    jump(){
        character.classList.remove("character");
        character.classList.add("character-jump");
    }
    // Acción de caminar
    walk(){
         if (character.className == "character-jump"){
             character.classList.remove("character-jump");
         }else{
            character.classList.remove("character-caer");
        } 
        character.classList.add("character");
    }
    // Acción de muerte
    die(){ //esto va  a pasar cuando colisione con un enemigo y muera
        character.classList.remove("character");
        character.classList.add("character-die");
    }
    caer(){ //esto va a pasar cuando colisione con un enemigo y caiga
        character.classList.remove("character");
        character.classList.add("character-caer");
    }
    quitarVida(vida){
        this.vidas -= vida;
    }
    sumarPuntaje(puntaje){
        this.puntaje += puntaje;
    }

    // GETTERS
    
    getVida(){
        return this.vidas;
    }
    setVida(vida){
        this.vidas = vida;
    }
    getAncho(){
        return this.ancho;
    }
    getAlto(){
        return this.alto;
    }
    getPosicionX(){
        return this.posicionX;
    }
    getPosicionY(){
        return this.posicionY;
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
   

}