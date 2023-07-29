import express from "express";
import ProductManager from './ProductManager.js'; // Se importa la clase ProductManager desde un archivo local ProductManager.js. Esta clase es responsable de cargar y administrar los datos de los productos.

// server.use(express.urlencoded({extended:true}));
// server.use(express.json());

const PUERTO = 8080;
const server = express();
const PM = new ProductManager();
let products = PM.getProducts();




server.get('/products/', (req, res) => {
    let {limit} = req.query;
    res.send({products: limit ? products.slice(0, limit) : products})
})

server.get('/products/:pid', (req, res) => {
    let pid = Number(req.params.pid);
    res.send({product: products.find(item => item.id === pid) || "Error: El ID del Producto no existe!"});

})






server.listen( PUERTO , ()=>  {
    console.log("Servidor activo en el puerto: " + PUERTO)
});

