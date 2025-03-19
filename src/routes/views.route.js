import { Router } from "express";
import ProductManagerDB from "../dao/services/ProductManagerDB.js";
import validateQueryParams from "../validators/queryParams.js";
import { CartManagerDB } from "../dao/services/CartManagerDB.js";
import { productRoute, productsRoute } from "../utils/routes.js";

const viewsRouter = Router();

viewsRouter.get("/", async(req,res) => {
    try {
        const productManagerDB = new ProductManagerDB();
        let limitParsed = 10;
        let pageParsed = 1;
        const queryParams = validateQueryParams(req.query);
        const { limit, page, sort, query} = queryParams;
        if (limit) {
            limitParsed = parseInt(limitParsed)
        }
        if (page) {
            page = parseInt(page)
        }
        const products = await productManagerDB.getProducts(
            limitParsed,
            pageParsed,
            sort,
            query
        );
        res.render("home", {
            title: "Products",
            style: "app.css",
            products: products.payload,
        });
    } catch (error) {
        res.render("failure", {
            title: "Products",
            style: "app.css",
            failureMessage: error.message
        });
    }
});

export default viewsRouter;