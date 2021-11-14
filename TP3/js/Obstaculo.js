class Obstaculo {
    constructor(nombre){ 
        this.div = document.getElementById("obstaculo");
        this.nombre = nombre;
        this.ancho = this.div.offsetWidth;
        this.alto = this.div.offsetHeight;
        this.divImage = this.div.style.background = "url('img/piedrap.png') left center";
        this.danio = 50;
    }

    
    
    // Detecta las colisiones entre el personaje y el obstáculo o el objeto a coleccionar
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

    getNombre(){
        return this.nombre;
    }

}