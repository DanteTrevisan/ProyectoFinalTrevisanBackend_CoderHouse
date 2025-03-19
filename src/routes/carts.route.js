import {Router} from 'express';
import { productRoute } from '../utils/routes.js';
import { successStatus, failureStatus } from "../utils/statuses.js";
import { CartManagerDB } from '../dao/services/CartManagerDB.js';
import validateProductCart from '../validators/productCart.js';
import validateNumber from '../validators/number.js';


const cartsRouter = Router()

/**GET ENDPOINT */
cartsRouter.get("/:cid", async(req, res) => {
    try {
        const cartManagerDB = new CartManagerDB()
        const cid = req.params.cid;
        const cart = await cartManagerDB.getCartById(cid);
        res.json(cart)
    } catch (error) {
        res.json(failureStatus(error.message))
    }
});

cartsRouter.get("/", async (req, res) => {
    try {
        const cartManagerDB = new CartManagerDB();
        const cart = await cartManagerDB.getCarts();
        res.json(cart)
    } catch (error) {
        res.json(failureStatus(error.message))
    }
});

/**POST ENDPOINTS */
cartsRouter.post("/", async(req, res) => {
    try {
        const cartManagerDB = new CartManagerDB();
        await cartManagerDB.createCart();
        res.json(successStatus);
    } catch (error) {
        res.json(failureStatus(error.message));
    }
});

cartsRouter.post(
    "/:cid" + productRoute + "/:pid",
    async (req, res) => {
        try {
            const cartManagerDB = new CartManagerDB();
            const cid = req.params.cid;
            const pid = req.params.pid
            await cartManagerDB.addProductToCart(cid,pid);
            res.json(successStatus)
        } catch (error) {
            res.json(failureStatus(error.message));
        }

    }
);

/** PUT ENDPOINTS */
cartsRouter.put("/:cid", async (req, res) => {
    try {
        const cartManagerDB = new CartManagerDB();
        const cid = req.params.cid;
        const updateProducts = validateProductCart(req.body);
        await cartManagerDB.updateCart(cid, updateProducts);
        res.json(successStatus)
    } catch (error) {
        res.json(failureStatus(error.message))
    }
});

cartsRouter.put("/:cid" + productRoute + "/:pid", async (req, res) => {
    try {
        const cartManagerDB = new CartManagerDB();
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = validateNumber(req.body)
        await cartManagerDB.updateProductQuantity(cid,pid,quantity);
        res.json(successStatus)
    } catch (error) {
        res.json(failureStatus(error.message))
    }
})

/** DELETE ENDPOINTS */
cartsRouter.delete("/:cid" + productRoute + "/:pid", async (req, res) => {
    try {
        const cartManagerDB = new CartManagerDB();
        const cid = req.params.cid;
        const pid = req.params.pid;
        await cartManagerDB.removeProductFromCart(cid,pid);
        res.json(successStatus)
    } catch (error) {
        res.json(failureStatus(error.message))
    }
})

cartsRouter.delete("/:cid", async(req,res) => {
    try {
        const cartManagerDB = new CartManagerDB();
        const cid = req.params.cid;
        await cartManagerDB.clearCart(cid)
        res.json(successStatus)
    } catch (error) {
        res.json(failureStatus(error.message))
    }
})

export default cartsRouter;

