class Tablero {
    constructor(desdeX, desdeY, CANT_FICHAS, context, Ficha){
        this.desdeX = desdeX;
        this.desdeY = desdeY;
        this.ctx = context;
        this.cantFichas = CANT_FICHAS;
        this.ficha = Ficha;
    }

    

    draw(){
        let x = this.getXInicio();
        let y = this.getYInicio();
        let ancho = this.getAncho(); 
        let alto = this.getAlto();
        let matriz = [];

        for(let i = 0; i <this.CANT_FICHAS + 3; i++){
            matriz[i] = [];
            for(let j = 0; j < this.CANT_FICHAS + 2; j++){
                matriz[i][j] = ficha;
                ctx.drawImage(ficha, x, y);
                y = y + alto;
            }
            y = this.getYInicio();
            x = x + ancho;
        }
        console.log(matriz)
        console.log(matriz[2][2]);

        // for(let i = 0; i < this.cantFichas + 3; i++ ){
        //     for(let j = 0; j < this.cantFichas + 2; j++){
        //         ctx.beginPath();
        //         ctx.drawImage(ficha, x, y);
        //         ctx.stroke();
        //         y = y + alto;
        //     }
        //     y = this.getYInicio();
        //     x = x + ancho;
        // }
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


// let c = document.getElementById("canvas");
// let ctx = c.getContext("2d");
// let  ficha = new Image();
// let  ficha = new Image();
// ficha.src = "ficha.png";
// ficha.src = "tablero.png";


// //230, 40 medidas donde comienza el primer bloque del tablero 
// //poner constantes para la posicion del tablero 230, 40
// let t1 = new Tablero(230,40,80,80, 4, ctx, Ficha);



// ficha.onload = function(){
 
//     t1.draw();

//     c.addEventListener("mouseup", function(e){
    
//         console.log(e.clientX - c.offsetLeft + " soy sin resta " + e.clientX);
//     //     if (e.clientX - c.offsetLeft )
//     //    ctx.drawImage(ficha,e.clientX - c.offsetLeft - (40 / 2), e.clientY - c.offsetTop - (40 / 2));
//     })
// }

