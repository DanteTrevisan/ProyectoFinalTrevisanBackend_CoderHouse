import cartsModel from "./models/cart.mongodb.model.js";

class CartMondodbDAO {
    constructor(){}

    async getAll(){
        try {
            const carts = await cartsModel.find();
            let dbCarts = [];
            carts.forEach((cart) => {
                dbCarts.push(cart.toObject())
            });
            return dbCarts;
        } catch (error) {
            throw error;
        }
    }

    async create() {
        try {
            const cart = { products: [] };
            const dbCartDoc = await cartsModel.create(cart);
            const dbCart = dbCartDoc.toObject();
            return dbCart;
        } catch (error) {
            throw error
        }
    }

    async getById(id) {
        try {
            const cart = await cartsModel.findById(id).populate(products.product);
            const dbCart = await cart.toObject();
            return dbCart;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid);
            const dbCart = await cart.toObject();
            let productExist = false;
            const updatedProducts = dbCart.products.map((productInCart) => {
                if (productInCart.product.toString() === pid) {
                    productExist = true;
                    const productCart = {
                        product: productInCart.product,
                        quantity: productInCart.quantity + 1
                    };
                    productInCart = productCart;
                }
                return productInCart;
            });
            dbCart.products = updatedProducts;
            if (!productExist) {
                const productCart = {
                    product: pid,
                    quantity: 1,
                };
                dbCart.products.push(productCart);
            }
            await cartsModel.updateOne({ _id: cid}, { $set: dbCart });
        } catch (error) {
            throw error;
        }
    }

    async removeProduct(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid);
            const dbCart = await cart.toObject();
            const updatedProducts = [];
            dbCart.products.forEach((productInCart) => {
                if (!(productInCart.product.toString() === pid)) {
                    updatedProducts.push(productInCart);
                }
            });
            dbCart.products = updatedProducts;
            await cartsModel.updateOne({ _id: cid}, { $set:dbCart});
        } catch (error) {
            throw error
        }
    }

    async update(cid, updateProducts){
        try {
            const cart = await cartsModel.findById(cid);
            const dbCart = await cart.toObject();
            dbCart.products = updateProducts;
            await cartsModel.updateOne({ _id:cid}, { $set: dbCart})
        } catch (error) {
            throw error
        }
    }

    async updateProductQuantity(cid, pid, quantity){
        try {
            const cart = await cartsModel.findById(cid);
            const dbCart = await cart.toObject();
            dbCart.products.forEach((product) => {
                if (product.product.toString() === pid) {
                    product.quantity = quantity
                }
            });
            await cartsModel.updateOne({ _id: cid}, { $set: dbCart})
        } catch (error) {
            throw error;
        }
    }

    async clear(cid){
        try {
            const cart = await cartsModel.findById(cid);
            const dbCart = await cart.toObject();
            dbCart.products = [];
            await cartsModel.updateOne({ _id: cid}, { $set: dbCart });
        } catch (error) {
            throw error
        }
    }
}

export default CartMondodbDAO;
