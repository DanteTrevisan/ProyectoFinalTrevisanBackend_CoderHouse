import generateId from "../../utils/functions.js";
import Cart from "../../classes/cart.js";
import CartProduct from "../../classes/cartProduct.js";
import { readDataFromJsonFileAsyncPromise,
         writeDataIntoJsonFileAsyncPromises
} from "../../utils/files.js";

class CartManager {
    path;
    carts =  [];

    constructor(path, carts){
        this.path = path;
        this.carts = carts
    }

    static codeBase = 0;
    
    generateProductId() {
        const ids = this.carts.map((carts) => carts.id);
        return generateId(ids)
    }

    async readCartsFromFileAsyncPromises() {
        this.carts = await readDataFromJsonFileAsyncPromise(this.path)
        CartManager.codeBase = this.generateProductId()
    }

    async writeCartsIntoFileAsyncPromises() {
        writeDataIntoJsonFileAsyncPromises(this.path, this.carts)
    }

    async createCart() {
        await this.readCartsFromFileAsyncPromises();
        const cart = new Cart();
        this.carts.push(cart.addId(++CartManager.codeBase))
        await this.writeCartsIntoFileAsyncPromises()
    }

    async getCartById(cid) {
        await this.readCartsFromFileAsyncPromises();
        const idCart = this.carts.find((cart) => cart.id === cid)
        return idCart;
    }

    async addProductToCart(cid, pid, callBackStatus) {
        await this.readCartsFromFileAsyncPromises();
        let cartFound = false;
        const carts = this.carts.map((cart) => {
            if (cart.id === cid) {
                cartFound = true;
                if (cart.products.lenght === 0) {
                    cart.products.push(new CartProduct(pid))
                    return cart
                }
                let productExist = false;
                const products = cart.products.map(
                    (product) => {
                        if (product.product === pid) {
                            productExist = true;
                            const cartProduct = new CartProduct(
                                product.product,
                                product.quantity
                            )
                            cartProduct.raiseQuantity();
                            product = cartProduct
                        }
                        return product
                    }
                );
                if (!productExist) {
                    products.push(new CartProduct(pid))
                }
                cart.products = products;
            }
            return cart
        });
        if (!cartFound) {
            callBackStatus(new Error(`El carro con id ${id} no existe`))
            return
        }
        this.carts = carts
        await this.writeCartsIntoFileAsyncPromises();
        callBackStatus(null)
    }

    async getCarts() {};
    async updateCart() {};
    async deleteCart() {};

}

export default CartManager