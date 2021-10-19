let walks = document.getElementById("character-walks");
let jumps = document.getElementById("character-jump");
//let standBy = document.getElementById("character-quiet");

document.addEventListener('keydown', (e)=>{
    console.log(e.keyCode)
    if(e.keyCode == 38){ /** https://keycode.info/ */
        jump();        
    }
    if(e.keyCode == 39){ /** https://keycode.info/ */
        walk();
    }
})


document.addEventListener('keyup', (e)=>{
    if(e.keyCode == 38){ /* arrow up */ 
        jumps.style.display = 'none';      
        walks.style.display = 'block';
       
    }
    // if(e.keyCode == 39){ /* arrow right */
    //     //walks.style.display = 'none';
    //     jumps.style.display = 'none';
    //     //standBy.style.display = 'block';
    // }
})

function jump(){
    walks.style.display = 'none';
    jumps.style.display = 'block';
    //standBy.style.display = 'none';
}

function walk(){
    jumps.style.display = 'none';
    walks.style.display = 'block';
    //standBy.style.display = 'none';
    
}