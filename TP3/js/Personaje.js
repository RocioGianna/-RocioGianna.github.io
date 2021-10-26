class Personaje{
    
    constructor(nombre){
        this.nombre = nombre;
        this.div = document.getElementById("character");
        this.class = this.div.classList.add("character");
        this.ancho = this.div.offsetWidth ; //habria que restale hasta donde llega el personaje porque la caja es mas grande que el personaje
        this.alto = this.div.offsetHeight; //habria que restale hasta donde llega el personaje porque la caja es mas grande que el personaje
        this.posicionX = this.div.offsetLeft; 
        this.posicionY = this.div.offsetTop; 
        this.vida = 100;
        this.puntaje = 1; 
    }  
    // Manejadores de clases de CSS (acciones del personaje)
    // Acción de salto
    jump(){
        character.classList.remove("character");
        character.classList.add("character-jump");
    }
    // Acción de caminar
    walk(){
        character.classList.remove("character-jump");   
        character.classList.add("character");
    }
    // Acción de muerte
    die(){ //esto va  a pasar cuando colisione con un enemigo y muera
        character.classList.remove("character");
        character.classList.add("character-die");
    }

    // GETTERS
    getVida(){
        return this.vida;
    }
    getVida(){
        return this.vida;
    }
    setVida(vida){
        this.vida = vida;
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
    // SETTERS
    setPosicionX(posicionX){
        this.posicionX = posicionX;
    }
    setPosicionY(posicionY){
        this.posicionY = posicionY;
    }
}