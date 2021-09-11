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
    imagen.src = "img/messi.jpg";
    

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
                    //filtroBlur(data, imageData); //pone todos los pixeles en 255

                    blur(imageData);    //me dice que no encuentra la propiedad 0 de indefinido :|
                    break;                
                case "saturacion":
                    //saturacion();
                break;
                case "ninguno":
                break;
            }
            ctx.putImageData(imageData, 0,0);
            console.log('dbuja');
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

// RGB A HSV

function rgbAHsv (r, g, b, dataHSV) {
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

    h = Math.round(h * 360);
    s = percentRoundFn(s * 100);
    v = percentRoundFn(v * 100);
    console.log('h :' + h, 's :' + s, 'v :'+ v + 'sin porcentaje');
    dataHSV.push(h, s, v, 255);    
   
}
// HSV A RGB
function hsvARgb(h, s, v, data) {
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
     
    r = Math.round(r * 255); 
    g = Math.round(g * 255); 
    b = Math.round(b * 255);
    //console.log('valores finales de RGB:');
    console.log('r :' + r, 'g :' + g, 'b :'+ b);
    data.push(r,g,b, 255);

}

// BRILLO 
function brillo(data){
    let porcentaje = 100/100;
    let dataHSV = []; // almacena los valores de data en HSV
    for ( let i = 0; i < data.length; i+=4 ) {
        let r = data[ i  ];
        let g = data[ i + 1 ];
        let b = data[ i + 2 ];
        rgbAHsv (r, g, b, dataHSV);
    }
    // Transformo los valores de RGB a HSV
    // Aplico porcentaje a los valores de V
    for ( let i = 0; i < dataHSV.length; i+=4 ) {
       dataHSV[ i + 2 ]+= (dataHSV[ i + 2 ] *porcentaje);
       
    }
    // Ahora nuestro dataHSV "ya tiene el filtro aplicado"
    // Pasamos de HSV a RGB
    data = []; // Vaciar arreglo para ponerle los valores con e filtro aplicado
    for ( let i = 0; i < dataHSV.length; i+=4 ) {
        let h = dataHSV[ i  ];
        let s = dataHSV[ i + 1 ];
        let v = dataHSV[ i + 2 ];
        console.log('h :' + h, 's :' + s, 'v :'+ v);
        hsvARgb(h, s, v, data);
    }
    console.log(data);
    console.log('sale de pasar de hsv a rbg');

}


/////////////// BLUR


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
    for(let i = 0; i < data.length; i+=4){
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
/*function blur(imageData){
    let copia = [];
    let valor;
    console.log(imageData.height)

   /* for(let x= 0; x < imageData.width; x++){
        copia[x] = [];
        for(let y = 0; y < imageData.height; y++){
            copia[x][y] = imageData[x][y];
        }
    }*/
    /*

    for(let x = 1; x < imageData.width - 1; x++){
        for(let y = 1; y < imageData.height - 1; y++){
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
            valor= 0;
        }
    }
    function setPixel(imageData, x,y, valor){
        let index = (x + y * imageData.width)* 4;
        imageData.data[index + 0] = valor;
        imageData.data[index + 1] = valor;
        imageData.data[index + 2] = valor;
        imageData.data[index + 3] = valor;
    }*/

    //////////////////////////////////////////////////////////////////////////////////////////

    function blur(imageData){

        for(let x = 0; x < imageData.width; x++){
            for(let y = 0; y < imageData.height; y++){
                setPixel(imageData, x,y);
            }
        }
        
        function setPixel(imageData, x,y){
            let index;
            let r = 0, g = 0, b = 0;
            for(let i = x - 1; i <= (x + 1); i++){   // si sumo los arregedores del pixel cambiando la x e y en + o - 1, se puede aplicar gauss
                for(let j = y - 1; j <= (y + 1); j++){
                    index = (i + j * imageData.width)* 4;
                    r= r + imageData.data[index + 0];
                    g= g + imageData.data[index + 1];
                    b= b + imageData.data[index + 2];
                }
            }
            index = (x + y * imageData.width)* 4; 
            imageData.data[index + 0] = r/9;
            imageData.data[index + 1] = g/9;
            imageData.data[index + 2] = b/9;
        }
}