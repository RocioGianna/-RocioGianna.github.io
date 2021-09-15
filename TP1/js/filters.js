"use strict";

document.addEventListener('DOMContentLoaded', iniciarPagina);
function iniciarPagina(){
    // Matrices para manejar las imágenes
    let imageData;
    let imagenOriginal; 
    let data; // Areglo de la matriz
    // Ancho y alto
    let width; 
    let height;    
    
    // Funcion que nos permite dibujar la imagen ingresada en el canvas. Para esto le pasamos por parametro la imagen ingresada,
    // y luego las coordenadas x e y para indicarle des de que punto deba comenzar a dibujar.
    function myDrawImageMethod(imagen){
        ctx.drawImage(imagen,0,0);
    }

    // DIBUJAR IMAGEN CARGADA
    function drawImage() {
        // Adaptamos el canvas a la imagen
        c.width = this.width;
        c.height = this.height;
        dist = c.getBoundingClientRect();
        myDrawImageMethod(this); // dibujamos la imagen
        imageData = ctx.getImageData(0,0,this.width, this.height); // se modifica con los filtros
        imagenOriginal = ctx.getImageData(0,0,this.width, this.height); // queda original
        data = imageData.data; //imageData.data devuelve un arreglo con los pixeles de la imagen, valores enteros entre 0 y 255 
        // Actualizamos ancho y alto
        width = imageData.width; 
        height = imageData.height;       
    }
    
    // PROCESO DE CARGA DE IMÁGENES
    // Asignación de evento
    document.getElementById('file').addEventListener("change", cargarImagen);
    // Cargar imagen
    function cargarImagen(){
        let img = new Image(); // crea instancia de Image
        // La funcion onload la usamos para indicar que una vez que la imagen este cargada se pueda empezar a aplicar distintos filtros.
        img.onload = drawImage; // dibuja la imagen
        img.src = URL.createObjectURL(this.files[0]); // Representa a la imagen que seleccionamos desde la pc
    } 
    

    // Funcion reset. Su función es quitarle el/los filtro/s que se le haya puesto y quede en su estado original.
    // Para esto recorremos la data de la imagen modificada y le asiganmos los valores de la data inicial (no modificada).
    document.getElementById("reset").addEventListener("click", reset);
    function reset(){
        let dataInicial = imagenOriginal.data;
        for(let i=0; i<data.length; i+=4){
            data[i]=dataInicial[i];
            data[i+1]=dataInicial[i+1];
            data[i+2]=dataInicial[i+2];
        }
        ctx.putImageData(imageData, 0,0);
    };

    // Switch para elección del filtro a aplicar
    document.getElementById("apply-filter").addEventListener("click", function(e){
        let tipoFiltro = document.getElementById("filtros").value;
        switch (tipoFiltro) {
            case "negativo":              
                filtroInvertido(width, height);
                break;
            case "sepia":
                sepia(width, height);
                break;
            case "binarizacion":
                filtroBinarizacion(width, height);
                break;
            case "brillo":
                brillo(width, height);
                break;
            case "blur":
                blur(width, height);    
                break;                
            case "saturacion":
                saturacion(width, height);
                break;
            case "gris":
                filtroGris(width, height);
                break;
            case "ninguno":
                reset();
                break;
        }
    })

    /////////////////// FILTROS ///////////////////

    // Para el filtro invertido o negativo le restamos a 255 (tope de tono) el valor actual de r, g y b. Así obtenemos el opuesto.
    function filtroInvertido(width, height){
        let imageDataR = ctx.getImageData(0, 0, width, height);
        let data2 = imageDataR.data;
        for (let i=0; i < data2.length; i+=4){
            data2[i] = 255 - data2[i];
            data2[i+1] = 255 - data2[i+1];
            data2[i+2] = 255 - data2[i+2];
        }
        ctx.putImageData(imageDataR, 0,0);
    }

    // Buscamos el valor promedio del pixel sumando los valores de R, G y B para luego dividirlos por 3. 
    // Luego comparamos si es mayor o menor a la mitad de 255, en caso de que sea mayor se le da un valor de 255, y en caso contrario al pixel se le da un valor 0.
    function filtroBinarizacion(width, height){
        let imageDataR = ctx.getImageData(0,0,width, height);
        let data2 = imageDataR.data;
        let color;
        for(let i = 0; i < data2.length; i+=4){
            if((data2[i] + data2[i + 1] + data2[i + 2])/3 > 255/2){ 
                color = 255;
            }else{
                color = 0;
            }
            data2[i] = color;
            data2[i+1] =color;
            data2[i+2] =color;
        }
        ctx.putImageData(imageDataR, 0,0);
    }
    // Grises
    function filtroGris(width, height){
        let imageDataR = ctx.getImageData(0,0,width, height);
        let data2 = imageDataR.data;
        for(let i =0; i < data2.length; i+=4){
            let gris = (data2[i] + data2[i+1] + data2[i+2])/3;
            data2[i] = gris;    
            data2[i+1] = gris;
            data2[i+2] = gris;
        }
        ctx.putImageData(imageDataR, 0,0);
    }
    // Sepia -> basado en búsqueda en la Web
    function sepia(width, height) {
        let imageDataR = ctx.getImageData(0,0,width, height);
        let data2 = imageDataR.data;
        for ( let i = 0; i < data2.length; i++ ) {
            let r = data2[i*4];
            let g = data2[i*4 + 1 ];
            let b = data2[i*4 + 2 ];
            ///
            data2[i*4] = 255 - r;
            data2[i*4+1] = 255 - g;
            data2[i*4+2] = 255 - b;
            ///
            data2[i*4] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
            data2[i*4 + 1 ] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
            data2[ i * 4 + 2 ] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
        }
        ctx.putImageData(imageDataR, 0,0);
    };

    // RGB A HSV
    function rgbAHsv (r, g, b) {
        let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
        rabs = r / 255;
        gabs = g / 255;
        babs = b / 255;
        v = Math.max(rabs, gabs, babs); // saca el máximo entre los tres valores
        diff = v - Math.min(rabs, gabs, babs); // max - min de los tres valores anteriores
        diffc = c => (v - c) / 6 / diff + 1 / 2; // arrow func
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
        let r, g, b;
        let i;
        let f, p, q, t;
        // 
        h = Math.max(0, Math.min(360, h));
        s = Math.max(0, Math.min(100, s));
        v = Math.max(0, Math.min(100, v));
        // 
        s /= 100;
        v /= 100;
        // 
        if(s == 0) {
            r = g = b = v;
            r = Math.round(r * 255); 
            g = Math.round(g * 255); 
            b = Math.round(b * 255);
        }
        //        
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
    // ACTUALIZACIÓN VALORES RGB: para brillo y saturación
    function dibujarBrilloSat(imageDataR, x,y, porcentaje){
        let index = (x + y * imageDataR.width)* 4;
        let r, g, b, h, s, v;
        r = imageDataR.data[index + 0];
        g = imageDataR.data[index + 1];
        b = imageDataR.data[index + 2];
        let valorHSV = rgbAHsv (r, g, b,);
        let tipoFiltro = document.getElementById("filtros").value;
        if (tipoFiltro == "brillo"){
            h = valorHSV.h;
            s = valorHSV.s;
            v = valorHSV.v  * porcentaje;
        }else if (tipoFiltro == "saturacion"){
            h = valorHSV.h;
            s = valorHSV.s * porcentaje;
            v = valorHSV.v ;
        }
        let valorRGB = hsvARgb(h, s, v);
        imageDataR.data[index + 0] = valorRGB.r;
        imageDataR.data[index + 1] = valorRGB.g;
        imageDataR.data[index + 2] = valorRGB.b;
    }

    // BRILLO 
    function brillo(width, height){
        let imageDataR = ctx.getImageData(0,0,width, height);
        let porcentaje = 2;

        // Transformo los valores de RGB a HSV
        // Aplico porcentaje a los valores de V
        for(let x = 0; x < imageDataR.width; x++){
            for(let y = 0; y < imageDataR.height; y++){
                dibujarBrilloSat(imageDataR, x,y, porcentaje);
            }
        }        
        ctx.putImageData(imageDataR, 0,0);
    }

    /// SATURACIÓN
    function saturacion(width, height){
        let imageDataR = ctx.getImageData(0,0,width, height);
        let porcentaje = 2;
         // Transformo los valores de RGB a HSV
        // Aplico porcentaje a los valores de S
        for(let x = 0; x < imageDataR.width; x++){
            for(let y = 0; y < imageDataR.height; y++){
                dibujarBrilloSat(imageDataR, x,y, porcentaje);
            }
        }       
        ctx.putImageData(imageDataR, 0,0);
    }

    // Trabaja cada pixel para Blur
    function dibujarBlur(imageDataR, x,y){
        let index;
        let r = 0, g = 0, b = 0;
        for(let i = x - 1; i <= (x + 1); i++){   // si sumo los arregedores del pixel cambiando la x e y en + o - 1, se puede aplicar gauss -> fuente Internet + video Javi R
            for(let j = y - 1; j <= (y + 1); j++){
                index = (i + j * imageDataR.width)* 4;
                r= r + imageDataR.data[index + 0];
                g= g + imageDataR.data[index + 1];
                b= b + imageDataR.data[index + 2];
            }
        }
        index = (x + y * imageDataR.width)* 4; 
        imageDataR.data[index + 0] = r/9;
        imageDataR.data[index + 1] = g/9;
        imageDataR.data[index + 2] = b/9;
    }

    // BLUR
    function blur(width, height){
        let imageDataR = ctx.getImageData(0,0,width, height);
        for(let x = 1; x < imageDataR.width -1; x++){
            for(let y = 1; y < imageDataR.height -1; y++){
                dibujarBlur(imageDataR, x,y);
            }
        }        
        ctx.putImageData(imageDataR, 0,0);
    }

    // GUARDAR IMAGEN
    // Asignación de evento
    document.getElementById("save-image").addEventListener("click", downloadImage);
    function downloadImage(){
        // Crea un enlace para descargar la imagen
        const link = document.createElement('a');
        link.download = 'download.jpg'; // Nombre genérico para guardar la imagen
        link.href = canvas.toDataURL();
        link.click();
        link.delete; // borramos el enlace
    }
    /////////////////// FIN
}
