// Obtener id de la galería para trabajar con el cambio de imágenes
let imageGallery = document.getElementById("imageGallery");
let idImage = 1;
// window.addEventListener('load', (event) =>{
//  console.log('carga audio');
//  playBackgroundSong();   
// })

// Cambio de imágenes en la galería de la pantalla inicial
function playGallery(){
    if (idImage > 3){
        idImage = 0;
    }
    // @ts-ignore
    imageGallery.src = "img/image-gallery-" + idImage + ".jpg";    
    idImage++;
    setTimeout(playGallery, 1000);
}

// function playBackgroundSong(){
//     let audioBackground = new Audio("audio/background_index.mp3");
//     audioBackground.play();
// }
playGallery();

