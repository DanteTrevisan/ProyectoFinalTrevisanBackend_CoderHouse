import { productService } from "../services/services.js";
import { successStatus, failureStatus } from "../utils/statuses.js";

import validateQueryParams from "../validators/queryParams.js";
import validateUpdateProduct from "../validators/updateProduct.js";
import validateProduct from "../validators/product.js";

class ProductController {
    constructor() { }

    async getAllProducts(req, res) {
        try {
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
            const products = await productService.getAllProducts(
                limitParsed,
                pageParsed,
                sort,
                query
            );
            res.status(200).json(products);
        } catch (error) {
            const products = {
                status: "error",
                payload: [],
                totalPages: 0,
                prevPage: null,
                nextPage: null,
                page: 0,
                hasPrevPage: false,
                hasNextPage: false,
            };
            res.status(500).json(products);
        }
    }

    async createProduct(req, res) {
        try {
            const product = validateProduct(req.body);
            let owner = undefined;
            if (req.session.user) owner = req.session.user.email;
            await productService.createProduct({ ...product, owner });
            res.status(200).json(successStatus);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }

    async getProductById(req, res) {
        try {
            const pid = req.params.pid;
            const product = await productService.getProductById(pid);
            res.status(200).json(product);
        } catch (error) {
            res.status(404).json(failureStatus(error.message));
        }
    }

    async updateProduct(req, res) {
        try {
            const { user } = req.session;
            const pid = req.params.pid;
            if (user) {
                const dbProduct = await productService.getProductById(pid);
                if (dbProduct.owner !== user.email) {
                    return res
                        .status(403)
                        .json({ message: "The User doesn't own the product." });
                }
            }
            const updateProperties = validateUpdateProduct(req.body);
            await productService.updateProduct(pid, updateProperties);
            res.status(200).json(successStatus);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }

    async deleteProduct(req, res) {
        try {
            const { user } = req.session;
            const pid = req.params.pid;
            const dbProduct = await productService.getProductById(pid);
            if (user) {
                if (dbProduct.owner !== user.email) {
                    return res
                        .status(403)
                        .json({ message: "The User doesn't own the product." });
                }
            }

            await productService.deleteProduct(pid);
            res.status(200).json(successStatus);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }
}

export default new ProductController();