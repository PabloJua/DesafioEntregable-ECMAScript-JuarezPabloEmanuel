import { Router } from "express";
import ProductManager from '../ProductManager.js'; // Se importa la clase ProductManager desde un archivo local ProductManager.js. Esta clase es responsable de cargar y administrar los datos de los productos.

const productsRouter = Router();
const PM = new ProductManager();


productsRouter.get('/', (req, res) => {
    const products = PM.getProducts();
    let {limit} = req.query;
    res.send({products: limit ? products.slice(0, limit) : products})
});

productsRouter.get('/:pid', (req, res) => {
    const products = PM.getProducts();
    let pid = Number(req.params.pid);
    res.send({product: products.find(item => item.id === pid) || "Error: El ID del Producto no existe!"});
});

productsRouter.post("/", (req, res) => {
    let {title, description, code, price, status, stock, category, thumbnails} = req.body;    

    if(!title) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo title"})
    }

    if(!description) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo description"})
    }
    
    if(!code) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo code"})
    }
    
    if(!price) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo price"})
    }

    status = !status && true;

    if(!stock) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo stock"})
    }

    
    if(!category) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo category"})
    }
    
    if(!thumbnails) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo Thumbnails"})
        return false;
    } else if ((!Array.isArray(thumbnails)) || (thumbnails.length == 0)) {
        res.status(400).send({status: "error", message: "Debe ingresar al menos una imagen en el Array Thumbnails"});
        return false;
    }


    if(PM.addProduct({title, description, code, price, status, stock, category, thumbnails})){
        res.send({status:"ok", message:"El producto se agregó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error: No se pudo agregar el producto!"})
    }
})


productsRouter.put("/:pid", (req, res) => {
    let pid = Number(req.params.pid);
    let {title, description, code, price, status, stock, category, thumbnails} = req.body;    

    if(!title) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo title"})
    }

    if(!description) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo description"})
    }
    
    if(!code) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo code"})
    }
    
    if(!price) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo price"})
    }

    status = !status && true;

    if(!stock) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo stock"})
    }

    
    if(!category) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo category"})
    }
    
    if(!thumbnails) {
        res.status(400).send({status:"error", message:"Error! No se cargo el campo Thumbnails"})
        return false;
    } else if ((!Array.isArray(thumbnails)) || (thumbnails.length == 0)) {
        res.status(400).send({status: "error", message: "Debe ingresar al menos una imagen en el Array Thumbnails"});
        return false;
    }


    if(PM.updateProduct(pid, {title, description, code, price, status, stock, category, thumbnails})) {
        res.send({status:"ok", message:"El producto se actualizó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error: No se pudo actualizar el producto!"})
    }
})


productsRouter.delete("/:pid", (req, res) => {
    let pid = Number(req.params.pid); // Capturamos el parametro y se lo pasamos al metodo
    
    if(PM.deleteProduct(pid)) {
        res.send({status:"ok", message:"El producto se eliminó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error: No se pudo eliminar el producto!"})
    }
})
 

export default productsRouter;
