// Clase para manejar el comportamiento del obstáculo a esquivar
class Obstaculo {
    // Constructor
    constructor(){ 
        this.div = document.getElementById("obstaculo");
        this.ancho = this.div.offsetWidth;
        this.alto = this.div.offsetHeight;
        //this.posicionX = window.getComputedStyle(this.div,null).getPropertyValue("left");
        //this.posicionX = this.div.getBoundingClientRect().left;
        //this.posicionX = this.div.style.left = 1500 + "´x";
        //this.posicionY = this.div.getBoundingClientRect().top;
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
        //console.log("mi div style: ", this.div.offsetLeft);
        //console.log("mi div style: ", this.div.offsetLeft);
        //console.log("posX", this.getPosicionX());
        //console.log("posY",elemento.getPosicionY());
        //console.log("ancho",elemento.getAncho());
        //console.log("alto",elemento.getAlto());
        //console.log('LEFT get bounding.. ', this.div.getBoundingClientRect().left);
        // EL LEFT NO VARÍA............... POR QUÉ?
       
        // falta intentar esta parte
        console.log("primer if");
        console.log("personaje left", personaje.getPosicionX());
        console.log("----");
        console.log("elemento left", elemento.getPosicionX());
        console.log("elemento ancho", elemento.getAncho());
        console.log("elemento left + ancho", elemento.getPosicionX() + elemento.getAncho());
        console.log("segundo if");
        console.log("personaje left", personaje.getPosicionX());
        console.log("personaje ancho", personaje.getAncho());
        console.log("----");
        console.log("personaje left + ancho", personaje.getPosicionX() + personaje.getAncho());
        console.log("elemento left", elemento.getPosicionX());
        console.log("tercer if");
       
        console.log("personaje top + alto", personaje.getPosicionY() + personaje.getAlto());
        console.log("elemento top", elemento.getPosicionY());

        if (personaje.getPosicionX() < elemento.getPosicionX() + elemento.getAncho() && 


            personaje.getPosicionX() + personaje.getAncho() > elemento.getPosicionX() // left + ancho < left R
            // | <-- ----> |
            //&&
            //personaje.getPosicionY() < elemento.getPosicionY() + elemento.getAlto() // top P < top + alto R
            // acá sería si está agachado, no sé si tiene sentido -> el personaje siempre va a ser más alto
            && personaje.getPosicionY() + personaje.getAlto() > elemento.getPosicionY()){ // top + alto personaje > top roca
                console.log("primer if ", personaje.getPosicionX() < elemento.getPosicionX() + elemento.getAncho());
                console.log("segundo if", personaje.getPosicionX() + personaje.getAncho() > elemento.getPosicionX());
                console.log("tercer if", personaje.getPosicionY() + personaje.getAlto() > elemento.getPosicionY());
                console.log("true");
                //return true;
            }else{
                console.log("primer if ", personaje.getPosicionX() < elemento.getPosicionX() + elemento.getAncho());
                console.log("segundo if", personaje.getPosicionX() + personaje.getAncho() > elemento.getPosicionX());
                console.log("tercer if", personaje.getPosicionY() + personaje.getAlto() > elemento.getPosicionY());
                console.log('false');
                //return false;
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

}