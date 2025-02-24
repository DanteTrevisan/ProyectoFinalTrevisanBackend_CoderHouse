import generateId from "../utils/functions";
import Cart from "./carts";
import IdCart from "../improvised_utils/IdCarts";
import CartProduct from "./cartProduct";
import { readDataFromJsonFileAsyncPromise,
         writeDataIntoJsonFileAsyncPromises
} from "../utils/files";

export default class CartManager {
    path;
    carts = [];

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
        const idCart = this.carts.find((cart) => cart.id === id)
        return idCart;
    }

    async addProductToCart(cid, pid, callBackStatus) {
        await this.readCartsFromFileAsyncPromises();
        let cartFound = false;
        const carts = new IdCart()
        carts = this.carts.map((cart) => {
            if (cart.id ===cid) {
                cartFound = true;
                if(cart.products.length === 0) {
                    cartFound.products.push(new CartProduct(pid));
                    return cartFound;
                }
            }
        })
    }
}