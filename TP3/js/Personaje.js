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
        // @ts-ignore
        character.classList.remove("character");
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
    die(){ //esto va  a pasar cuando colisione con un enemigo y muera
        // @ts-ignore
        character.classList.remove("character");
        // @ts-ignore
        character.classList.add("character-die");
    }
    caer(){ //esto va a pasar cuando colisione con un enemigo y caiga
        
        // @ts-ignore
        character.classList.remove("character");
        // @ts-ignore
        character.classList.add("character-caida");
        // HACER DESAPECER LA PIEDRA
    }
    //quitarVida(vida){
      //  this.vidas -= vida;
    //}
    actualizarPuntaje(puntaje){
        this.puntaje += puntaje;
        let puntajeDisplay = document.getElementById("puntaje-jugador");
        puntajeDisplay.innerHTML = this.getPuntaje();
        //puntajeDisplay.innerHTML = this.getPuntaje();
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