let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
let width = c.width;
let height = c.height;

let imageData;

let imagen = new Image();
imagen.src = "insta.jpg";

imagen.onload = function(){

    myDrawImageMethod(this);
    imageData = ctx.getImageData(0,0,this.width, this.height);
    let data = imageData.data;
    //filtroBinarizacion(data);
    //filtroInvertido(data);
    filtroGris(data);
    ctx.putImageData(imageData, 0, 0);
}

function filtroInvertido(data){
    for(let i =0; i < data.length; i+=4){
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
}
function filtroBinarizacion(data){
    let color;
    for(let i = 0; i < data.length; i+=4){
        if((data[i] + data[i + 1] + data[i + 2])/3 > 255/2){
            color = 255;
        }else{
            color = 0;
        }
        data[i] = color;
        data[i + 1] =color;
        data[i + 2] =color;

    }
}

function filtroGris(data){
    for(let i =0; i < data.length; i+=4){
        let gris = (data[i] + data[i + 1] + data[i + 2]) /3;
        data[i] = gris;    
        data[i + 1] = gris;
        data[i + 2] = gris;
    }
}


function myDrawImageMethod(imagen){
    ctx.drawImage(imagen,0,0);
}