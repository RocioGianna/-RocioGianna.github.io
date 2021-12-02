let btn = document.getElementById("notifications-button").addEventListener("click", mostrarNotificaciones);

let mostrandoNotificaciones = false;

function mostrarNotificaciones(){
    console.log("mostrar notificaciones: ", mostrandoNotificaciones);
    let cantNotificaciones = document.querySelector(".cant-notificaciones");
    if (!mostrandoNotificaciones){
        let tituloNotificaciones = document.getElementById("titulo-notificaciones");
        let notificaciones = document.querySelectorAll(".cuerpo-notificacion");
        console.log("muestro noficiaciones");
        cantNotificaciones.style.display = "none";
        tituloNotificaciones.style.display = "flex";
        for (let i = 0; i < notificaciones.length; i++) {
            notificaciones[i].style.display = "flex";
        }        
        console.log("mostrar notificaciones: ", mostrandoNotificaciones); 
        mostrandoNotificaciones = true; 
    }else{
        
        console.log("mostrar notificaciones: ", mostrandoNotificaciones);
        let tituloNotificaciones = document.getElementById("titulo-notificaciones");
        let notificaciones = document.querySelectorAll(".cuerpo-notificacion");
        console.log("oculto noficiaciones");
        tituloNotificaciones.style.display = "none";
        for (let i = 0; i < notificaciones.length; i++) {
            notificaciones[i].style.display = "none";
        }
        mostrandoNotificaciones = false; 
        console.log("mostrar notificaciones: ", mostrandoNotificaciones);   
    } 
    console.log("mostrar notificaciones: ", mostrandoNotificaciones);   
}


