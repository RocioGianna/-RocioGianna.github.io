let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

const CANT_FICHAS = 1;

let tablero = new Tablero(0,0,CANT_FICHAS,ctx);
tablero.drawTablero();


//prueba para ver si funciona el arr en jugador (Funciona)
let j1 = new Jugador(CANT_FICHAS);
j1.addFichaJugador();
console.log(j1.getFichas());



//prueba de eventos y ver si funciona isPointInside (Funciona)
c.addEventListener("mousedown", prueba);
//c.addEventListener("mouseup", prueba);
//c.addEventListener("mousemove", prueba);

function prueba(e){
    x = e.clientX - c.offsetLeft;
    y = e.clientY - c.offsetTop;

    for(let i = 0; i < j1.getSize(); i++){
       console.log( j1.fichas[i].isPonintInside(x, y));
       if(j1.fichas[i].isPonintInside(x, y)){
           console.log("funciona")
       }
    }
    
}

