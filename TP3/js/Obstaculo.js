// Clase para manejar el comportamiento del obstáculo a esquivar
class Obstaculo {
    // Constructor
    constructor(nombre){ 
        this.div = document.getElementById("obstaculo");
        this.nombre = nombre;
        this.ancho = this.div.offsetWidth;
        this.alto = this.div.offsetHeight;
        this.divImage = this.div.style.background = "url('img/piedrap.png') left center";
        this.danio = 50;
    }
    
    // Detecta las colisiones entre el personaje y el obstáculo o el objeto a coleccionar
    getColision(personaje, elemento){
        

        if ((personaje.getPosicionX()+35) < elemento.getPosicionX() + elemento.getAncho() && 


            (personaje.getPosicionX()+35) + (personaje.getAncho()+35) > elemento.getPosicionX() // left + ancho < left R
            // | <-- ----> |
            &&
            personaje.getPosicionY() < elemento.getPosicionY() + elemento.getAlto()// top P < top + alto R
            // acá sería si está agachado, no sé si tiene sentido -> el personaje siempre va a ser más alto
            && personaje.getPosicionY() + (personaje.getAlto()-30) > elemento.getPosicionY()){ // top + alto personaje > top roca

                console.log("murio");
                return true;
            }else{
 
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
        return this.div.getBoundingClientRect().left;
    }
    getPosicionY(){
        return this.div.getBoundingClientRect().y;
    }

    getNombre(){
        return this.nombre;
    }

}