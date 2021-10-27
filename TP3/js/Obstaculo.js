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
    colision(x,y){
        // Verificamos si colisonan -> posiciones del personaje y de la colección o del obstáculo
        if(x>=this.posicionX && x<=this.posicionX+this.ancho && y>=this.posicionY && y<=this.posicionY+this.alto){
            return true;
        }
        else{
            return false;
        }
    }

}