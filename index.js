
//document.getElementById("btnC").addEventListener("click", cargarImagen);
document.getElementById("limpiar").addEventListener("click", limpiarCanvas);
let lapiz = document.getElementById("lapiz");
lapiz.addEventListener("click", coordenadas);
let goma = document.getElementById("goma");
goma.addEventListener("click", coordenadas);

let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
let dist = c.getBoundingClientRect();

let posX = 0;
let posY = 0;
let color;
let flag = false;

function coordenadas(){
    let obj = this.id;

    console.log("linea 18 " + obj)
    c.addEventListener("mousedown", function(e){
        elegirColor(obj);
        flag = true;
        posX = e.clientX - dist.left;
        posY = e.clientY - dist.top;
    });
    c.addEventListener("mousemove", function(e){
        if(flag == true){
            elegirColor(obj);
            draw(posX, posY, e.clientX - dist.left, e.clientY - dist.top);
            posX = e.clientX - dist.left;
            posY =  e.clientY - dist.top;
        }
    })
    c.addEventListener("mouseup", function(e){
        flag = false;
    });
}
function elegirColor(obj){
    console.log("linea 39 " + obj)
    if(obj == "lapiz"){
        let c = document.getElementById('color').value;
        setColor(c);
    }else{
        setColor('#FFFFFF');
    }    
}

function setColor(col){
    color = col;
}
function getColor(){
    return color;
}
function draw(posX, posY, x, y){
    ctx.beginPath();
    ctx.strokeStyle = getColor();
    ctx.lineWidth = document.getElementById("tamanio").value;
    ctx.lineCap = "round";
    ctx.moveTo(posX, posY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();   
}





//function cargarImagen(){

   // let imagen = new Image();
   // imagen.src = file.value;
    //console.log(file.value);


    let imageData;

    let imagen = new Image();
    imagen.src = "insta.jpg";

    imagen.onload = function(){
        
        document.getElementById("filtros").addEventListener("change", fil);
        function fil(){
            return document.getElementById("filtros").value;
        }
       

        myDrawImageMethod(this);
        imageData = ctx.getImageData(0,0,this.width, this.height);
        let data = imageData.data; //imageData.data devuelve un arreglo con los pixeles de la imagen, valores enteros entre 0 y 255
        //filtroBinarizacion(data);
        //filtroInvertido(data);
        //filtroGris(data);
        ctx.putImageData(imageData, 0,0);
    }
//}

/**
 * Para el filtro invertido o negativo le restamos a 255 (tope de tono) el valor actual de r, g y b. Así obtenemos el opuesto.
 *
 */
function filtroInvertido(data){
    for(let i =0; i < data.length; i+=4){
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
}
/*buscamos el valor promedio del pixel y 
luego comparamos si es mayor o menor a la mitad de 255,
 en caso que sea mayor el pixel se le da valor 255 caso 
 contrario al pixel se le da valor 0*/
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

function limpiarCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

