import fs from "fs";

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "Products.json";
    }



    createFile() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        }
    }
    
    addProduct(product) {
        if (this.validateCode(product.code)) {
            console.log(`Error: Ya existe un producto con el codigo ${product.code}`);
        } else {
            const producto = {id: this.generateId(), title: product.title , description: product.description , price: product.price , thumbnail: product.thumbnail, code: product.code, stock: product.stock};
            this.products = this.getProducts();
            this.products.push(producto);
            this.saveProducts(); 
            console.log("Producto agregado")
        }
    }

    // Para leer el archivo
    getProducts() {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        return this.products;
    }

    // Para escribir el archivo
    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }



    updateProduct(productoId, product) {
        this.products = this.getProducts();
        let pos = this.products.findIndex(item => item.id === productoId);
        if (pos > -1) {
            this.products[pos].title = product.title;
            this.products[pos].description = product.description;
            this.products[pos].price = product.price;
            this.products[pos].thumbnail = product.thumbnail;
            this.products[pos].code = product.code;
            this.products[pos].stock = product.stock;
            this.saveProducts();
            console.log('El Producto se actualizó correctamente');
        } else {
            console.log("Not found");
        }
    }

    deleteProduct(productoId) {
            this.products = this.getProducts();
            let pos = this.products.findIndex(item => item.id === productoId);
            if (pos > -1) {
                this.products.splice(pos, 1);
                this.saveProducts();
                console.log(`Producto con el ID ${productoId} fue eliminado`);
                this.id++;
            } else {
                console.log("Not found");
            }
    }



    getProductById (productoId) {
        this.products = this.getProducts();
        return this.products.find (item => item.id === productoId) || "Not found";
    }


    generateId() {
        let max = 0;
        
        this.products.forEach (item => {
            if (item.id > max) {
                max = item.id+1;
            }
        })
        return max;

       // return this.products > 0  ? this.products[this.products.length-1].id+1 : 1; // : sino ; ? entonces
    }


    validateCode(code) {
        return  this.products.some (item => item.code === code);
    }
}

export default ProductManager;



