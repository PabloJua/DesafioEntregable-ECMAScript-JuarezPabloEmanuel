import express from "express";
import productsRouter from "./routes/routerProducts.js";
import cartsRouter from "./routes/routerCarts.js";


// server.use(express.urlencoded({extended:true}));

const server = express();
const PUERTO = 8080;

server.use(express.json()); // Se utiliza cuando se quiere enviar informacion en formato json
server.use('/api/products/', productsRouter);
server.use('/api/carts/' , cartsRouter);



server.listen( PUERTO , ()=>  {
    console.log("Servidor activo en el puerto: " + PUERTO)
});

