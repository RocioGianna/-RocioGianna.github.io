class Juego{
    constructor(Personaje, Obstaculo, Gema, puntaje){
        this.Personaje = Personaje;
        this.Obstaculo = Obstaculo;
        this.Gema = Gema;
        this.puntaje = puntaje;
    }

    // Metodo que inicializa el juego       
    iniciar(){
        // Se crea el personaje
        this.Personaje.crear();
        // Se crea el obstaculo
        this.Obstaculo.crear();
        // Se crea la gema
        this.Gema.crear();
        // Se crea el puntaje
        this.puntaje.crear();
        // Se crea el movimiento del personaje
        this.movimiento();
    }

}