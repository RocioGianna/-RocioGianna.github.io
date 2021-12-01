// @ts-nocheck

// SEND presionando ENTER

let clickEnter = document.getElementById("nuevo-mensaje-cuerpo").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   enviarMensaje();
  }
});

// Click en botón SEND
let btnSend = document.getElementById("btn-send-mensaje").addEventListener("click", enviarMensaje);

let cuerpoChat = document.getElementById("cuerpo-conversacion");

// Hora de inicio del chat

// Hora Actual
let options = {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
  formatter = new Intl.DateTimeFormat([], options);
let horaInicio = formatter.format(new Date());
console.log(horaInicio);

let horaInicioChat = document.getElementById("hora-inicio-chat");
horaInicioChat.innerHTML = horaInicio;




let nuevoTextoUsuarioRegistrado;

function enviarMensaje(){

    // Hora Actual
    let options = {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: 'numeric',
        minute: 'numeric',
      },
      formatter = new Intl.DateTimeFormat([], options);
    let horaActual = formatter.format(new Date());
    console.log(horaActual);

    // @ts-ignore
    nuevoTextoUsuarioRegistrado = document.getElementById("nuevo-mensaje-cuerpo").value;
    console.log("texto: ", nuevoTextoUsuarioRegistrado);
    let imgUsuario = document.createElement("img");
    let cuerpoMensaje = document.createElement("p");
    let divContenedor = document.createElement("div");
    divContenedor.classList.add("datos-mensaje");
    let btnEliminarMsj = document.createElement("button");
    let imgEliminarMsj = document.createElement("img");
    let horaMensaje = document.createElement("p");
    horaMensaje.innerHTML = horaActual;
    horaMensaje.classList.add("hora-mensaje");
    cuerpoMensaje.innerHTML = nuevoTextoUsuarioRegistrado;
    imgUsuario.src = "img/perfiles-usuario/profile-feed.png";
    imgEliminarMsj.src = "img/logos/borrar.png";
    imgEliminarMsj.classList.add("img-delete-mensaje");
    btnEliminarMsj.appendChild(imgEliminarMsj);
    btnEliminarMsj.classList.add("btn-eliminar-mensaje");
    imgUsuario.classList.add("img-mensaje-chat");
    let nuevoDiv = document.createElement("div");
    nuevoDiv.classList.add("new-mensaje-usuario-reg");
    nuevoDiv.appendChild(cuerpoMensaje);    
    nuevoDiv.appendChild(imgUsuario);                 
    divContenedor.appendChild(nuevoDiv);  
    divContenedor.appendChild(horaMensaje);     
    cuerpoChat.appendChild(divContenedor);  
    cuerpoChat.appendChild(btnEliminarMsj);
    setTimeout(()=> {mandarRespuesta()}, 2000);    

    // Eliminar mensaje

    let botonesEliminar = document.querySelectorAll(".btn-eliminar-mensaje");    
    for (let i = 0; i < botonesEliminar.length; i++) {
        botonesEliminar[i].addEventListener("click", function() {
            let aEliminar = botonesEliminar[i].previousElementSibling;            
            aEliminar.style.display = "none";
            botonesEliminar[i].style.display = "none";
            
        });
    }          
   
}


function mandarRespuesta(){

    // Hora Actual
    let options = {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: 'numeric',
        minute: 'numeric',
      },
      formatter = new Intl.DateTimeFormat([], options);
    let horaActual = formatter.format(new Date());
    console.log(horaActual);

    let respuesta;

    let imgUsuario = document.createElement("img");
    let cuerpoMensaje = document.createElement("p");
    // Switch para posibles respuestas
    switch (nuevoTextoUsuarioRegistrado) {
        case "hola":              
            respuesta = "¿Cómo estás?";
            break;
        case "Bien y vos?":
            respuesta = "Bien bien, gracias!";
            break;
        case "Me alegro":
            respuesta = "Yo por vos!";
            break;
        case "Quisiera contactarte para conocer a los cachorros que das en adopción..":
            respuesta = "Bueno, son 3 cachorros. Dos machos y una hembra.";
            break;
        case "Quizás en otro momento..":
            respuesta = "Está bien. Nos vemos..";   
            break;                
        case "Muchas gracias":
            respuesta = "Gracias a vos.";
            break;
        case "Adiós!":
            respuesta = "Adiós!!";
            break;
    }

    let horaMensaje = document.createElement("p");
    horaMensaje.innerHTML = horaActual;
    horaMensaje.classList.add("hora-mensaje-dest");

    cuerpoMensaje.innerHTML = respuesta;
    imgUsuario.src = "img/perfiles-usuario/agustina-lopez.png";
    imgUsuario.classList.add("img-mensaje-chat");
    let divContenedorDest = document.createElement("div");
    divContenedorDest.classList.add("cuerpo-mensaje-dest");
    let nuevoDiv = document.createElement("div");
    nuevoDiv.classList.add("new-mensaje-usuario-destinatario");
    
    nuevoDiv.appendChild(imgUsuario); 
    nuevoDiv.appendChild(cuerpoMensaje); 
    divContenedorDest.appendChild(horaMensaje);
    divContenedorDest.appendChild(nuevoDiv);
    cuerpoChat.appendChild(divContenedorDest);
    document.getElementById("nuevo-mensaje-cuerpo").value = "";
}

// Actualizar scroll del chat
// Cuando el usuario no hace scroll el chat se actualiza para mostrar los mensajes más recientes
// Si el usuario hace scroll, espera unos segundos y después hace el scroll automático

let scrolled = false;

function updateScroll(){
    console.log("scrolled: ", scrolled);
    if (!scrolled){
        let conversacion = document.getElementById("cuerpo-conversacion");
        conversacion.scrollTop = conversacion.scrollHeight;
    }
    setTimeout(()=> {scrolled = false;}, 2000);   
    
}

document.getElementById("cuerpo-conversacion").addEventListener("scroll", function(){
    scrolled=true;
    console.log("scrolled: ", scrolled);
});

setInterval(updateScroll,4000);

