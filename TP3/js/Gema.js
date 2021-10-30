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
    // if (personaje.getPosicionX() < elemento.getPosicionX() + elemento.getAncho() && 


    // personaje.getPosicionX() + personaje.getAncho() > elemento.getPosicionX() // left + ancho < left R
    // // | <-- ----> |
    // &&
    // personaje.getPosicionY() < elemento.getPosicionY() + elemento.getAlto() // top P < top + alto R
    // // acá sería si está agachado, no sé si tiene sentido -> el personaje siempre va a ser más alto
    // && personaje.getPosicionY() + personaje.getAlto() > elemento.getPosicionY()){ // top + alto personaje > top roca


    // console.log("primer if");
    console.log('esto es de la gema----');
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

    if(personaje.getPosicionX() < elemento.getPosicionX() + elemento.getAncho() &&
        personaje.getPosicionX() + personaje.getAncho() > elemento.getPosicionX() &&
        //| <-- ----> |
        personaje.getPosicionY() < elemento.getPosicionY() + elemento.getAlto() &&
        personaje.getPosicionY + personaje.getAlto() > elemento.getPosicionY()

    ){
        // console.log("primer if ", personaje.getPosicionX() < elemento.getPosicionX() + elemento.getAncho());
        // console.log("segundo if", personaje.getPosicionX() + personaje.getAncho() > elemento.getPosicionX());
        // console.log("tercer if", personaje.getPosicionY() + personaje.getAlto() > elemento.getPosicionY());
        console.log("come la gema");
        return true;
    }else{
        // console.log("primer if ", personaje.getPosicionX() < elemento.getPosicionX() + elemento.getAncho());
        // console.log("segundo if", personaje.getPosicionX() + personaje.getAncho() > elemento.getPosicionX());
        // console.log("tercer if", personaje.getPosicionY() + personaje.getAlto() > elemento.getPosicionY());
        //console.log('false');
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