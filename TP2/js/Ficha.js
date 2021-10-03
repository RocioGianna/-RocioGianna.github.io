class Ficha extends Elemento{
    constructor(ancho, alto, src){
        super(ancho, alto, src);
        this.movible = true;
    }

    drawFicha(posX, posY, ctx){
        super.drawElemento(posX, posY, ctx);    
    }
    
    isPonintInside(xUser, yUser){
        return !(xUser < this.getX() || xUser > this.getX() + this.ancho || yUser < this.getY() || yUser > this.getY() + this.alto); 
    }; 

    isMovible(){
        return this.movible;
    }
    setMovible(bool){
        this.movible = bool;
    }
}