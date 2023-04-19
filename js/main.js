
const carrito = [], stock = [];

class Productos {
    constructor(id, categoria, nombre, precio, cantidad) {
        this.id = id;
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

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

/*
const divProductos = document.querySelector("#divProductos");
divProductos.innerHTML = `
        <div class="col">
            <div class="card text-center mb-3" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">${ginBeefeaterPink.nombre}</h5>
                    <p class="card-text">Precio: ${ginBeefeaterPink.precio}</p>
                    <input type="number" min="0" value=0 id="cant${ginBeefeaterPink.id}">
                    <br>
                    <button type="button" class="btn btn-primary" id="btn${ginBeefeaterPink.id}">Comprar</button>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card text-center mb-3" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">${ginBeefeaterOrange.nombre}</h5>
                    <p class="card-text">Precio: ${ginBeefeaterOrange.precio}</p>
                    <input type="number" min="0" value=0 id="cant${ginBeefeaterOrange.id}">
                    <br>
                    <button type="button" class="btn btn-primary" id="btn${ginBeefeaterOrange.id}">Comprar</button>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card text-center mb-3" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">${ginBeefeaterLondon.nombre}</h5>
                    <p class="card-text">Precio: ${ginBeefeaterLondon.precio}</p>
                    <input type="number" min="0" value=0 id="cant${ginBeefeaterLondon.id}">
                    <br>
                    <button type="button" class="btn btn-primary" id="btn${ginBeefeaterLondon.id}">Comprar</button>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card text-center mb-3" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">${ginBombay.nombre}</h5>
                    <p class="card-text">Precio: ${ginBombay.precio}</p>
                    <input type="number" min="0" value=0 id="cant${ginBombay.id}">
                    <br>
                    <button type="button" class="btn btn-primary" id="btn${ginBombay.id}">Comprar</button>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card text-center mb-3" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">${ginBrighton.nombre}</h5>
                    <p class="card-text">Precio: ${ginBrighton.precio}</p>
                    <input type="number" min="0" value=0 id="cant${ginBrighton.id}">
                    <br>
                    <button type="button" class="btn btn-primary" id="btn${ginBrighton.id}">Comprar</button>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card text-center mb-3" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">${ginGordon.nombre}</h5>
                    <p class="card-text">Precio: ${ginGordon.precio}</p>
                    <input type="number" min="0" value=0 id="cant${ginGordon.id}">
                    <br>
                    <button type="button" class="btn btn-primary" id="btn${ginGordon.id}">Comprar</button>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card text-center mb-3" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">${ginHendrick.nombre}</h5>
                    <p class="card-text">Precio: ${ginHendrick.precio}</p>
                    <input type="number" min="0" value=0 id="cant${ginHendrick.id}">
                    <br>
                    <button type="button" class="btn btn-primary" id="btn${ginHendrick.id}">Comprar</button>
                </div>
            </div>
        </div>
`
*/
function agregarCarrito(id) {

    let cantidad = document.querySelector("#cant" + id);
    let posicion = carrito.findIndex(producto => producto.id === id); //-1 si no existe
    let producto = stock.find(producto => producto.id === id);

    console.log(cantidad.value);

    if (cantidad.value != "" && cantidad.value != 0) {
        if (posicion != -1) {
            carrito[posicion].cantidad = parseInt(carrito[posicion].cantidad) + parseInt(cantidad.value);
        }
        else {
            producto.cantidad = cantidad.value;
            carrito.push(producto);
        }
    }
    else{
        alert("Ingrese una cantidad válida.")
    }
}

function finalizarCompra() {
    let totalCosto = 0, totalCant = 0;
    for (const elemento of carrito) {
        totalCosto += parseFloat(elemento.precio) * parseInt(elemento.cantidad);
        totalCant += parseInt(elemento.cantidad);
    }

    confirm("El total de su compra de " + totalCant + " productos, es de:\n        $" + totalCosto);
}

const btnPink = document.querySelector("#btn" + ginBeefeaterPink.id);
btnPink.onclick = () => { agregarCarrito(ginBeefeaterPink.id); }
let btnOrange = document.querySelector("#btn" + ginBeefeaterOrange.id);
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


const btnFinalizar = document.querySelector("#btnFinalizar");
btnFinalizar.onclick = () => { finalizarCompra(); }













