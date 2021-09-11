function blur(imageData){
    let copia = [];
    let valor = 0;

   /* for(let x= 0; x < imageData.width; x++){
        copia[x] = [];
        for(let y = 0; y < imageData.height; y++){
            copia[x][y] = imageData[x][y];
        }
    }*/

    let index = (x + y * imageData.width)* 4;

    for(let x = 1; x < imageData.width - 1; x++){
        for(let y = 1; y < imageData.height - 1; y++){
            setPixel(imageData, x,y, valor);
            
            console.log("valor ", valor)
        }
    }
    function setPixel(imageData, x,y, valor){
        let index;
        let let r,g,b,a = 0;
        for (let i = x - 1; (x + 1); i++){
            for (let j = y - 1; (y + 1); j++){
                index = (i + j * imageData.width)* 4;
                r+= imageData.data[index + 0];
                g+= imageData.data[index + 1];
                b+= imageData.data[index + 2];
                a+= imageData.data[index + 3];
            }
        }

        index = (x + y * imageData.width)* 4;
        imageData.data[index + 0] = r/9;
        imageData.data[index + 1] = g/9;
        imageData.data[index + 2] = b/9;
        imageData.data[index + 3] = a/9;
    }
