import {Router} from 'express';
import ProductManager from '../classes/productManager.js';
import { productsPath } from '../utils/paths.js';
import validateQueryParams from '../validators/queryParams.js';
import { failureStatus, successStatus } from '../utils/statuses.js';
import validateId from '../validators/ids.js';

const productsRouter = Router()

/**ENDPOINT GETR */
productsRouter.get("/", async(req, res) => {
    const productManager = new ProductManager(productsPath)
    const products = await productManager.getProducts();
    let limitParsed = products.length
    const queryParams = validateQueryParams(req.query)
    if (!queryParams) {
        res.status(404).json(failureStatus("Query Params invalidos"))
        return
    }
    const { limit } = queryParams
    console.log(limit)
    if (limit) {
        limitParsed = parseInt(limit)
    }
    res.json(products.splice(0,limitParsed))
});

productsRouter.get("/:pid", async(req, res) => {
    const productManager = new ProductManager(productsPath)
    const pid = validateId(req.params.pid)
    if (pid) {
        const IdProduct = await productManager.getProductById(pid);
        if (IdProduct) {
            res.json(IdProduct)
        } else {
            res
                .status(404)
                .json(failureStatus(`El producto con id ${pid} no existe`))
        }
    } else {
        res.status(404).json(failureStatus("PId invalido."))
    }
});

productsRouter.post("/", async(req, res) => {
    const productManager = new ProductManager(productsPath);
    const product = req.body
    await productManager.addProduct(product, (error) => {
        if (error) {
            res.status(500).json(failureStatus(error.message))
        } else {
            res.json(successStatus)
        }
    })
});

productsRouter.put("/:pid", async(req, res) => {
    const productManager = new ProductManager(productsPath)
    const pid = validateId(req.params.id)
    if (pid) {
        const updateProperties = validateUpdateProduct(req.body)
        if (updateProperties) {
            await productManager.UpdateProduct(
                pid,
                updateProperties,
                (error) => {
                   if (error) {
                    res.status(500).json(failureStatus(error.message))
                   } else {
                    res.json(successStatus)
                   }
                }
            )
        } else {
            res.status(404).json(failureStatus(`Propiedades invalidas`))
        }
    } else {
        res.status(404).json(failureStatus("Producto ID invalido"))
    }
});

productsRouter.delete("/:pid", async(req, res) => {
    const productManager = new ProductManager(productsPath)
    const pid = validateId(req.params.pid)
    if (pid) {
        await productManager.deleteProduct(pid, (error) => {
            if (error) {
                res.status(404).json(failureStatus(error.message))
            } else {
                res.json(successStatus)
            }
        })
    } else {
        res.status(404).json(failureStatus("Producto ID invalido"))
    }
})

export default productsRouter;