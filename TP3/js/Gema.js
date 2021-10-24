class Gema{
    constructor(nombre, posicionX, posicionY){ //constructor default de la clase gema
        this.nombre = nombre;
        this.div = document.getElementById("gema");
        this.ancho = this.div.offsetWidth;
        this.alto = this.div.offsetHeight;
        this.posicionX = this.div.style.left = posicionX + "px";
        this.posicionY = this.div.style.top = posicionY + "px";
        this.divImage = this.div.style.background = "url('img/" + this.nombre + ".png') left center";
    }  

 //funcion para detectar colision despues lo vemos
    colision(x,y){
        if(x>=this.posicionX && x<=this.posicionX+this.ancho && y>=this.posicionY && y<=this.posicionY+this.alto){
            return true;
        }
        else{
            return false;
        }
    }
}