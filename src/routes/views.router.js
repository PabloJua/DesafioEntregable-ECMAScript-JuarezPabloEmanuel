import express from "express";
import ProductManager from '../ProductManager.js'; 

const router = express.Router();
const PM = new ProductManager();


// Seria como una carga estatica
router.get("/", (req, res) => {
    const products = PM.getProducts(); // Utilizamos el productManager y cargamos los products
    res.render("home", {products}); // Cargamos la plantilla home y enviamos el objeto con el array products 
});


router.get("/realtimeproducts", (req, res) => {
    const products = PM.getProducts(); 
    res.render("realTimeProducts", {products}); // Renderizame la plantilla realTimeProducts
});

export default router;