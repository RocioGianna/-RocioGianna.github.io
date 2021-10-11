// @ts-ignore
class Celda extends Elemento{ //Clase para la celda que corresponde al fondo del tablero
    constructor(ancho, alto, src){
        super(ancho, alto, src);
    }

    drawCelda(posX, posY, ctx){
        super.drawElemento(posX, posY, ctx);    
    }
    cargarCelda(posX, posY, ctx){
        super.cargarElemento(posX, posY, ctx);
    }
  
}