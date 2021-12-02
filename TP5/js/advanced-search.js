// RING LOADING -> BÚSQUEDA AVANZADA

let searchAdv = document.getElementById("btn-go-to-search").addEventListener("click", busquedaAvanzada);


function busquedaAvanzada(){
    setTimeout(()=> {
        let ringLoader = document.getElementById("ring-loader");
        ringLoader.style.display = "flex";
    
    }, 1000);
    setTimeout(()=> {
        let ringLoader = document.getElementById("ring-loader");
        ringLoader.style.display = "none";
        let resultadoBusqueda = document.getElementById("resultado-busqueda-avanzada");
     resultadoBusqueda.style.display = "block";
     console.log('entra a buscar');
    }, 3000);
    
}

