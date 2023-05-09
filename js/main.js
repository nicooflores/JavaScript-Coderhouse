//-------------------- VARIABLES
const stock = [], carrito = [];
let cantCarrito = document.querySelector("#cantCarrito");

//-------------------- CONSTRUCTORES
class Productos {
    constructor(id, categoria, nombre, precio, cantidad) {
        this.id = id;
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

//-------------------- FUNCIONES
const cargarProductos = (producto) => {
    const divProductos = document.querySelector("#divProductos");
    divProductos.innerHTML += `
        <div class="col">
            <div class="card text-center mb-3" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <input type="number" min="0" value=0 id="cant${producto.id}">
                    <button type="button" class="btn btn-outline-primary" id="btn${producto.id}">Comprar</button>
                </div>
            </div>
        </div>
    `
}

const agregarCarrito = (id) => {

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
    }
    else {
        alert("Ingrese una cantidad válida.")
    }
    console.log(carrito)
}

const finalizarCompra = () => {
    let totalCosto = 0, totalCant = 0;
    for (const elemento of carrito) {
        totalCosto += parseFloat(elemento.precio) * parseInt(elemento.cantidad);
        totalCant += parseInt(elemento.cantidad);
    }

    confirm("El total de su compra de " + totalCant + " productos, es de:\n        $" + totalCosto);
}


//Carga de stock
const ginBeefeaterPink = new Productos("Pink", "Bebidas", "Gin Beefeater London Pink", 8000, 0);
const ginBeefeaterOrange = new Productos("Orange", "Bebidas", "Gin Beefeater London Orange", 8000, 0);
const ginBeefeaterLondon = new Productos("London", "Bebidas", "Gin Beefeater London", 7000, 0);
const ginBombay = new Productos("Bombay", "Bebidas", "Gin Bombay Sapphire", 9000, 0);
const ginBrighton = new Productos("Brighton", "Bebidas", "Gin Brighton", 5000, 0);
const ginGordon = new Productos("Gordon", "Bebidas", "Gin Gordon's", 6000, 0);
const ginHendrick = new Productos("Hendrick", "Bebidas", "Gin Hendrick's", 12000, 0);
stock.push(ginBeefeaterPink);
stock.push(ginBeefeaterOrange);
stock.push(ginBeefeaterLondon);
stock.push(ginBombay);
stock.push(ginBrighton);
stock.push(ginGordon);
stock.push(ginHendrick);

for (const producto of stock) {
    cargarProductos(producto);
}

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



//Index

const btnPink = document.querySelector("#btn" + ginBeefeaterPink.id);
btnPink.onclick = () => { agregarCarrito(ginBeefeaterPink.id); }
const btnOrange = document.querySelector("#btn" + ginBeefeaterOrange.id);
btnOrange.onclick = () => { agregarCarrito(ginBeefeaterOrange.id); }
const btnLondon = document.querySelector("#btn" + ginBeefeaterLondon.id);
btnLondon.onclick = () => { agregarCarrito(ginBeefeaterLondon.id); }
const btnBombay = document.querySelector("#btn" + ginBombay.id);
btnBombay.onclick = () => { agregarCarrito(ginBombay.id); }
const btnBrighton = document.querySelector("#btn" + ginBrighton.id);
btnBrighton.onclick = () => { agregarCarrito(ginBrighton.id); }
const btnGordon = document.querySelector("#btn" + ginGordon.id);
btnGordon.onclick = () => { agregarCarrito(ginGordon.id); }
const btnHendrick = document.querySelector("#btn" + ginHendrick.id);
btnHendrick.onclick = () => { agregarCarrito(ginHendrick.id); }

const btnCarrito = document.querySelector("#btnCarrito");
btnCarrito.onclick = () => {
    let carritoJson = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJson);
    carrito.slice(0, carrito.length);
    window.location.href = "/pages/compras.html";
}


