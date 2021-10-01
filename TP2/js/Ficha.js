class Ficha extends Elemento{
    constructor(ancho, alto, src){
        super(ancho, alto, src);
    }

    drawFicha(posX, posY, ctx){
        super.drawElemento(posX, posY, ctx);    
    }
    
    isPonintInside(xUser, yUser){
        return !(xUser < this.getX() || xUser > this.getX() + this.ancho || yUser < this.getY() || yUser > this.getY() + this.alto); // formula que usa Javi en el video
    }; 

   

    // Seleccionamos una ficha con el click
    // La empezamos a mover -> va a borrar nuestra región de las fichas (clearFichasRegion algo así)

    
}