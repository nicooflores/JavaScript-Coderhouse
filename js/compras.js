//---------------  VARIABLES
let cantCarrito = document.querySelector("#cantCarrito");
const carrito = JSON.parse(localStorage.getItem("carrito"));
let total = 0;
const precioTotal = document.querySelector("#precioTotal");

//---------------  FUNCIONES
// const valores = (valor) => {
//     let nuevo = '';
//     console.log(parseInt(valor.length));
//     if (valor.length > 3) {

//         if (valor.length % 3 == 0) {
//             let j = 3
//             for (let i = parseInt(valor.length / 3); i > 0; i--) {
//                 nuevo += valor.slice(j - 3, j) + ".";
//                 j += 3;
//                 console.log(nuevo+"1");
//             }
//         } else {
//             nuevo += valor.slice(0, valor.length % 3) + ".";
//             let j = valor.length % 3 + 3;
//             for (let i = parseInt(valor.length / 3); i > 0; i--) {
//                 nuevo += valor.slice(j - 3, j) + ".";
//                 j += 3;
//                 console.log(nuevo+"2");
//             }
//         }
//     } else {
//         nuevo = valor;
//         console.log(nuevo+"3");
//     }
//     if (nuevo[nuevo.length - 1] === ".") { 
//         // nuevo = nuevo.slice(0, nuevo.length - 1); 
//         nuevo = nuevo.pop();
//     }
//     return nuevo;
// }

const cargarCarrito = () => {
    let listaProductos = document.querySelector("#listaProductos");
    //Cargar lista de productos
    let cant = 0;
    for (let producto of carrito) {
        // let precio = valores(producto.precio);
        // console.log(precio);
        listaProductos.innerHTML += `
            <li class="list-group-item product" id = "list${producto.id}">
                <p class = "nombre">${producto.nombre}</p>
                <p class = "precio">$${producto.precio}</p>
                <div class = "cantidad">
                    <img src="/resources/images/dash.svg" alt="Menos" id="dash${producto.id}" onclick = "menosCant(this.id)">
                    <p id = "cant${producto.id}">${producto.cantidad}</p>
                    <img src="/resources/images/plus.svg" alt="Mas" id="plus${producto.id}" onclick = "masCant(this.id)">
                </div>
                <p class = "subtotal">$${producto.precio * producto.cantidad}</p>
                <div class = "borrar"><img src="/resources/images/trash.svg" alt="Tacho de Basura" id="borrar${producto.id}" onclick = "borrarProducto(this.id)"></div>
            </li>
            `
        cant += 1;
        total += producto.cantidad * producto.precio
    }
    precioTotal.innerText = total.toString();
    if (cant != 0) { cantCarrito.innerText = cant.toString(); }
}

const borrarProducto = (id) => {
    const idBorrar = id.substring(6);
    const index = carrito.findIndex((e) => e.id === idBorrar);
    carrito.splice(index, 1);
    const productoLista = document.querySelector("#list" + idBorrar);
    productoLista.remove();
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cantCarrito.innerText = carrito.length.toString();
}

const actualizarCant = (id, cantidad) => {
    const pCant = document.querySelector("#cant" + id);
    pCant.innerText = cantidad;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const masCant = (id) => {
    const idBorrar = id.substring(4);
    const productoMas = carrito.find((e) => e.id === idBorrar);
    productoMas.cantidad = parseInt(productoMas.cantidad) + 1;
    total += productoMas.precio;
    precioTotal.innerText = total;
    // console.log(carrito);
    actualizarCant(idBorrar, productoMas.cantidad);
}

const menosCant = (id) => {
    const idBorrar = id.substring(4);
    const productoMenos = carrito.find((e) => e.id === idBorrar);
    productoMenos.cantidad = parseInt(productoMenos.cantidad) - 1;
    total -= productoMenos.precio;
    precioTotal.innerText = total;
    // console.log(carrito);
    if (productoMenos.cantidad == 0) {
        borrarProducto("borrar" + idBorrar);
    }
    else {
        actualizarCant(idBorrar, productoMenos.cantidad);
    }
}


//--------------  EJECUCION
cargarCarrito();

const btnCancelar = document.querySelector("#btnCancelar");
btnCancelar.onclick = () => {
    if (confirm("Desea limpiar el carrito de compras?")) {
        carrito.splice(0, carrito.length);
        localStorage.removeItem('carrito');
        window.location.href = "/index.html";
    }
}

const btnConfirmar = document.querySelector("#btnConfirmar");
btnConfirmar.onclick = () => {
    alert("Gracias por su compra.");
    localStorage.removeItem("carrito");
}



