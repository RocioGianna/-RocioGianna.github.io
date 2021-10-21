let character = document.getElementById("character");


document.addEventListener('keydown', (e)=>{
    console.log(e.keyCode);
    if(e.keyCode == 38){ 
        jump();      
    }
    if (e.keyCode == 32){
        attack();
    }
})


document.addEventListener('keyup', (e)=>{
    if(e.keyCode == 38){ /* arrow up */ 
        character.classList.remove("character-jump");
        character.classList.add("character");    
        
        //clearInterval(algo);
        //console.log('algo', algo);
    }
    if (e.keyCode == 32){
        character.classList.add("character");
        character.classList.remove("character-attack");
    }
})

function jump(){
    character.classList.remove("character");
    character.classList.add("character-jump");
}

function attack(){
    character.classList.remove("character");
    character.classList.add("character-attack");
}