class ProductManager {
    constructor() {
        this.products = [];
    }


    addProduct (product) {
            
        if (this.validateCode(product.code)) {
            console.log(`Error: Ya existe un producto con el codigo ${product.code}`);
        } else {
            const producto = {id: this.generateId(), title: product.title , description: product.description , price: product.price , thumbnail: product.thumbnail, code: product.code, stock: product.stock};
            this.products.push(producto);
            console.log("Producto agregado")
        }
    }


    getProducts () {
        return this.products;
    }


    getProductById (productoId) {
        return this.products.find (item => item.id === productoId) || "Not found";
    }


    generateId() {
        let max = 0;
        
        this.products.forEach (item => {
            if (item.id > max) {
                max = item.id;
            }
        })
        return max+1;

       // return this.products > 0  ? this.products[this.products.length-1].id+1 : 1; // : sino ; ? entonces
    }


    validateCode(code) {
        return  this.products.some (item => item.code === code);
    }
}

export default ProductManager;



