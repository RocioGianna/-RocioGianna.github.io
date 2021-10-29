class Personaje{
    
    constructor(nombre){
        this.nombre = nombre;
        this.div = document.getElementById("character");
        this.class = this.div.classList.add("character");
        this.ancho = this.div.offsetWidth ; //habria que restale hasta donde llega el personaje porque la caja es mas grande que el personaje
        this.alto = this.div.offsetHeight; //habria que restale hasta donde llega el personaje porque la caja es mas grande que el personaje
        this.posicionX = this.div.getBoundingClientRect().left;
        this.posicionY = this.div.getBoundingClientRect().top;
        this.vidas = 3; //es decir que tiene dos vidas (dos opotunidades para chocar) -> le puse 3 vidas
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
            character.classList.remove("character-die");
        }
        //character.classList.remove("character-die");  
        character.classList.add("character");
    }
    // Acción de muerte
    die(){ //esto va  a pasar cuando colisione con un enemigo y muera
        character.classList.remove("character");
        character.classList.add("character-die");
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