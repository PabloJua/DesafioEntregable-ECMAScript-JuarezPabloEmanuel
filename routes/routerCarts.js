import { Router } from "express";
import CartManager from "../CartManager.js"; // Se importa la clase CartManager desde un archivo local ProductManager.js. Esta clase es responsable de cargar y administrar los datos de los productos.

const cartsRouter = Router();
const CM = new CartManager();

cartsRouter.post("/", (req, res) => {
    if (CM.newCart()) {
        res.send({status:"ok", message:"El carrito se creó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error: No se pudo crear el carrito!"})
    }
});


cartsRouter.get("/:cid", (req, res) => {
    const cid = Number(req.params.cid);
    const cart = CM.getCartById(cid);

    if(cart) {
        res.send({products: cart.products});
    } else {
        res.status(400).send({status:"error", message:"Error! No se encuentra el ID de carrito!"});
    }
});

cartsRouter.post("/:cid/products/:pid", (req, res) => {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);
    const cart = CM.getCartById(cid);

    if(cart) {
        if(CM.addProductToCart(cid ,pid)) {
            res.send({status:"ok", message:"El producto se agregó correctamente!"});
        } else{
            res.status(400).send({status:"error", message:"Error! No se pudo agregar el producto al carrito!"});
        }
    } else {
        res.status(400).send({status:"error", message:"Error! No se encuentra el ID de carrito!"});
    }
})






export default cartsRouter;