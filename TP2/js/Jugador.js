class Jugador{

    constructor(cantFichas, topeXSup, topeXInf, topeYSup, topeYInf){ //
        this.fichas = [];
        this.cantFichasJugador = cantFichas;
         this.topeXSup = topeXSup;
         this.topeXInf = topeXInf;
         this.topeYSup = topeYSup;
         this.topeYInf = topeYInf;
    }
    
    addFichaJugador(){ //se encarga de agregar las fichas en el arreglo con su posicion incial random
        for(let i =0; i < this.cantFichasJugador; i++){
            let posRandomX = Math.floor((Math.random() * (this.topeXInf-this.topeXSup)) + this.topeXSup);
            let posRandomY = Math.floor((Math.random() * (this.topeYInf-this.topeYSup)) + this.topeYSup);
            this.fichas.push(new Ficha(40,40,"img/ficha.png")); //prueba para guardar las fichas
            this.fichas[i].setPosition(posRandomX, posRandomY);
        }  
    }

    getSize(){
        return this.fichas.length;
    }
    getFichas(){
        return this.fichas;
    }
}

