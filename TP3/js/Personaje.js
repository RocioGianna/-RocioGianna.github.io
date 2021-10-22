class Personaje{
    
    constructor(nombre, ancho, alto, posicionX, posicionY, puntajeJugador){
        this.nombre = nombre;
        this.ancho = ancho;
        this.alto = alto;
        this.posicionX = posicionX;
        this.posicionY = posicionY;
    }  
    

    getVida(){
        return this.vida;
    }
    
    setVida(vida){
        this.vida = vida;
    }
}