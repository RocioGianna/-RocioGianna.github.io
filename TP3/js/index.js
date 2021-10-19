let walks = document.getElementById("character-walks");
let jumps = document.getElementById("character-jump");
//let standBy = document.getElementById("character-quiet");
let attacks = document.getElementById("character-attack");

let algo; 

document.addEventListener('keydown', (e)=>{
    console.log(e.keyCode);
    if(e.keyCode == 38){ /** https://keycode.info/ */
        //algo = setInterval(jump, 200 );  
        //setTimeout(jump, 200);
        jump();      
    }
    // if(e.keyCode == 39){ /** https://keycode.info/ */
    //     walk();
    // }
    if (e.keyCode == 32){
        attack();
    }
})


document.addEventListener('keyup', (e)=>{
    if(e.keyCode == 38){ /* arrow up */ 
        console.log('levanté la flecha de arriba');
        walks.style.display = 'block';
        jumps.style.display = 'none';      
        
        //clearInterval(algo);
        //console.log('algo', algo);
    }
    if (e.keyCode == 32){
        attacks.style.display = 'none';      
        walks.style.display = 'block';
    }
})

function jump(){
    walks.style.display = 'none';
    jumps.style.display = 'block';
    //standBy.style.display = 'none';
}

// // function walk(){
// //     jumps.style.display = 'none';
// //     walks.style.display = 'block';
// //     //standBy.style.display = 'none';    
// // }

function attack(){
    walks.style.display = 'none';
    attacks.style.display = 'block';
}