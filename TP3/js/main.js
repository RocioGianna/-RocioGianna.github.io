// Crear elementos del juego
let Captain = new Personaje("Capitán America");
let obstaculo = new Obstaculo(400, 620);  //hay que ver el tema de la posicion top left cuando gire junto con el fondo 


let juego = new Juego(Captain, obstaculo);
juego.initGame();

