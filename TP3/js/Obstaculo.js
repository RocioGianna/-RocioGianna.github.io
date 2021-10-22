class Obstaculo extends Item {
    constructor(tamanio, posicion, img){
        super(tamanio, posicion, img);
    }

    
    getTamanio(){
        return this.tamanio;
    }   
    setTamanio(tamanio){    
        this.tamanio = tamanio;
    }
    getPosicion(){
        return this.posicion;
    }
    setPosicion(posicion){
        this.posicion = posicion;
    }
    getImg(){
        return this.img;
    }
    setImg(img){
        this.img = img;
    }

}