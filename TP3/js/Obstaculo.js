class Obstaculo {
    // Constructor
    constructor(){ 
        this.div = document.getElementById("obstaculo");
        this.ancho = this.div.offsetWidth;
        this.alto = this.div.offsetHeight;
        this.divImage = this.div.style.background = "url('img/piedrarodar.png') left center";
    }
       
    // Método que detecta la colision entre el personaje y el obstaculo
    getColision(personaje){
        if (personaje.getPosicionX() < this.getPosicionX() + this.getAncho() && 
            personaje.getPosicionX() + personaje.getAncho() > this.getPosicionX() &&
            personaje.getPosicionY() < this.getPosicionY() + this.getAlto() &&             
            personaje.getPosicionY() + personaje.getAlto() > this.getPosicionY()){ 
            return true;
        }else{
            return false;
        }
    }

    // GETTERS
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
        return this.div.getBoundingClientRect().top;
    }
}