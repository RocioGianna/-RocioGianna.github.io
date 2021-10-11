class Timer{ 

    constructor(inicio, final){
        this.inicio = inicio;
        this.final = final;
        this.contador = this.inicio;
        this.timer = null;
    }

    contarSegundos(){// este metodo se encarga de armar el timer. Lo que va a ocurrir es que se va a frenar cuando el contador sea igual al final(0)
        if(this.contador == this.final){
            this.contarSegundos = null;
            return;
        }
        showTimer.innerHTML = "Tiempo restante: " + this.contador--;
        finalizoElJuego();//cada vez que se ejecuta corrobora que no haya un ganador o el tiempo se hay terminado
        this.timer = setTimeout(this.contarSegundos.bind(this),1000); // esta funcion se repite cada 1seg, .bind se encarga de pasarle a la funcion el estado actual en el que termino es decir contador--.
    }

    stop(){
        clearTimeout(this.timer);//funcion que frena el timer
    }
    getContador(){
        return this.contador;
    }
}