class Ficha {
    constructor(ancho, alto, src){
        this.ancho = ancho;
        this.alto = alto;
        this.src = src;
    }

    drawFicha(posX, posY, ctx){
        let img = new Image();
        img.src = this.src;
        img.onload = function(){
            ctx.drawImage(this, posX, posY);
        }
    }

    //getters y setters
    getAncho(){
        return this.ancho;
    }
    getAlto(){
        return this.alto;
    }
}