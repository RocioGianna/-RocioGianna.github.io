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
    - Mostrar pantalla de fin del juego:
        - Caso de quedarse sin vidas (perdió).
        - Caso en el que gana.
2. **Lógica del juego:**
    - ~~Mantener actualizadas las vidas del personaje.~~
    - Mantener actualizada la puntuación (acomodar innerHTML -> ver último commit de la entrega original).
    - **Colisiones:**
        - Con las gemas (acomodar).
        - Con los obstáculos (acomodar: una vez que la esquiva saltando se hace INMUNE)
    - Muerte.
    - Salto:
        - ~~Acomodar dentro del gameloop para que sólo salte presionando la tecla y no con la tecla apretada.~~
3. **Parte visual:**
    - ~~Mostrar vidas del personaje.~~
    - ~~Mostrar puntuación.~~
    - Acomodar parte Responsive. Definir endpoints entre ambos monitores.
    - ~~**Muerte/caida:**~~
        - Acomodar keyframe de muerte.
        - Acomodar keyframe de caída.
    - **Obstáculo:**
        - ~~Se mueva junto con el fondo.~~
        - ~~Animación/transformación.~~
    - **Gema:**
        - Animación/transformación cuando se logra juntar la gema.
    - **Parallax:**
        - ~~Acomodar imágenes: hay un par de imágenes de un tamaño, y otro par de otro.~~
        - En el menú tenemos que dar la opción de cambiar el fondo.
    - **Inicio:**
        - Aplicarle un fondo a cada recuadro: ver último commit (ya está implementado).
        - Colores a las letras. 
        - Background indicatios page.
4. **Documentación.**
    - Verificar las siguientes clases:
        - Juego.js.
        - Gema.js.
        - Obstaculo.js
        - Personaje.js

### Avanzamos desde el commit Colision gemas 2.0

5. Comentarios Marcos

- Animaciones keyframe (S): caminata, caída. 
- ~~No funciona la lógica de agacharse. -> no lo vamos a implementar.~~
- La animación de saltar parece ser un único frame: por las dudas lo miramos.
- Cuando el personaje se choca un obstáculo muestra una animación de caída. Las animaciones no pegan, después de saltar se queda trabada con la imagen de salto. 
- ~~Parallax correcto, no se puede cambiar ni el personaje, ni el fondo (anotado antes)~~ 
- Hay issues con las colisiones hay veces que saltas la piedra pero igual pierdes una vida. El juego es sensible al cambio de tamaño de pantalla, los elementos se desordenan -> **acomodar la detección de colisión**
- ~~Código: Algo de código comentado que no se usa.~~

