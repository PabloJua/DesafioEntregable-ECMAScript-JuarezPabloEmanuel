import fs from "fs";

class CartManager {
    constructor() {
        this.carts = [];
        this.path = "Carrito.json";
        this.createFile();
    }

    createFile() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.carts));
        }
    }

    newCart() {
        this.carts.push({id: this.generateId(), products:[]});
        this.saveCarts();
        console.log("Carrito creado!");
        
        return true;
    }

    getCarts() {
        let carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        return carts;
    }

    getCartById(cartId) {
        this.carts =  JSON.parse(fs.readFileSync(this.path, "utf-8"));
        return this.carts.find(item => item.id === cartId);
    }

    generateId() {
        let max = 0;
        let carts = this.getCarts();

        carts.forEach(item => {
            if (item.id > max) {
                max = item.id;
            }
        })
        return max + 1;

        // return this.products > 0  ? this.products[this.products.length-1].id+1 : 1; // : sino ; ? entonces
    }

    // Para escribir el archivo
    saveCarts() {
        fs.writeFileSync(this.path, JSON.stringify(this.carts));
    }


    addProductToCart(cartId, productId) {   
        this.carts = this.getCarts();
        const cart = this.carts.find(item => item.id === cartId);
        let product = cart.products.find(item => item.id === productId)

        if (product) {
            product.quantity+= 1;
        } else {
            cart.products.push({product: productId , quantity: 1});
        }

        this.saveCarts();
        console.log("Producto Agregado");
        return true;
    }
}

export default CartManager;



