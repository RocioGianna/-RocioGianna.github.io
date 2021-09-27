class Ficha{
    constructor(ancho, alto, context){
        this.ancho = ancho;
        this.alto = alto;
        this.ctx = context;        
    }

    cargarImagen(){
        this.onload = function(){
        let ficha = new Image();
        ficha.src = "img/tablero.png";
        }             
    }
}