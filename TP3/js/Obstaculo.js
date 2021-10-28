// Clase para manejar el comportamiento del obstáculo a esquivar
class Obstaculo {
    // Constructor
    constructor(posicionX, posicionY){ 
        this.div = document.getElementById("obstaculo");
        this.ancho = this.div.offsetWidth;
        this.alto = this.div.offsetHeight;
        this.posicionX = this.div.style.left = posicionX + "px";
        this.posicionY = this.div.style.top = posicionY + "px";
        this.divImage = this.div.style.background = "url('img/piedra.png') left center";
        this.danio = 50;
        //this.trasnformation = this.
        // Definirle una transformación por defecto para que además se mueva
    }

    
    // Detecta las colisiones entre el personaje y el obstáculo o el objeto a coleccionar
    getColision(personaje, elemento){
        // Verificamos si colisonan -> posiciones del personaje y de la colección o del obstáculo
        // if(x>=this.posicionX && x<=this.posicionX+this.ancho && y>=this.posicionY && y<=this.posicionY+this.alto){
        //     return true;
        // }
        // else{
        //     return false;
        // }

       // let personaje; // personaje
        //let elemento; // gema/bostáculo
        console.log("personaje:", personaje);
        //console.log("elemento", elemento);
        console.log("posX", elemento.getPosicionX());
        //console.log("posY",elemento.getPosicionY());
        //console.log("ancho",elemento.getAncho());
        //console.log("alto",elemento.getAlto());
        console.log('LEFT get bounding.. ', this.div.getBoundingClientRect().left);
        // EL LEFT NO VARÍA............... POR QUÉ?
       
        // falta intentar esta parte
        if (personaje.getPosicionX() < elemento.getPosicionX() + elemento.getAncho()  && personaje.getPosicionX() + personaje.getAncho() > elemento.getPosicionX() &&
            personaje.getPosicionY() < elemento.getPosicionY() + elemento.getAlto() && personaje.getPosicionY() + personaje.getAlto() > elemento.getPosicionY()){
                console.log("true");
                return true;
            }else{
                console.log('false');
                return false;
            }
        
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

}