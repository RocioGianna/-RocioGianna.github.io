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
    imagen.src = "img/insta.jpg";
    

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

function myDrawImageMethod(imagen){
    ctx.drawImage(imagen,0,0);
}

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

//document.getElementById("transformar").addEventListener("click", rgb2hsv);

function brillo(data){
    console.log('entra a a aplicar brillo');
    //let porcentaje = Number(document.getElementById("porcentaje").value);
    let porcentaje = 50;
    let porc = porcentaje/100;
    let dataHSV = []; // almacena los valores de data en HSV
    for ( let i = 0; i < data.length; i+=4 ) {
        let r = data[ i  ];
        let g = data[ i + 1 ];
        let b = data[ i + 2 ];
        rgb2hsv (r, g, b, dataHSV);
        //console.log(rgb2hsv(r,g,b));
        //dataHSV.push(rgb2hsv(r,g,b));
    }
    console.log("hav",dataHSV.length + "data", data.length);
    console.log('sale de pasar de rgb a hsv');
    // Transformo los valores de RGB a HSV
    // Aplico porcentaje a los valores de V
    for ( let i = 0; i < dataHSV.length; i+=4 ) {
        //console.log("entra?");
       let b = dataHSV[ i + 2 ];
       b = b *porc;
    }
    // Ahora nuestro dataHSV ya tiene el filtro aplicado
    // Pasamos de HSV a RGB
    console.log(data);
    data = []; // Vaciar arreglo
    console.log(data);
    for ( let i = 0; i < dataHSV.length; i+=4 ) {
        let h = dataHSV[ i  ];
        let s = dataHSV[ i + 1 ];
        let b = dataHSV[ i + 2 ];

        hsvToRgb(h, s, b, data);
    }
    console.log(data);
    
    console.log('sale de pasar de hsv a rbg');
    
    // dibujar   

}

function rgb2hsv (r, g, b, dataHSV) {
    console.log('entra a pasar de rgb a hsv');
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

    //let j = Math.round(h * 360);
    //let k = percentRoundFn(s * 100);
    //let asd = percentRoundFn(v * 100);
    //console.log('h' + j, 's'+ k, 'v'+ asd);
    h = Math.round(h * 360);
    s = percentRoundFn(s * 100);
    v = percentRoundFn(v * 100);
    console.log(h,s,v);
    //return h,s,v;
    dataHSV.push(h, s, v, 255);     
   // console.log(dataHSV)  
    
}

// Elige opción
// rgb a hsv
// a ese valor V -> le setteamos un brillo nosotros
// CONSULTAR: HAY QUE HACERLO ASÍ O QUE EL USUARIO ELIJA EL BRILLO? SERÍA MUY PRO?
// pasar hsV a RGB
// dibujar
function hsvToRgb(h, s, v, data) {
    console.log('entre a pasar de hsv a rgb');
    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
  
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    console.log(r,g,b)
    data.push(r,g,b, 255);
  }

/**
 * 
 * filtros blur "filtroBlur" es como el video de gauss
 * "blur" es siguiendo la forma que dice Javi en el video
 */
 function filtroBlur(data, imageData){
    let auxPixel = [];
    for(let i = 0; i < data.length; i++){
        auxPixel[i] = data[i];
    }
    console.log(data == auxPixel)
    for(let i = 0; i < data.length; i++){
        if(i % 4 === 3){continue;}
        data[i] = (auxPixel[i] 
            + (auxPixel[i - 4] || auxPixel[i]) 
            + (auxPixel[i + 4] || auxPixel[i]) 
            + (auxPixel[i - 4] * imageData.width || auxPixel[i])
            + (auxPixel[i + 4] * imageData.width || auxPixel[i])
            + (auxPixel[i - 4] * imageData.width - 4 || auxPixel[i])
            + (auxPixel[i + 4] * imageData.width + 4 || auxPixel[i])
            + (auxPixel[i - 4] * imageData.width + 4 || auxPixel[i])
            + (auxPixel[i + 4] * imageData.width - 4 || auxPixel[i])) /9 ;
    }
    console.log(data + " *********************** " + auxPixel)
}
function blur(imageData){
    let copia = [];
    let valor;
    console.log(imageData.height)

   /* for(let x= 0; x < imageData.width; x++){
        copia[x] = [];
        for(let y = 0; y < imageData.height; y++){
            copia[x][y] = imageData[x][y];
        }
    }*/
    

    for(let x= 0; x < imageData.width; x++){
        for(let y = 0; y < imageData.height; y++){
            valor = imageData[(x+1),y]
            + imageData[(x-1), y]
            + imageData[x,(y+1)]
            + imageData[x,(y-1)] 
            + imageData[(x+1), (y-1)] 
            + imageData[(x-1), (y-1)]
            + imageData[(x+1), (y+1)]
            + imageData[(x-1), (y+1)];   

            valor = valor/9;
            console.log("valor ", valor) 
            setPixel(imageData, x,y, valor);
        }
    }
    function setPixel(imageData, x,y, valor){
        let index = (x + y * imageData.width)* 4;
        imageData.data[index + 0] = valor;
        imageData.data[index + 1] = valor;
        imageData.data[index + 2] = valor;
        imageData.data[index + 3] = valor;
    }

}
