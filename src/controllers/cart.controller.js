import { cartService, productService, ticketService, userService } from "../services/services.js";
import { successStatus, failureStatus } from "../utils/statuses.js";

import validateNumber from "../validators/number.js";
import validateProductCart from "../validators/productCart.js";

class CartController {
    constructor() { }

    // @@@@
    async getAllCarts(req, res) {
        try {
            const cart = await cartService.getAllCarts();
            res.status(200).json(cart);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }

    async getCartById(req, res) {
        try {
            const cid = req.params.cid;
            const cart = await cartService.getCartById(cid);
            res.status(200).json(cart);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }

    async createCart(req, res) {
        try {
            await cartService.createCart();
            res.status(200).json(successStatus);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }

    async addProductCart(req, res) {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const { user } = req.session;
            if (user.rol === "premium") {
                const dbProduct = await productService.getProductById(pid);
                if (dbProduct.owner === user.email) {
                    return res
                        .status(403)
                        .json({ message: "The User owns this product." });
                }
            }
            await cartService.addProductCart(cid, pid);
            res.status(200).json(successStatus);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }

    async updateCart(req, res) {
        try {
            const cid = req.params.cid;
            const updateProducts = validateProductCart(req.body);
            await cartService.updateCart(cid, updateProducts);
            res.status(200).json(successStatus);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }

    async updateProductQuantityCart(req, res) {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const quantity = validateNumber(req.body);
            await cartService.updateProductQuantityCart(cid, pid, quantity);
            res.status(200).json(successStatus);
        } catch (error) {
            req.logger.error(error.mesaage);
            res.json(failureStatus(error.message));
        }
    }

    async removeProductCart(req, res) {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            await cartService.removeProductCart(cid, pid);
            res.status(200).json(successStatus);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }

    async clearCart(req, res) {
        try {
            const cid = req.params.cid;
            await cartService.clearCart(cid);
            res.status(200).json(successStatus);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }

    async purchase(req, res) {
        try {
            const cid = req.params.cid;
            const user = await userService.getUserByCart(cid);
            let amount = 0;
            const noPurchased = [];
            const stockless = [];
            const stockUpdates = [];
            const cart = await cartService.getCartById(cid);
            cart.products.forEach((product) => {
                const updateStockPromise = productService
                    .getProductById(product.product)
                    .then(async (dbProduct) => {
                        let diff = dbProduct.stock - product.quantity;
                        if (diff >= 0) {
                            await productService.updateProduct(product.product, {
                                stock: diff,
                            });
                            amount += product.quantity * dbProduct.price;
                        } else {
                            stockless.push(product.product);
                            noPurchased.push(product);
                        }
                    });
                stockUpdates.push(updateStockPromise);
            });
            await Promise.all(stockUpdates);
            const ticket = {
                amount: amount,
                purchaser: user.email,
            };
            await ticketService.createTicket(ticket);
            await cartService.updateCart(cid, noPurchased);
            if (stockless.length > 0) {
                res.json(stockless);
            } else {
                res.status(200).json(successStatus);
            }
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }
}

export default new CartController();