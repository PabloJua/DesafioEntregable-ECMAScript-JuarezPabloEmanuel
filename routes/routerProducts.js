import { Router } from "express";
import ProductManager from '../ProductManager.js'; // Se importa la clase ProductManager desde un archivo local ProductManager.js. Esta clase es responsable de cargar y administrar los datos de los productos.

const productsRouter = Router();
const PM = new ProductManager();
const products = PM.getProducts();

productsRouter.get('/', (req, res) => {
    let {limit} = req.query;
    res.send({products: limit ? products.slice(0, limit) : products})
});

productsRouter.get('/:pid', (req, res) => {
    let pid = Number(req.params.pid);
    res.send({product: products.find(item => item.id === pid) || "Error: El ID del Producto no existe!"});
});

productsRouter.post("/", (req, res) => {
    let {title, description, code, price, stock, category, thumbnails} = req.body;    
    if(!title) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo title"})
    }

    if(!description) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo descripcion"})
    }
    
    if(!code) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo code"})
    }
    
    if(!price) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo price"})
    }

    
    if(!stock) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo stock"})
    }

    
    if(!category) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo category"})
    }
    
    if(!thumbnails) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo code"})
        return false;
    } else if ((!thumbnails.isArray()) || (thumbnails.length > 0)) {
        res.status(400).send({status: "error", message: "Error! No se cargo el campo thumbnails"});
        return false;
    }




})


export default productsRouter;
