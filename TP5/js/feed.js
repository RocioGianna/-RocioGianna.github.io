document.addEventListener('DOMContentLoaded', function() {
    var images = [
        "img/publicaciones/mirada-perros.png",
        "img/publicaciones/razas-perro-pequenos-grandes-a.jpg",
        "img/publicaciones/perro.jpg"
    ];

    var index = 0;
    var img = document.querySelector(".img-prueba-feed");
    img.src = images[index];

    document.getElementById("btn-img-anterior").addEventListener("click", function () {
        images[index]
        console.log(img);
        if (index > 0) {
            index--;
            img.src = images[index];
        }
    } );

    document.getElementById("btn-img-siguiente").addEventListener("click", function () {
        images[index]
        if (index < images.length -1) {
            index++;
            img.src = images[index];
        }
    } );

});
