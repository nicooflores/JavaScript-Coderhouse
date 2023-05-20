//-------------------- VARIABLES
const carrito = [], stock = [];
let cantCarrito = document.querySelector("#cantCarrito");

//-------------------- FUNCIONES
const cargarProductos = (producto) => {
    const divProductos = document.querySelector("#divProductos");
    divProductos.innerHTML += `
        <div class="col">
            <div class="card text-center mb-3" style="width: 20rem; height: 202px;">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <input type="number" min="0" value=0 id="cant${producto.id}">
                    <button type="button" class="btn btn-outline-primary" id="btn${producto.id}" onclick = "agregarCarrito(this.id)">Comprar</button>
                </div>
            </div>
        </div>
    `
}

const agregarCarrito = (identificador) => {
    const id = identificador.substring(3);
    let cantidad = document.querySelector("#cant" + id);
    let posicion = carrito.findIndex(producto => producto.id === id); //-1 si no existe
    let producto = stock.find(producto => producto.id === id);

    if (cantidad.value != "" && cantidad.value != 0) {
        if (posicion != -1) {
            carrito[posicion].cantidad = parseInt(carrito[posicion].cantidad) + parseInt(cantidad.value);
        }
        else {
            producto.cantidad = cantidad.value;
            carrito.push(producto);
            let cant;
            if(parseInt(cantCarrito.innerText)){
                cant = parseInt(cantCarrito.innerText) + 1;
            }else{
                cant = 1;
            }
            console.log(cant);
            cantCarrito.innerText = cant.toString();
        }
        cantidad.value = 0;
        Toastify({
            text: "Producto Agregado!",
            duration: 3000,
            gravity: 'top',
            position: 'right',
            style: {
                background: 'linear-gradient(to right, #00b09b, #96c92d)'
            }
        }).showToast();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Ingrese una cantidad Válida.'
        })
    }
    
}

const finalizarCompra = () => {
    let totalCosto = 0, totalCant = 0;
    for (const elemento of carrito) {
        totalCosto += parseFloat(elemento.precio) * parseInt(elemento.cantidad);
        totalCant += parseInt(elemento.cantidad);
    }

    confirm("El total de su compra de " + totalCant + " productos, es de:\n        $" + totalCosto);
}




const cargaStock = async() =>{
    const datos = await fetch("./js/datos.js")
    .then((resp)=>resp.json())
    .then((datos)=>{
        datos.forEach((producto) => {
            cargarProductos(producto);
            stock.push(producto);
        });
    })
}
cargaStock();


//Carga del carrito del local storage
const carritoExistente = JSON.parse(localStorage.getItem("carrito"));
if (carritoExistente) {
    let cant = 0;
    for (const producto of carritoExistente) {
        carrito.push(producto);
        cant += 1;
    }
    if(cant!=0){cantCarrito.innerText = cant.toString();}
}

const btnCarrito = document.querySelector("#btnCarrito");
btnCarrito.onclick = () => {
    let carritoJson = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJson);
    carrito.slice(0, carrito.length);
    window.location.href = "../pages/compras.html";
}


