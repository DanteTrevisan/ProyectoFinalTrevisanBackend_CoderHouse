import cartsModel from "../models/carts.model.js";

export class CartManagerDB{
    constructor() {}

    async getCarts() {
        try {
            const carts = await cartsModel.find();
            let dbCarts = [];
            carts.forEach((carts) => {
                dbCarts.push(carts.toObject())
            });
            return dbCarts;
        } catch (error) {
            throw error
        }
    }

    async createCart() {
        try {
            const cart = { products: []};
            await cartsModel.create(cart)
        } catch (error) {
            throw error;
        }
    }

    async getCartById(id) {
        try {
            const cart = await cartsModel.findById(id).populate("products.product");
            const dbCart = await cart.toObject();
            return dbCart
        } catch (error) {
            throw error;
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid);
            const dbCart = await cart.toObject();
            let productExist = false;
            const updateProducts = dbCart.products.map((productInCart) => {
                if (productInCart.product.toString() === pid) {
                    productExist = true;
                    const productCart = {
                        product: productInCart.product,
                        quantity: productInCart.quantity + 1
                    };
                    productInCart = productCart
                }
                return productInCart
            });
            dbCart.products = updateProducts;
            if (!productExist) {
                const productCart = {
                    product: pid,
                    quantity: 1
                };
                dbCart.products.push(productCart)
            }
            await cartsModel.updateOne({ _id: cid}, { $set: dbCart})
        } catch (error) {
            
        }
    }

    async removeProductFromCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid);
            const dbCart = await cart.toObject();
            const updateProducts = [];
            dbCart.products.forEach((productInCart) => {
                if (!(productInCart.product.toString() === pid)) {
                    updateProducts.push(productInCart)
                }
            });
            dbCart.products = updateProducts
            await cartsModel.updateOne({ _id: cid}, { $set: dbCart});
        } catch (error) {
            throw error
        }
    }

    async updateCart(cid, updateProducts) {
        try {
            const cart = await cartsModel.findById(cid);
            const dbCart = await cart.toObject();
            dbCart.products = updateProducts;
            await cartsModel.updateOne({ _id: cid}, { $set: dbCart})
        } catch (error) {
            throw error;
        }
    }

    async updateProductQuantity(cid, pid, quantity) {
        try {
            const cart = await cartsModel.findById(cid);
            const dbCart = await cart.toObject();
            dbCart.products.forEach((product) => {
                if (product.product.toString() === pid) {
                    product.quantity = quantity
                }
            });
            await cartsModel.updateOne({ _id: cid}, { $set: dbCart});
        } catch (error) {
            throw error;
        }
    }

    async clearCart(cid) {
        try {
            const cart = await cartsModel.findById(cid);
            const dbCart = await cart.toObject();
            dbCart.products = []
            await cartsModel.updateOne({ _id: cid}, { $set: dbCart})
        } catch (error) {
            throw error;
        }
    }
}