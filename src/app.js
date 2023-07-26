const express = require('express');
const ProductManager = require('../ProductManager.js'); // Se importa la clase ProductManager desde un archivo local ProductManager.js. Esta clase es responsable de cargar y administrar los datos de los productos.

const PUERTO = 3500;
const server = express();

server.use(express.urlencoded({extended:true}));
server.use(express.json());

server.get('/products', (req, res) => {
    const limite = req.query.limite;
    console.log(limite);

    const productManager = new ProductManager();

    try {
        let products = productManager.getProducts();

        if(limite) {
            products = products.slice(0, limite);
        }
        res.json(products)
    } catch (error) {
        return res.send(error);
    }
})



