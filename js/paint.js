"use strict";

//document.addEventListener('DOMContentLoaded', iniciarPagina);

document.getElementById("limpiar").addEventListener("click", limpiarCanvas);
let lapiz = document.getElementById("lapiz");
let goma = document.getElementById("goma");
let posX = 0;
let posY = 0;
let color;
let estaDibujando = false;
let estaBorrando = false;

goma.addEventListener("click", coordenadas);
lapiz.addEventListener("click", coordenadas);

let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
let dist = c.getBoundingClientRect();

function coordenadas(){
    let obj = this.id;

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
                ctx.strokeStyle = document.getElementById('color').value;//seteo color
                draw(posX, posY, e.clientX - dist.left, e.clientY - dist.top);
                posX = e.clientX - dist.left;
                posY =  e.clientY - dist.top;
           
            }
        });
        c.addEventListener("mouseup", function(e){
            estaDibujando = false;
        });
    }else{
        console.log(obj);
        ctx.strokeStyle = '#FFFFFF';//seteo color
        c.addEventListener("mousedown", function(e){
            estaDibujando = false;
            estaBorrando = true;
            posX = e.clientX - dist.left;
            posY = e.clientY - dist.top;
        });
        c.addEventListener("mousemove", function(e){
            if(estaBorrando == true){
                console.log(obj);
                ctx.strokeStyle = '#FFFFFF';//seteo color
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
function draw(posX, posY, x, y){
    ctx.beginPath();
    ctx.lineWidth = document.getElementById("tamanio").value * 0.5;
    ctx.lineCap = "round";
    ctx.moveTo(posX, posY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();   
}

function limpiarCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}