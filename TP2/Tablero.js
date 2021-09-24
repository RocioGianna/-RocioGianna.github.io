class Tablero {
    constructor(desdeX, desdeY, ancho, alto, cantFichas, context, tablero){
        this.desdeX = desdeX;
        this.desdeY = desdeY;
        this.ancho = ancho;
        this.alto = alto;
        this.ctx = context;
        this.cantFichas = cantFichas;
        this.tablero = tablero;
    }

    draw(){
        let x = this.getXInicio();
        let y = this.getYInicio();
        let ancho = this.getAncho(); 
        let alto = this.getAlto();
        

        for(let i = 0; i < this.cantFichas + 3; i++ ){
            for(let j = 0; j < this.cantFichas + 2; j++){
                ctx.beginPath();
                ctx.drawImage(tablero, x, y);
                ctx.stroke();
                y = y + alto;
            }
            y = this.getYInicio();
            x = x + ancho;
        }
    }

    //getters y setters 
    getXInicio(){
        return this.desdeX;
    }
    getYInicio(){
        return this.desdeY;
    }
    getAncho(){
        return this.ancho;
    }
    getAlto(){
        return this.alto;
    }
}


let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
let  tablero = new Image();
let  ficha = new Image();
ficha.src = "ficha.png";
tablero.src = "tablero.png";


//230, 40 medidas donde comienza el primer bloque del tablero 
//poner constantes para la posicion del tablero 230, 40
let t1 = new Tablero(230,40,80,80, 4, ctx,tablero);



tablero.onload = function(){
 
    t1.draw();

    c.addEventListener("mouseup", function(e){
    
        console.log(e.clientX - c.offsetLeft + " soy sin resta " + e.clientX);
    //     if (e.clientX - c.offsetLeft )
    //    ctx.drawImage(ficha,e.clientX - c.offsetLeft - (40 / 2), e.clientY - c.offsetTop - (40 / 2));
    })
}

