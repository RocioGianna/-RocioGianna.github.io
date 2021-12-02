document.getElementById("btn-menu").addEventListener("click", toogle);

function toogle() {
    let f = document.getElementById("footer");
    let publicaciones = document.querySelectorAll(".card");
    let newPublicacion = document.querySelector(".new-publication-feed");
    let x = document.getElementById("menu");

    if (x.style.display === "block") {
        x.style.display = "none";
              
        for (let i = 0; i < publicaciones.length; i++){
            // @ts-ignore
            console.log(publicaciones);
            let elminar = publicaciones[i];
            elminar.style.display = "block";

        }
        
        f.style.display = "block";
    } else {
        x.style.display = "block";
        for (let i = 0; i < publicaciones.length; i++){
            publicaciones[i].style.display = "none";
            
        }
        f.style.display = "none";
        newPublicacion.style.display = "none";
    }
}