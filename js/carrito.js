const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-producto');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners () {
    productos.addEventListener('click', comprar);
    carrito.addEventListener('click', eliminar);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
}

function comprar(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const productos = e.target.parentElement.parentElement;
        leerDatos(producto);
    }
}

function leerDatos(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('date-id')
    }
    insertarCarrito(infoProducto);
}

function insertarCarrito(producto) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
        </td>
    `;
    listaProductos.appendChild(row);
    guardarProductoLocalStorage(producto);
}


function eliminarProducto(e) {
    e.preventDefault();

    let producto,
    productoId;
    if(e.target.classList.contains('borrar-producto')){
        e.target.parentElement.parentElement.remove();
        producto = e.target.parentElement.parentElement;
        productoId = producto.querySelector('a').getAttribute('data-id');
    }
    eliminarProductoLocalStorage(cafeId);
}

function vaciarCarrito() {
    while(listaProductos.firstChild){
        listaProductos.removeChild(listaProductos.firstChild);

    }

    vaciarLocalStorage();
    return false;
}

function guardarProdcutoLocalStorage(producto) {
    let productos;
    productos = obtenerProductosLocalStorage();
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos))
}

function obtenerProductosLocalStorage() {
    let productosLS;

    if(localStorage.getItem('productos') === null){
        productosLS = [];
    } else {
        productosLS = JSON.parse(localStorage.getItem('prodcutos'));
    }
    return productosLS;
}

function leerLocalStorage() {
    let productosLS;

    productosLS = obtenerProductosLocalStorage();

    productosLS.forEach(function(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100> 
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
            </td>
        `;
        listaProductos.appendChild(row);
    });

}

function eliminarProductoLocalStorage(cafe) {
    let productosLS;

    productosLS = obtenerCafesLocalStorage();

    productosLS.forEach(function(productos, index){
        if(productosLS.id === cafe) {
            productosLS.splice(index, 1)
        }
    });

    localStorage.setItem('productos', JSON.stringify(productosLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}