class Jugador{
    constructor(){
        this.fichas = [];
    }

    addFicha(){
        this.fichas.push(new Ficha(80,80,"ficha.png")); //prueba para guardar una ficha
    }
    getFichas(){
        return this.fichas;
    }
}