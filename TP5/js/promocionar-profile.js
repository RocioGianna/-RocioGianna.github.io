let boton = document.getElementById("btn-promocionar-publicacion");
boton.addEventListener("click", promocionar);

function promocionar(){
    boton.style.display = "none";
    let resultado = document.getElementById("oculto");
    resultado.style.display = "flex";
}

