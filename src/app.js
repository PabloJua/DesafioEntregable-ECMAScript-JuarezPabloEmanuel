import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import {Server} from "socket.io";
import ProductManager from './ProductManager.js'; 

import productsRouter from "./routes/routerProducts.js";
import cartsRouter from "./routes/routerCarts.js";



// server.use(express.urlencoded({extended:true}));

const server = express();
const PUERTO = 8080;


const httpServer = server.listen( PUERTO , ()=>  {
    console.log("Servidor activo en el puerto: " + PUERTO)
});

const socketServer = new Server(httpServer);
const PM = new ProductManager();

// Defino mis plantillas en mi Servidor HTTP
server.engine("handlebars", handlebars.engine());
server.set("views", __dirname + "/views");
server.set("view engine", "handlebars");
server.use(express.static(__dirname + "/public"));
server.use(express.json()); // Se utiliza cuando se quiere enviar informacion en formato json
server.use(express.urlencoded({extended:true}));
server.use('/api/products/', productsRouter);
server.use('/api/carts/' , cartsRouter);
server.use("/", viewsRouter);


// Defino los mensajes en mi Servidor Socket
socketServer.on("connection", (socket) => {
    console.log("Nueva Conexión!");
    const products = PM.getProducts(); 
    socket.emit("realTimeProducts", products); // Envio los productos al canal realTimeProducts en main.realTimeProducts 
    
    socket.on("nuevoProducto", (data) => {
        const product = {title: data.title, description: "", code:"", price: data.price, status:"", stock:10, category:"", thumbnails: data.thumbnails}
        PM.addProduct(product);
        const products = PM.getProducts(); 
        socket.emit("realTimeProducts", products);
    })

    socket.on("eliminarProducto", (data) => {
        PM.deleteProduct(parseInt(data)); // Es necesario parsearlo para tomar el valor en tipo entero
        const products = PM.getProducts(); 
        socket.emit("realTimeProducts", products);
    })
});

