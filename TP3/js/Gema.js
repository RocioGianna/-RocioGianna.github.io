class Gema{
    constructor(nombre, posicionX, posicionY, valor){ 
        this.nombre = nombre;
        this.div = document.getElementById("gema");
        this.ancho = this.div.offsetWidth;
        this.alto = this.div.offsetHeight;
        this.posicionX = this.div.style.left = posicionX + "%";
        this.posicionY = this.div.style.top = posicionY + "%";
        this.divImage = this.div.style.background = "url('img/" + this.nombre + ".png')  center";
        this.valor = valor;
    }  

    //metodo que chequea la colision entre el personaje y la gema
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

    //animacion de cuando obtenes una gema
    transformar(){
        this.div.style.transform = "scale(0)";
    }
    restaurar(){
        this.div.style.transform = "scale(1)";
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
    getPuntaje(){
        return this.valor;
    }

}