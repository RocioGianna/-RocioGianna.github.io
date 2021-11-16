Entregable 3
===============

## Pasar a POO

1. ~~Personaje.~~
2. ~~Obstáculo.~~
3. ~~Gema.~~
4. ~~Movimientos del personaj.e~~

## Acomodar/implementar
-----------------------------------------------------------------------------
### Juego
0. **Inicio**
    - ~~Mostrar indicaciones del juego.~~
        - ~~Mostrar objetivo:~~
            - ~~Objetivo mínimo: Juntar 6 gemas de cualquier tipo.~~
        - ~~Muerte: te chocás 3 veces un obstáculo.~~   
1. **Fin**
    - ~~Mostrar pantalla de fin del juego: ***-> Juan***~~
        - ~~Caso de quedarse sin vidas (perdió). ***-> Juan***~~
        - ~~Caso en el que gana. ***-> Juan***~~
2. **Lógica del juego:**
    - ~~Mantener actualizadas las vidas del personaje.~~
    - ~~Mantener actualizada la puntuación (acomodar innerHTML -> ver último commit de la entrega original). ***-> Juan***~~
    - **Colisiones:**
        - ~~Con las gemas (acomodar). ***-> Juan***~~
        - ~~Con los obstáculos (acomodar: una vez que la esquiva saltando se hace INMUNE) ***-> Juan***~~
    - ~~Muerte.~~
    - ~~Salto:~~
        - ~~Acomodar dentro del gameloop para que sólo salte presionando la tecla y no con la tecla apretada.~~
3. **Parte visual:**
    - ~~Mostrar vidas del personaje.~~
    - ~~Mostrar puntuación.~~
    - ~~Agrandar tamaño de letra de puntuación y de vidas.~~
    - ~~Acomodar parte Responsive. Definir endpoints entre ambos monitores. ***-> Rocío***~~
    - **Muerte/caida:**
        - ~~Acomodar keyframe de muerte. ***-> Rocío***~~
            - ~~Darle un tiempo más: mostrar una caída y luego el gif de que perdió.~~
        - ~~Acomodar keyframe de caída. ***-> Rocío***~~
    - **Obstáculo:**
        - ~~Se mueva junto con el fondo.~~
        - ~~Animación/transformación.~~
    - **Gema:**
        - ~~Animación/transformación cuando se logra juntar la gema. ***-> Juan y Rocío***~~
    - **Parallax:**
        - ~~Acomodar imágenes: hay un par de imágenes de un tamaño, y otro par de otro.~~ ***-> Rocío***
        - ~~Agregar otro juego de parallax.~~
        - ~~En el menú tenemos que dar la opción de cambiar el fondo. ***-> Juan y Rocío***~~
    - **Inicio:**
        - ~~Aplicarle un fondo a cada recuadro: ver último commit (ya está implementado).***-> Juan***~~
        - ~~Colores a las letras. ***-> Juan***~~
        - ~~Background indicatios page.***-> Juan***~~
        - ~~Acomodar indicaciones.***-> Juan***~~
    - **Pérdida y victoria**
        - ~~Pérdida: mostrar algún mensaje más.~~
        - ~~Victoria: mostrar la puntuación final que obtuvo.~~
        - ~~Agregar imágenes decorativas de Avengers en ambas.~~
4. **Documentación.**
    - Verificar las siguientes clases:
        - ~~Juego.js.~~
        - ~~Gema.js.~~
        - ~~Obstaculo.js.~~
        - ~~Personaje.js.~~
        - ~~Ordenar código CSS.~~
        - ~~Documentar los keyframes que tenemos:~~
            - ~~Caminar.~~
            - ~~Caer.~~
            - ~~Saltar.~~
            - ~~Gema.~~

#### Avanzamos desde el commit Colision gemas 2.0

5. **Comentarios Marcos**

- ~~Animaciones keyframe (S): caminata, caída.~~
- ~~No funciona la lógica de agacharse. -> no lo vamos a implementar.~~
- ~~La animación de saltar parece ser un único frame: por las dudas lo miramos.~~
- ~~Cuando el personaje se choca un obstáculo muestra una animación de caída. Las animaciones no pegan, después de saltar se queda trabada con la imagen de salto.~~ 
- ~~Parallax correcto, no se puede cambiar ni el personaje, ni el fondo (anotado antes)~~ 
- ~~Hay issues con las colisiones hay veces que saltas la piedra pero igual pierdes una vida. El juego es sensible al cambio de tamaño de pantalla, los elementos se desordenan -> **acomodar la detección de colisión**~~
- ~~Código: Algo de código comentado que no se usa.~~

