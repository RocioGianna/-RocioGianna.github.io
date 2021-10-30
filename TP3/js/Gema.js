// Clase que maneja el comportamiento del objeto a coleccionar
// En ese caso es una gema del infinito
class Gema{
    constructor(nombre, posicionX, posicionY, valor){ //constructor default de la clase gema
        this.nombre = nombre;
        this.div = document.getElementById("gema");
        this.ancho = this.div.offsetWidth;
        this.alto = this.div.offsetHeight;
        this.posicionX = this.div.style.left = posicionX + "px";
        this.posicionY = this.div.style.top = posicionY + "px";
        this.divImage = this.div.style.background = "url('img/" + this.nombre + ".png')  center";
        this.valor = valor;
    }  

 //funcion para detectar colision despues lo vemos
 getColision(personaje, elemento){
    

    if(personaje.getPosicionX() < elemento.getPosicionX() + elemento.getAncho() &&
        personaje.getPosicionX() + personaje.getAncho() > elemento.getPosicionX() &&
        //| <-- ----> |
        personaje.getPosicionY() < elemento.getPosicionY() + elemento.getAlto() &&
        personaje.getPosicionY() + personaje.getAlto() > elemento.getPosicionY()

    ){

        return true;
    }else{

        return false;
    }   
 }

    getNombre(){
        return this.nombre;
    }
    getAncho(){
        return this.ancho;
    }
    getAlto(){
        return this.alto;
    }
    getPosicionX(){
        return this.div.getBoundingClientRect().left;
    }
    getPosicionY(){
        return this.div.getBoundingClientRect().y;
    }

}