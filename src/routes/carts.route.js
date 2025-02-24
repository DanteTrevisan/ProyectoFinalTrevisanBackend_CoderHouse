import {Router} from 'express';
import CartManager from '../classes/cartManager.js';
import ProductManager from '../classes/productManager.js';
import validateId from '../validators/ids.js';
import { successStatus, failureStatus } from "../utils/statuses.js";
import { productRoute } from '../utils/routes.js';
import { productsPath, cartsPath } from '../utils/paths.js';


const cartsRouter = Router()

/**GET ENDPOINT */
cartsRouter.get("/:cid", async(req, res) => {
    const cartManager = new CartManager(cartsPath);
    const cid = validateId(req.params.cid);
    if (cid) {
        const idCart = await cartManager.getCartById(cid);
        if (idCart) {
            res.json(idCart.products);
        } else {
            res.status(404).json(failureStatus(`El carro con id ${id} no existe`))
        }
    } else {
        res.status(404).json(failureStatus(`Cart ID invalido`))
    }
});

/**POST */
cartsRouter.post("/", async(req, res) => {
    const cartManager = new CartManager(cartsPath);
    await cartManager.createCart();
    res.json(successStatus)
})

cartsRouter.post(
    "/:cid" + productRoute + "/:pid",
    async (req, res) => {
        const cartManager = new CartManager(cartsPath)
        const productManager = new ProductManager(productsPath)
        const cid = validateId(req.params.pid)
        if (cid) {
            const pid = validateId(req.params.pid)
            if (pid) {
                const IdProduct = await productManager.getProductById(pid)
                if (!IdProduct) {
                    res
                        .status(404)
                        .json(failureStatus(`El producto con id ${pid} no existe`))
                } else {
                  await cartManager.addProductToCart(cid,pid,(error) => {
                    if (error) {
                        res.status(404).json(failureStatus(error.message))
                    } else {
                        res.json (successStatus)
                    }
                  })
                }
            } else {
                res.status(404).json(failureStatus("PRoducto ID invalido"))
            }
        } else {
            res.status(404).json(failureStatus("Cart ID invalido"))
        }

    }
)

export default cartsRouter;

