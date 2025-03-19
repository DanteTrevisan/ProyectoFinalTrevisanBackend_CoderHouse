import {Router} from 'express';
import ProductManagerDB from '../dao/services/ProductManagerDB.js';
import { failureStatus, successStatus } from '../utils/statuses.js';
import validateQueryParams from '../validators/queryParams.js';
import validateUpdateProduct from '../validators/updateProduct.js';

const productsRouter = Router()

/**GET ENDPONTS */
productsRouter.get("/", async(req, res) => {
    try {
        const productManagerDB = new ProductManagerDB();
        let limitParsed = 10;
        let pageParsed = 1;
        const queryParams = validateQueryParams(req.query);
        const { limit, page, sort, query } = queryParams;
        if (limit) {
            limitParsed = parseInt(limit);
        }
        if (page) {
            pageParsed = parseInt(page);
        }
        const products = await productManagerDB.getProducts(limitParsed, pageParsed, sort, query);
        res.json(products);
    } catch (error) {
        const products = {
            status: "error",
            payload: [],
            totalPages: 0,
            prevPage: null,
            nextPage: null,
            page: 0,
            hasPrevPage: false,
            hasNextPage: false
        };
        res.json(products)
    }
});

productsRouter.get("/:pid", async(req,res) => {
    try {
        const productManagerDB = new ProductManagerDB();
        const pid = req.params.pid;
        const product = await productManagerDB.getProductById(pid);
        res.json(product)
    } catch (error) {
        res.status(404).json(failureStatus(error.message));
    }
});

/** POST ENDPOINT */
productsRouter.post("/", async(req,res) => {
    try {
        const productManagerDB = new ProductManagerDB();
        const product = req.body;
        await productManagerDB.addProduct(product)
        res.json(successStatus);
    } catch (error) {
        res.status(500).json(failureStatus(error.message))
    }
});

/** PUT ENDPINT */
productsRouter.put("/:pid", async(req, res) => {
    try {
        const productManagerDB = new ProductManagerDB();
        const pid = req.params.pid;
        const updateProperties = validateUpdateProduct(req.body);
        await productManagerDB.updateProduct(pid, updateProperties);
        res.json(successStatus)
    } catch (error) {
        res.json(failureStatus(error.message))
    }
});

/** DELETE ENDPOINT */
productsRouter.delete("/:pid", async(req,res) => {
    try {
        const productManagerDB = new ProductManagerDB();
        const pid = req.params.pid;
        await productManagerDB.deleteProduct(pid)
        res.json(successStatus)
    } catch (error) {
        res.json(failureStatus(error.message))
    }
})

export default productsRouter;