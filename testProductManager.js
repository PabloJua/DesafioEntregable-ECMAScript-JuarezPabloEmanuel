import ProductManager from "./ProductManager.js";

// Casos de Uso //
const PM = new ProductManager();
console.log(PM.getProducts());
PM.addProduct({title:"Chaleco Puffer Ebruck Topo", description:"3 cuotas sin interes de $12.330ARS", price:36990, thumbnail:"https://vcp.com.ar/cdn/shop/files/Topo6_81943047-662b-4e1c-82ae-9e26fb212505.jpg?v=1688741569&width=700", code:"CHALECO", stock:10});
PM.addProduct({title:"Chaleco Puffer Ebruck Topo 2", description:"3 cuotas sin interes de $13.330ARS", price:37990, thumbnail:"https://vcp.com.ar/cdn/shop/files/Topo6_81943047-662b-4e1c-82ae-9e26fb212505.jpg?v=1688741569&width=700", code:"CHALECO", stock:9});
PM.addProduct({title:"Chaleco Puffer Ebruck Topo 3", description:"3 cuotas sin interes de $14.330ARS", price:38990, thumbnail:"https://vcp.com.ar/cdn/shop/files/Topo6_81943047-662b-4e1c-82ae-9e26fb212505.jpg?v=1688741569&width=700", code:"CHALECO 2", stock:8});
console.log(PM.getProducts());
console.log(PM.getProductById(3));
console.log(PM.getProductById(1));