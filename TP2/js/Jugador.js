class Jugador{
    constructor(cantFichas){
        this.fichas = [];
        this.cantFichas = cantFichas;
    }

    addFichaJugador(){
        for(let i =0; i < this.cantFichas; i++){
            this.fichas.push(new Ficha(40,40,"img/ficha.png")); //prueba para guardar las fichas
            this.fichas[i].drawFicha(10, 450, ctx); // hacer la x y la y dinamicas
            
            console.log(this.fichas[i].getPosition()); //obtenemos posicion inicial donde va a estar cada ficha 
        }
    }
    getSize(){
        return this.fichas.length;
    }
    getFichas(){
        return this.fichas;
    }
}