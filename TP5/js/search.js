

function mostrarResultados() {
    setTimeout(() => {
        let ringLoader = document.getElementById("ring-loader");
        ringLoader.style.display = "flex";

    }, 400);
    setTimeout(() => {
        let ringLoader = document.getElementById("ring-loader");
        ringLoader.style.display = "none";
        let search = document.getElementById("busqueda-simple");
        search.style.display = "block";
        console.log('entra a buscar');
    }, 3000);
}

mostrarResultados();