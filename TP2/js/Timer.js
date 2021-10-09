class Timer{

    constructor(inicio, final){
        this.inicio = inicio;
        this.final = final;
        this.contador = this.inicio;
        this.timer = null;
    }

    contarSegundos(){
        if(this.contador == this.final){
            this.contarSegundos = null;
            return;
        }
        //this.contador--;
        console.log(this.contador--)
        showTimer.innerHTML = this.contador;
        finalizoElJuego();
        this.timer = setTimeout(this.contarSegundos.bind(this),1000);
    }

    stop(){
        clearTimeout(this.timer);
    }
    getContador(){
        return this.contador;
    }
}