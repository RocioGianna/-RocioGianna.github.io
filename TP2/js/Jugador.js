class Jugador{
    constructor(cantFichas, topeXSup, topeXInf, topeYSup, topeYInf){ //
        this.fichas = [];
        this.cantFichasJugador = cantFichas;
         this.topeXSup = topeXSup;
         this.topeXInf = topeXInf;
         this.topeYSup = topeYSup;
         this.topeYInf = topeYInf;
    }

    addFichaJugador(){
        //let posFichaX = 800;
        //let posFichaY = 75;
        
        for(let i =0; i < this.cantFichasJugador; i++){
            
            let posRandomX = Math.floor((Math.random() * (this.topeXInf-this.topeXSup)) + this.topeXSup);
            let posRandomY = Math.floor((Math.random() * (this.topeYInf-this.topeYSup)) + this.topeYSup);

           // if (this.existeFichaEnEsaPos(posRandomX, posRandomY)){
             //   this.addFichaJugador();
            //}else{
                this.fichas.push(new Ficha(40,40,"img/ficha.png")); //prueba para guardar las fichas
                console.log('aaaaa', posRandomX, posRandomY);
                
                this.fichas[i].drawFicha(posRandomX, posRandomY, ctx); // hacer la x y la y dinamicas
                //xx += 50;
                //yy += 50;
                //posFichaY += 50;
                //let posFichaY = 150;
                console.log(i);
                console.log(this.fichas[i].getPosition()); //obtenemos posicion inicial donde va a estar cada ficha 
            }
            
        }
    

    // existeFichaEnEsaPos(posRandomX, posRandomY){
    //     for (let i =0; i < this.fichas.length; i++){
    //         // verifico que no exista una ficha en esa posición
    //         console.log('bbbb');
    //         console.log(this.fichas[i].getPosition());
            
    //         if ((this.fichas[i].getX() == (posRandomX)) && (this.fichas[i].getY() == (posRandomY))){
    //             console.log('resultado', this.fichas[i].getPosition() == (posRandomX, posRandomY));
    //             return true;
    //         }
    //         return false;
    //     }
    // }

    getSize(){
        return this.fichas.length;
    }
    getFichas(){
        return this.fichas;
    }
}

