import Product from "./product.js"
import generateId from "../utils/functions.js";
import { readDataFromJsonFileAsyncPromise,
    writeDataIntoJsonFileAsyncPromises
 } from "../utils/files.js";

export default class ProductManager {
    path
    products = []

    constructor(path, products){
        this.path = path;
        this.products = products;
    }

    static codeBase = 0;

    generateProductId() {
        const ids = this.products.map((product) => product.id)
        return generateId(ids)
    }

    async readProductsFromFileAsyncPromises() {
        this.products = await readDataFromJsonFileAsyncPromise(this.path);
        ProductManager.codeBase = this.generateProductId()
    }

    async writeProductsIntoFileAsyncPromises() {
        writeDataIntoJsonFileAsyncPromises(this.path, this.products)
    }

    async addProduct(productObj, callBackStatus) {
        await this.readProductsFromFileAsyncPromises()
        if(
            this.products.some(
                (element) => productObj.code === element.code
            )
        ) {
            callBackStatus(
                new Error(
                    "El codigo del producto que esta agregando ya existe. INgrese otro codigo"
                )
            )
            return
        }
        const product = new Product(
            productObj.title,
            productObj.description,
            productObj.code,
            productObj.price,
            productObj.stock,
            productObj.category,
            productObj.status,
            productObj.thumbnail,
        );
        this.products.push(product.addId(++ProductManager.codeBase))
        await this.writeProductsIntoFileAsyncPromises();
        callBackStatus(null)
    }

    async getProducts() {
        await this.readProductsFromFileAsyncPromises();
        return this.products
    }

    async getProductById(id) {
        await this.readProductsFromFileAsyncPromises();
        const IdProduct = this.products.find(
            (product) => product.id === id
        );
        return IdProduct
    }

    async UpdateProduct(
        id,
        updateObj,
        callBackStatus
    ){
        await this.readProductsFromFileAsyncPromises();
        let existProduct = false
        const productsUpdated = this.products.map(
            (product) => {
                if (product.id === id) {
                    Object.keys(updateObj).forEach((key) => {
                        product[key] = updateObj[key]
                    });
                    existProduct = true
                }
                return product
            }
        );

        if (!existProduct) {
            callBackStatus(
                new Error(`El producto con id igual a ${id} no fue encontrado`)
            );
            return
        }
        this.products = productsUpdated;
        await this.writeProductsIntoFileAsyncPromises();
        callBackStatus(null)
    }

    async deleteProduct(id, callBackStatus){
        await this.readProductsFromFileAsyncPromises();
        const productsUpdated = []
        let existProduct = false;
        this.products.forEach((product) =>{
            if (product.id !== id) {
                productsUpdated.push(product)
            } else {
                existProduct = true
            }
        });
        if (!existProduct) {
            callBackStatus(
                new Error(`El producto con id igual a ${id} no fue encontrado`)
            );
            return
        }
        this.products = productsUpdated;
        await this.writeProductsIntoFileAsyncPromises();
        callBackStatus(null)
    }
}