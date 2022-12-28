alert("Hola, acá podras elegir el tipo de cancha y cantidad de jugadores. ¡Bienvenido!");

// Declaramos variables
let cancha;
let jugadores;

// Comenzamos la funcion
function futbol(cancha) {
    switch (cancha) {
        case 1:
            alert("El precio de la cancha es de $2.000, cada jugador tendria que abonar $" + (2000 / jugadores));
            break;
        case 2:
            alert("El precio de la cancha es de $4.000, cada jugador tendria que abonar $" + (4000 / jugadores));
            break;
        case 3:
            alert("El precio de la cancha es de $6.000, cada jugador tendria que abonar $" + (6000 / jugadores));
            break;
        default:
            alert("Opcion invalida, escoja opcion entre 1 y 3");
            break;
    }
}

// Definimos el do - while
do {
    cancha = Number(prompt("Seleccione la cancha que desea \n 1 = Cancha de 5 \n 2 = Cancha de 7 \n 3 = Cancha de 9"));
    jugadores = Number(prompt("Seleccione la cantidad de jugadores"));

    // Minimo de jugadores solicitados
    if (jugadores < 5) {
        alert("La cantidad minima de jugadores es 5")
        break;

        // Maximo de jugadores solicitados
    } else if (jugadores > 18) {
        alert("La cantidad maxima de jugadores es 18")
        break;
    }
    futbol(cancha);
} while (jugadores < 5 && jugadores > 18);
