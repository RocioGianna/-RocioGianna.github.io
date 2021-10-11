// @ts-ignore
class Ficha extends Elemento{ //Clase que da estructura a las fichas
    constructor(ancho, alto, src){
        super(ancho, alto, src);
        this.movible = true;
    }

    drawFicha(posX, posY, ctx){
        super.drawElemento(posX, posY, ctx);    
    }
    cargarFicha(posX, posY, ctx){
        super.cargarElemento(posX, posY, ctx);
    }
    
    isPonintInside(xUser, yUser){ // metodo para saber si una ficha es clickeada o no 
        return !(xUser < this.getX() || xUser > this.getX() + this.ancho || yUser < this.getY() || yUser > this.getY() + this.alto); 
    }; 

    isMovible(){
        return this.movible;
    }
    setMovible(bool){
        this.movible = bool;
    }
}