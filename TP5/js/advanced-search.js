// RING LOADING -> BÚSQUEDA AVANZADA

let searchAdv = document.getElementById("btn-go-to-search").addEventListener("click", busquedaAvanzada);


function busquedaAvanzada() {
    setTimeout(() => {
        let ringLoader = document.getElementById("ring-loader");
        ringLoader.style.display = "flex";

    }, 1000);
    setTimeout(() => {
        let ringLoader = document.getElementById("ring-loader");
        ringLoader.style.display = "none";
        let resultadoBusquedas = document.querySelectorAll(".resultado-busqueda-avanzada");
        for (let i = 0; i < resultadoBusquedas.length; i++) {
            resultadoBusquedas[i].style.display = "block";  
        }          
        console.log(resultadoBusquedas);
        console.log('entra a buscar');
    }, 3000);

}

