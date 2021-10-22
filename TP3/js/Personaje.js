class Personaje extends Item {
    constructor(tamanio, posicion, img){
        super(tamanio, posicion, img);
        this.vida = 100;
    }


    getVida(){
        return this.vida;
    }
    setVida(vida){
        this.vida = vida;
    }
}