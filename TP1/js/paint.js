"use strict";

// Canvas
document.getElementById("limpiar").addEventListener("click", limpiarCanvas);
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
let dist = c.getBoundingClientRect();

// Lápiz + gomas
let lapiz = document.getElementById("lapiz");
let goma = document.getElementById("goma");
goma.addEventListener("click", dibujarEnCoordenas);
lapiz.addEventListener("click", dibujarEnCoordenas);

let posX = 0;
let posY = 0;

// Flag para dibujar/borrar 
let estaDibujando = false;
let estaBorrando = false; 


function dibujarEnCoordenas(){
    let obj = this.id;
    // Eventos del mouse para dibujar o borrar
    if(obj == "lapiz"){
        ctx.strokeStyle = document.getElementById('color').value;//seteo color
        c.addEventListener("mousedown", function(e){
            estaDibujando = true;
            estaBorrando = false;
            posX = e.clientX - dist.left;
            posY = e.clientY - dist.top;
        });
        c.addEventListener("mousemove", function(e){
            if(estaDibujando == true){
                ctx.strokeStyle = document.getElementById('color').value; //seteo color
                draw(posX, posY, e.clientX - dist.left, e.clientY - dist.top);
                posX = e.clientX - dist.left;
                posY =  e.clientY - dist.top;
            }
        });
        c.addEventListener("mouseup", function(e){
            estaDibujando = false;
        });
    }else{
        ctx.strokeStyle = '#FFFFFF'; //seteo color
        c.addEventListener("mousedown", function(e){
            estaDibujando = false;
            estaBorrando = true;
            posX = e.clientX - dist.left;
            posY = e.clientY - dist.top;
        });
        c.addEventListener("mousemove", function(e){
            if(estaBorrando == true){
                ctx.strokeStyle = '#FFFFFF'; //seteo color
                draw(posX, posY, e.clientX - dist.left, e.clientY - dist.top);
                posX = e.clientX - dist.left;
                posY =  e.clientY - dist.top;
        
            }
        });
        c.addEventListener("mouseup", function(e){
            estaBorrando = false;
        });
    }
}

// Dibujar con las posiciones indicadas
function draw(posX, posY, x, y){
    ctx.beginPath();
    ctx.lineWidth = document.getElementById("tamanio").value * 0.5;
    ctx.lineCap = "round";
    ctx.moveTo(posX, posY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();   
}
// Limpia canvas -> elimina imagen cargada o dibujos hechos
function limpiarCanvas(){
    ctx.clearRect(0, 0, c.width, c.height);
    c.width = 700;
    c.height = 700;
}

