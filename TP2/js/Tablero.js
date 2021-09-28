class Tablero {
    constructor(inicioX, inicioY, cantFichas, context){ 
        this.inicioX = inicioX; //posicion inicial de x para dibujar
        this.inicioY = inicioY; //posicion inicial de y para dibujar
        this.ctx = context;
        this.cantFichas = cantFichas; //objetivo que desea el usuario (4, 5..etc)
        this.ficha = new Ficha(80,80,"img/tablero.png"); //instancia de una ficha que va a representar el fondo del tablero
    }

    drawTablero(){
        let x = this.getX();
        let y = this.getY();
        let ancho = this.ficha.getAncho(); 
        let alto = this.ficha.getAlto();
        let matriz = [];

        for(let i = 0; i <this.cantFichas + 3; i++){ //+3 y +2 en los for son para que el tablero se ajuste dependiendo de la cantidad de fichas 
            matriz[i] = [];
            for(let j = 0; j < this.cantFichas + 2; j++){
                matriz[i][j] = this.ficha.src;
                this.ficha.drawFicha(x, y, ctx); //dibujo la ficha
                y = y + alto; //posicion final de la y se convierte en posicion inicial de la proxima ficha en y
            }
            y = this.getY(); //reseteo el valor de y a su valor inicial
            x = x + ancho; // posicion final de la x se convierte en posicion inicial de la proxima ficha en x
        }
    }

    //getters y setters 
    getX(){
        return this.inicioX;
    }
    getY(){
        return this.inicioY;
    }
    getAncho(){
        return this.ancho;
    }
    getAlto(){
        return this.alto;
    }
}

