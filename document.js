document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('product-form');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productTable = document.getElementById('product-table').getElementsByTagName('tbody')[0];

    let products = []; // Arreglo para almacenar los productos

    // Función para agregar un producto
    function addProduct(name, price) {
        const id = Date.now(); // Generar un ID único basado en la marca de tiempo
        const product = { id, name, price };
        products.push(product);
        refreshTable();
        productForm.reset();
    }

    // Función para refrescar la tabla de productos
    function refreshTable() {
        productTable.innerHTML = '';
        products.forEach(function (product) {
            const row = productTable.insertRow();
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                    <button onclick="editProduct(${product.id})">Editar</button>
                    <button onclick="deleteProduct(${product.id})">Eliminar</button>
                </td>
            `;
        });
    }

    // Función para editar un producto
    function editProduct(id) {
        const product = products.find(p => p.id === id);
        if (product) {
            productName.value = product.name;
            productPrice.value = product.price;
            productForm.onsubmit = function (e) {
                e.preventDefault();
                product.name = productName.value;
                product.price = parseFloat(productPrice.value);
                refreshTable();
                productForm.reset();
                productForm.onsubmit = function (e) {
                    e.preventDefault();
                    addProduct(productName.value, parseFloat(productPrice.value));
                };
            };
        }
    }

    // Función para eliminar un producto
    function deleteProduct(id) {
        products = products.filter(product => product.id !== id);
        refreshTable();
    }

    // Agregar evento al formulario para agregar productos
    productForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addProduct(productName.value, parseFloat(productPrice.value));
    });

 
});