const listaPrecios = {
    procesador: 62000,
    mother : 28500,
    monitor : 31000,
    ram : 18000,
    chasis : 8000,
    kit : 7500
}
const carrito = {
    items : 0,
    precio: 0,
    cuotas: 0
}
// Funcion que evalua que producto se clickeo y añade su precio y cantidad al carrito
const añadirProducto = e => {
    let action = e.target.id;
    console.log(listaPrecios[action])
    carrito.precio +=listaPrecios[action];
    carrito.items++;
} 
// Evalua la cantidad de cuotas ingresadas
const procesarCuotas = () => {
    let c = carrito.cuotas ? carrito.cuotas : parseInt(prompt('Ingrese Cantidad de Cuotas: 1 - 18'));
    if (c === 1) {
        carrito.cuotas = c;
        document.querySelector('#salidaCuotas').textContent = `Se cobrara la totalidad de la compra en un solo pago.`;
    } else if (c > 1 && c <= 18) {
        carrito.cuotas = c;
        valorCuota = (carrito.precio/carrito.cuotas).toLocaleString('en-IN', {style: 'currency',currency: 'USD', minimumFractionDigits: 2});
        document.querySelector('#salidaCuotas').textContent = `Se procesara la compra por ${carrito.cuotas} de ${valorCuota} ARS c/u.`;
    } else {
        alert('Favor ingrese un número valido de 1 hasta 18 cuotas');
        procesarCuotas();
    }
}

const cargarPrecios = () => {
    console.log(`Total a pagar ${carrito.precio} $ARS`);
    precio = carrito.precio.toLocaleString('en-IN', {style: 'currency',currency: 'USD', minimumFractionDigits: 2})
    document.querySelector('#salidaPrecio').textContent = `Total a pagar ${precio} ARS (Impuestos incluidos)`
}

const actualizarItems = () => document.querySelector('#salidaItems').textContent = ` ${carrito.items} ${carrito.items > 1 ? 'Productos' : 'Producto'} actualmente en el carrito.`;
// Muestra/Oculta el modal de salida
const toggler = () => {
    document.querySelector('#staticBackdrop').classList.toggle('d-flex')
    document.querySelector('#staticBackdrop').classList.toggle('show')
} 

// Muesra en pantalla la salida de la cotizacion
const mostrarCarrito = () => {
    if (carrito.items) {
        procesarCuotas();
        cargarPrecios();
        actualizarItems()
        toggler()
    } else {
        alert('Aun no tiene productos en el carrito, intente añadir alguno antes de Cotizar.')
    }
}

//Se añaden la funcionalidades al dar click en los botones.
const botonCerrar = document.querySelector('#cerrar');
const botonVolver = document.querySelector('#volver');
const botonPagar = document.querySelector('#pagar');
const button = document.querySelector('#boton');
botonCerrar.addEventListener('click',toggler)
botonVolver.addEventListener('click',toggler)
botonPagar.addEventListener('click', () => location.reload())
button.addEventListener('click', mostrarCarrito);

const botonesCompra = document.getElementsByClassName('carrito')
// Se recorre el array de los botones de compra para agregar la funcion añadir
for (let i = 0; i < botonesCompra.length; i++) {
    botonesCompra[i].addEventListener('click', añadirProducto)
}