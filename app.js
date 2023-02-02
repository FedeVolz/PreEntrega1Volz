document.addEventListener('DOMContentLoaded', () => {

    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Pan',
            precio: 1350,
            imagen: './img/Pan.jpg'
        },
        {
            id: 2,
            nombre: 'Yerba',
            precio: 1190,
            imagen: './img/Yerba.jpg'
        },
        {
            id: 3,
            nombre: 'Queso',
            precio: 2500,
            imagen: './img/Queso.jpg'
        },
        {
            id: 4,
            nombre: 'Leche',
            precio: 1650,
            imagen: './img/Leche.jpg'
        }

    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    // Funciones

    /**    * Dibuja todos los productos a partir de la base de datos.    */

    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura

            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-3');

            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');

            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;

            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);

            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${divisa}${info.precio}`;

            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-dark');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', añadirProductoAlCarrito);

            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    /**    * Evento para añadir un producto al carrito de la compra    */

    function añadirProductoAlCarrito(evento) {
        
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        
        // Actualizamos el carrito 
        renderizarCarrito();
        
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */
    function renderizarCarrito() {
        
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${divisa}${miItem[0].precio}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();

    }

    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0);
    }

    /**
    * Varia el carrito y vuelve a dibujarlo
    */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.clear();

    }

    function guardarCarritoEnLocalStorage() {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage() {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});
// let items = [];
// let total = 0;
// let products = [
//     { name: "Pan", price: 250 },
//     { name: "Aceite", price: 500 },
//     { name: "Harina", price: 800 },
//     { name: "Yerba", price: 600 },
//     { name: "Mermelada", price: 350 }
// ];


// function addItem() {
//     let product = prompt("ingrese el producto que desea agregar o quitar del carrito de compras:");
//     let option = prompt("ingrese si desea agregar o quitar el producto del carrito de compras: agregar o quitar");
//     if (option === "Agregar") {
//         let product_obj = products.find(p => p.name === product);
//         if (product_obj) {
//             items.push(product_obj);
//             updateItemsList();
//         } else {
//             alert("producto no encontrado");
//         }
//     } else if (option === "Quitar") {
//         let index = items.findIndex(p => p.name === product);
//         if (index !== -1) {
//             items.splice(index, 1);
//             updateItemsList();
//         } else {
//             alert("producto no encontrado en el carrito de compras");
//         }
//     } else {
//         alert("opcion no valida")
//     }
// }

// function updateItemsList() {
//     let itemsList = document.getElementById("items");
//     itemsList.innerHTML = "";
//     total = 0;

//     for (let i = 0; i < items.length; i++) {
//         let product = items[i];
//         itemsList.innerHTML += "<li>" + product.name + " - $" + product.price + "</li>";
//         total += product.price;
//     }
// }

// function checkout() {
//     alert("Total de compra: $" + total);
// }




























// alert("Hola, acá podras elegir el tipo de cancha y cantidad de jugadores. ¡Bienvenido!");

// // Declaramos variables
// let cancha;
// let jugadores;

// // Comenzamos la funcion
// function futbol(cancha) {
//     switch (cancha) {
//         case 1:
//             alert("El precio de la cancha es de $2.000, cada jugador tendria que abonar $" + (2000 / jugadores));
//             break;
//         case 2:
//             alert("El precio de la cancha es de $4.000, cada jugador tendria que abonar $" + (4000 / jugadores));
//             break;
//         case 3:
//             alert("El precio de la cancha es de $6.000, cada jugador tendria que abonar $" + (6000 / jugadores));
//             break;
//         default:
//             alert("Opcion invalida, escoja opcion entre 1 y 3");
//             break;
//     }
// }

// // Definimos el do - while
// do {
//     cancha = Number(prompt("Seleccione la cancha que desea \n 1 = Cancha de 5 \n 2 = Cancha de 7 \n 3 = Cancha de 9"));
//     jugadores = Number(prompt("Seleccione la cantidad de jugadores"));

//     // Minimo de jugadores solicitados
//     if (jugadores < 5) {
//         alert("La cantidad minima de jugadores es 5")
//         break;

//         // Maximo de jugadores solicitados
//     } else if (jugadores > 18) {
//         alert("La cantidad maxima de jugadores es 18")
//         break;
//     }
//     futbol(cancha);
// } while (jugadores < 5 && jugadores > 18);
