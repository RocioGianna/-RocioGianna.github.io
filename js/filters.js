"use strict";

//document.addEventListener('DOMContentLoaded', iniciarPagina);



// document.getElementById("btnC").addEventListener("click", cargarImagen);

//function cargarImagen(){

    //let imageData;
    //let imagen = new Image();
    //imagen.src = file.value;
    //console.log(file.value);

    let imageData;
    let imagenOriginal;
    let imagen = new Image();
    imagen.src = "img/messi.jpg";
    

    // La funcion onload la usamos para indicar que una vez que la imagen este cargada se pueda empezar a aplicar distintos filtros.

    imagen.onload = function(){
        console.log('entra a cargarla');
        myDrawImageMethod(this);
        imagen.width = c.width;
        
        imageData = ctx.getImageData(0,0,this.width, this.height); //se modifica con los filtros
        imagenOriginal = ctx.getImageData(0,0,this.width, this.height); // queda original

        let data = imageData.data; //imageData.data devuelve un arreglo con los pixeles de la imagen, valores enteros entre 0 y 255
       
        c.height =  this.height;
        
        
        // Funcion reset. Su función es quitarle el/los filtro/s que se le haya puesto y quede en su estado original.
        // Para esto recorremos la data de la imagen modificada y le asiganmos los valores de la data inicial (no modificada).

        document.getElementById("reset").addEventListener("click", function(){
            let dataInicial = imagenOriginal.data;
            for(let i=0; i < data.length; i+=4){
                data[i] = dataInicial[i];
                data[i + 1]= dataInicial[i + 1];
                data[i + 2]= dataInicial[i + 2];
            }
            ctx.putImageData(imageData, 0,0);
        });
  
        // Switch para elección del filtro a aplicar
        document.getElementById("apply-filter").addEventListener("click", function(e)
        {
            let tipoFiltro = document.getElementById("filtros").value;
            console.log('imprimo', tipoFiltro);
            switch (tipoFiltro) {
                case "negativo":              
                    filtroInvertido(data);
                    break;
                case "sepia":
                    sepia(data);
                    break;
                case "binarizacion":
                    filtroBinarizacion(data);
                    break;
                case "brillo":
                    brillo(imageData, imagenOriginal);
                    break;
                case "blur":
                    blur(imageData, imagenOriginal);    
                    break;                
                case "saturacion":
                    saturacion(imageData, imagenOriginal);
                    break;
                case "ninguno":
                break;
            }
            ctx.putImageData(imageData, 0,0);
            console.log('dibuja');
        })
        ctx.putImageData(imageData, 0,0);
    }
    
//}


 // Funcion que nos permite dibujar la imagen ingresada en el canvas. * Para esto le pasamos por parametro la imagen ingresada,
 //  y luego las coordenadas x e y para indicarle des de que punto deba comenzar a dibujar.

 function myDrawImageMethod(imagen){
    ctx.drawImage(imagen,0,0);
}


// GUARDAR IMAGEN

document.getElementById("save-image").addEventListener("click", ()=>{
    console.log('la descarga..');
    let image = c.toDataURL("image/png").replace("image/png", "image/octet-stream");  
    window.location.href=image; //it's a property that will tell you the current URL location of the browser. Changing the value of the property will redirect the page.
})


//Para el filtro invertido o negativo le restamos a 255 (tope de tono) el valor actual de r, g y b. Así obtenemos el opuesto.
function filtroInvertido(data){
    for(let i =0; i < data.length; i+=4){
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
}

 // Buscamos el valor promedio del pixel sumando r,g y b para luego dividerlo por 3. 
 // Luego comparamos si es mayor o menor a la mitad de 255, en caso que sea mayor  se le da valor 255 y en caso contrario al pixel se le da valor 0.

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

function sepia(data) {
 
    for ( var i = 0; i < data.length; i++ ) {
        var r = data[ i * 4 ];
        var g = data[ i * 4 + 1 ];
        var b = data[ i * 4 + 2 ];
 
        data[ i * 4 ] = 255 - r;
        data[ i * 4 + 1 ] = 255 - g;
        data[ i * 4 + 2 ] = 255 - b;
 
        data[i*4] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
        data[i*4 + 1 ] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
        data[ i * 4 + 2 ] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
    }

};

// RGB A HSV

function rgbAHsv (r, g, b) {
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs); // saca el máximo entre los tres valores
    diff = v - Math.min(rabs, gabs, babs); // max - min de los tres valores anteriores
    diffc = c => (v - c) / 6 / diff + 1 / 2; //arrow func
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }

   return {
        h : Math.round(h * 360),
        s : percentRoundFn(s * 100),
        v : percentRoundFn(v * 100),
   }
}
// HSV A RGB
function hsvARgb(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;
     
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));

    s /= 100;
    v /= 100;
     
    if(s == 0) {
        r = g = b = v;
        r = Math.round(r * 255); 
        g = Math.round(g * 255); 
        b = Math.round(b * 255);
    }
     
    h /= 60; 
    i = Math.floor(h);
    f = h - i; 
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
    switch(i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
     
        case 1:
            r = q;
            g = v;
            b = p;
            break;
     
        case 2:
            r = p;
            g = v;
            b = t;
            break;
     
        case 3:
            r = p;
            g = q;
            b = v;
            break;
     
        case 4:
            r = t;
            g = p;
            b = v;
            break;
     
        default: 
            r = v;
            g = p;
            b = q;
    }
     
    return{
        r : Math.round(r * 255), 
        g : Math.round(g * 255), 
        b : Math.round(b * 255),
    }

}

// BRILLO 
function brillo(imageData, imagenOriginal){
    let porcentaje = document.getElementById("intensidad").value / 25;
    console.log(imageData.data);
    let r,g,b, h,s,v;

    for(let x = 0; x < imageData.width; x++){
        for(let y = 0; y < imageData.height; y++){
            setPixel(imageData, imagenOriginal, x,y);
        }
    }
    // Transformo los valores de RGB a HSV
    // Aplico porcentaje a los valores de V
    function setPixel(imageData, imagenOriginal, x,y){
        let index = (x + y * imageData.width)* 4;
        r = imagenOriginal.data[index + 0];
        g = imagenOriginal.data[index + 1];
        b = imagenOriginal.data[index + 2];

        let valorHSV = rgbAHsv (r, g, b,);
        h = valorHSV.h;
        s = valorHSV.s;
        v = valorHSV.v  * porcentaje;

        let valorRGB = hsvARgb(h, s, v);
  
        imageData.data[index + 0] = valorRGB.r;
        imageData.data[index + 1] = valorRGB.g;
        imageData.data[index + 2] = valorRGB.b;

    }
    console.log(imageData.data);
    ctx.putImageData(imageData, 0,0);

}


/// SATURACIÓN


function saturacion(imageData, imagenOriginal){
    let porcentaje = document.getElementById("intensidad").value / 25;
    console.log("entra saturacion");
    console.log(imageData.data);
    let r,g,b, h,s,v;
    
    for(let x = 0; x < imageData.width; x++){
        for(let y = 0; y < imageData.height; y++){
            setPixel(imageData, imagenOriginal, x,y);
        }
    }
    // Transformo los valores de RGB a HSV
    // Aplico porcentaje a los valores de V
    function setPixel(imageData, imagenOriginal, x,y){
        let index = (x + y * imageData.width)* 4;
        r = imagenOriginal.data[index + 0];
        g = imagenOriginal.data[index + 1];
        b = imagenOriginal.data[index + 2];

        let valorHSV = rgbAHsv (r, g, b,);
        h = valorHSV.h;
        s = valorHSV.s * porcentaje;
        v = valorHSV.v ;

        let valorRGB = hsvARgb(h, s, v);
  
        imageData.data[index + 0] = valorRGB.r;
        imageData.data[index + 1] = valorRGB.g;
        imageData.data[index + 2] = valorRGB.b;

    }
    console.log(imageData.data);
    ctx.putImageData(imageData, 0,0);

}

function blur(imageData, imagenOriginal){

    for(let x = 1; x < imageData.width -1; x++){
        for(let y = 1; y < imageData.height -1; y++){
            setPixel(imageData, imagenOriginal, x,y);
        }
    }
    
    function setPixel(imageData,imagenOriginal, x,y){
        let index;
        let r = 0, g = 0, b = 0;
        for(let i = x - 1; i <= (x + 1); i++){   // si sumo los arregedores del pixel cambiando la x e y en + o - 1, se puede aplicar gauss
            for(let j = y - 1; j <= (y + 1); j++){
                index = (i + j * imagenOriginal.width)* 4;
                r= r + imagenOriginal.data[index + 0];
                g= g + imagenOriginal.data[index + 1];
                b= b + imagenOriginal.data[index + 2];
            }
        }
        index = (x + y * imageData.width)* 4; 
        imageData.data[index + 0] = r/9;
        imageData.data[index + 1] = g/9;
        imageData.data[index + 2] = b/9;
    }
}
