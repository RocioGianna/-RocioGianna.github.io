class Ficha {
    constructor(ancho, alto, src){
        this.ancho = ancho;
        this.alto = alto;
        this.src = src;
        this.x = 0;
        this.y = 0;
    }

    drawFicha(posX, posY, ctx){
        this.setPosition(posX, posY);
        let img = new Image();
        img.src = this.src;
        img.onload = function(){
            ctx.drawImage(this, posX, posY);
        }
    }
    isPonintInside(xUser, yUser){
        return !(xUser < this.x || xUser > this.x + this.ancho || yUser < this.y || yUser > this.y + this.alto); // formula que usa Javi en el video
    }; 

    //getters y setters
    getAncho(){
        return this.ancho;
    }
    getAlto(){
        return this.alto;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getPosition(){
        return {
            x: this.getX(),
            y: this.getY()
        }
    }
    setPosition(posX, posY){
        this.x = posX;
        this.y = posY;
    }
}