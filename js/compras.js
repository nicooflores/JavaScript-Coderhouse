//---------------  VARIABLES
let cantCarrito = document.querySelector("#cantCarrito");
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;
const precioTotal = document.querySelector("#precioTotal");
precioTotal.innerText = "$0";
const btnCancelar = document.querySelector("#btnCancelar");
const btnConfirmar = document.querySelector("#btnConfirmar");


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
                <p class = "subtotal" id = "sub${producto.id}" >$${producto.precio * producto.cantidad}</p>
                <div class = "borrar"><img src="/resources/images/trash.svg" alt="Tacho de Basura" id="borrar${producto.id}" onclick = "borrarProducto(this.id)"></div>
            </li>
            `
        cant += 1;
        total += producto.cantidad * producto.precio
    }
    precioTotal.innerText = "$" + total.toString();
    if (cant != 0) { cantCarrito.innerText = cant.toString(); }
}

const borrarProducto = (id) => {

    Swal.fire({
        title: '¿Deseas borrar el producto?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'Cancelar'
    })
    .then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Eliminado',
                // text: 'Your file has been deleted.',
                icon: 'success',
                timer: 1800,
                showConfirmButton: false,
            })
            const idBorrar = id.substring(6);
            const index = carrito.findIndex((e) => e.id === idBorrar);
            const cantBorrar = parseInt(document.querySelector("#cant" + idBorrar).innerText);
            total -= (parseInt(carrito[index].precio) * cantBorrar);
            precioTotal.innerText = "$" + total.toString();
            carrito.splice(index, 1);
            const productoLista = document.querySelector("#list" + idBorrar);
            productoLista.remove();
            localStorage.setItem("carrito", JSON.stringify(carrito));
            cantCarrito.innerText = carrito.length.toString();
            
        }
    })
}

const actualizarCant = (id, cantidad, precio) => {
    const pCant = document.querySelector("#cant" + id);
    pCant.innerText = cantidad;
    const pSub = document.querySelector("#sub" + id);
    pSub.innerText = "$" + (parseInt(cantidad) * parseInt(precio)).toString();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const masCant = (id) => {
    const idBorrar = id.substring(4);
    const productoMas = carrito.find((e) => e.id === idBorrar);
    productoMas.cantidad = parseInt(productoMas.cantidad) + 1;
    total += parseInt(productoMas.precio);
    precioTotal.innerText = "$" + total.toString();
    console.log(total, "--", productoMas.precio);
    // console.log(carrito);
    actualizarCant(idBorrar, productoMas.cantidad, productoMas.precio);
}

const menosCant = (id) => {
    const idBorrar = id.substring(4);
    const productoMenos = carrito.find((e) => e.id === idBorrar);

    if (productoMenos.cantidad == 1) {
        // console.log(borrado + "  after");
        borrarProducto("borrar" + idBorrar);
        // if (borrado) {
        //     total -= productoMenos.precio;
        //     precioTotal.innerText = "$" + total.toString();
            
        // }
        // console.log("se paso");
    }
    else {
        productoMenos.cantidad = parseInt(productoMenos.cantidad) - 1;
        actualizarCant(idBorrar, productoMenos.cantidad, productoMenos.precio);
        total -= productoMenos.precio;
        precioTotal.innerText = "$" + total.toString();
    }
}


//--------------  EJECUCION

carrito.length !== 0 && cargarCarrito();

btnCancelar.onclick = () => {

    Swal.fire({
        title: '¿Deseas Limpiar el Carrito?',
        text: "Perderas todos los productos cargados!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'Cancelar'
    })
    .then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Eliminado',
                // text: 'Your file has been deleted.',
                icon: 'success',
                timer: 1800,
                showConfirmButton: false,
            })
            carrito.splice(0, carrito.length);
            localStorage.removeItem('carrito');
            setTimeout(()=>{window.location.href = "../index.html";},1700);
        }
    })
}


btnConfirmar.onclick = () => {

    Swal.fire({
        title: '¿Desea proceder al pago de los productos?',
        text: 'El valor total de la compra es: $'+total,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',

        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
    })
    .then((result) => {
        if (result.isConfirmed) {window.location.href = "./pago.html";}
    })

}



