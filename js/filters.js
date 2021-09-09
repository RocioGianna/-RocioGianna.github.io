"use strict";

//document.addEventListener('DOMContentLoaded', iniciarPagina);

//document.getElementById("btnC").addEventListener("click", cargarImagen);
///// FILTROS
//function cargarImagen(){

    //let imagen = new Image();
    //imagen.src = file.value;
    //console.log(file.value);


    let imageData;

   let imagen = new Image();
    imagen.src = "asdas.jpg";
    

    imagen.onload = function(){
        myDrawImageMethod(this);
    imageData = ctx.getImageData(0,0,this.width, this.height);
    let data = imageData.data; //imageData.data devuelve un arreglo con los pixeles de la imagen, valores enteros entre 0 y 255
        
        //document.getElementById("filtros").addEventListener("change", fil);
               
        
        
            
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
                    brillo(data);
                    break;
                case "blur":
                    //blur(data);
                    break;                
               
                case "saturacion":
                //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
                break;
                case "ninguno":
                break;
            }
            ctx.putImageData(imageData, 0,0);
        })
        
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



document.getElementById("transformar").addEventListener("click", rgb2hsv);

function rgb2hsv (r, g, b, dataHSV) {
    console.log('entra a pasar de rgb a hsv');
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs); // saca el máximo entre los tres valores
    diff = v - Math.min(rabs, gabs, babs); // max - min de los tres valores anteriores
    diffc = c => (v - c) / 6 / diff + 1 / 2;
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

    let j = Math.round(h * 360);
    let k = percentRoundFn(s * 100);
    let asd = percentRoundFn(v * 100);
    //console.log('h' + j, 's'+ k, 'v'+ asd);

    h = Math.round(h * 360);
    s = percentRoundFn(s * 100);
    v = percentRoundFn(v * 100);
    dataHSV.push(h, s, v, 255);       
    
}

// Elige opción
// rgb a hsv
// a ese valor V -> le setteamos un brillo nosotros
// CONSULTAR: HAY QUE HACERLO ASÍ O QUE EL USUARIO ELIJA EL BRILLO? SERÍA MUY PRO?
// pasar hsV a RGB
// dibujar

function hsvToRgb(h, s, v, data) {
    console.log('entre a pasar de rgb a hsv');
    var r, g, b;
  
    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
  
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
    data.push(r*255, g*255, b*255, 255);
  }

function brillo(data){
    console.log('entra a a aplicar brillo');
    //let porcentaje = Number(document.getElementById("porcentaje").value);
    let porcentaje = 50;
    let porc = porcentaje/100;
    let dataHSV = []; // almacena los valores de data en HSV
    for ( let i = 0; i < data.length; i++ ) {
        var r = data[ i * 4 ];
        var g = data[ i * 4 + 1 ];
        var b = data[ i * 4 + 2 ];
        //console.log (r, g, b);
        rgb2hsv (r, g, b, dataHSV);
    }
    console.log('sale de pasar de rgb a hsv');
    // Transformo los valores de RGB a HSV
    // Aplico porcentaje a los valores de V
    for ( let i = 0; i < dataHSV.length; i++ ) {
        dataHSV[ i * 4 + 2 ] = dataHSV[ i * 4 + 2 ]*porc;
    }
    // Ahora nuestro dataHSV ya tiene el filtro aplicado
    // Pasamos de HSV a RGB
    data = []; // Vaciar arreglo
    hsvtorgb (h, s, v, data);
    console.log('sale de pasar de hsv a rbg');
    
    // dibujar   

}