class Item{
    constructor(tamanio, posicion, img){
        this.tamanio = tamanio;
        this.posicion = posicion;
        this.img = img;
    }
    
    
    getTamanio(){
        return this.tamanio;
    }   
    getPosicion(){        
        return this.posicion;
    }
    getImg(){     
        return this.img;
    }
    setTamanio(tamanio){    
        this.tamanio = tamanio;
    }
    setPosicion(posicion){
        this.posicion = posicion;
    }   
    setImg(img){
        this.img = img;
    }
}