let salto = document.getElementById("personajeSalt");
let caminar = document.getElementById("personaje");
let stand = document.getElementById("personajeSB");

document.addEventListener('keydown', (e)=>{
    console.log(e.keyCode)
    if(e.keyCode == 38){
        saltar();        
    }
    if(e.keyCode == 39){
        walk();
    }
})

document.addEventListener('keyup', (e)=>{
    if(e.keyCode == 38){
        stand.style.display = 'block';
    }
    if(e.keyCode == 39){
        caminar.style.display = 'none';
        stand.style.display = 'block';
    }

})

function saltar(){
    caminar.style.display = 'none';
    salto.style.display = 'block';
    setTimeout(()=>{ //esto no funciona del todo bien, tampoco se si es correcto hacerlo asi ... podemos consultar
        salto.style.display = 'none';
        caminar.style.display = 'block';
    }, 1000);
}

function walk(){
    caminar.style.display = 'block';
    stand.style.display = 'none';
}