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
    
    jump(){
        character.classList.remove("character");
        character.classList.add("character-jump");
    }
    walk(){
        character.classList.remove("character-jump");   
        character.classList.add("character");
    }
    die(){ //esto va  a pasar cuando colisione con un enemigo y muera
        character.classList.remove("character");
        character.classList.add("character-die");
    }

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
    setPosicionX(posicionX){
        this.posicionX = posicionX;
    }
    setPosicionY(posicionY){
        this.posicionY = posicionY;
    }
}