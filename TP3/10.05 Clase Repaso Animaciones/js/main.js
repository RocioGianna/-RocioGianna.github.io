// Para que las animaciones arranquen cuando le hacemos click
// A cada objeto le asignamos una animación

let starC = document.querySelector("#star-container");
let star = starC.querySelector(".star"); // Sólo busco dentro de star-container
let spark = starC.querySelectorAll(".spark"); // dentro del contenedor star-container traigo todos 
let circle = starC.querySelector(".circle");

starC.addEventListener("click", () =>{
    // Cambiar animación que tiene vigente
    // @ts-ignore
    star.style.animationName = "none";
    // @ts-ignore
    circle.style.animationName = "none";
    // @ts-ignore
    spark.forEach(s => s.style.animationName = "none");   
    setTimeout(() => {
        // hacemos lo opuesto a lo que está arriba
        // @ts-ignore
        star.style.animationName = "starMovement";
        // @ts-ignore
        circle.style.animationName = "borderMovement";
        // @ts-ignore
        spark.forEach(s => s.style.animationName = "sparkMovement");
    }, 0);
});