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
            failureMessage: error.message,
        });
    }
});

viewsRouter.get("/realtimeproducts", (req, res) => {
    try {
        res.render("realTimeProducts", {
            title: "Real Time Products",
            style: "app.css",
        });
    } catch (error) {
        res.render("failure", {
            title: "Real Time Products",
            style: "app.css",
            failureMessage: error.message,
        });
    }
});

viewsRouter.get("/chat", (req, res) => {
    try {
        res.render("chat", { title: "Chat", style: "app.css"})
    } catch (error) {
        res.render("failure", {
            title: "Chat",
            style: "app.css",
            failureMessage: error.message
        })
    }
});

viewsRouter.get(productsRoute, async(req, res) => {
    try {
        const productManagerDB = new ProductManagerDB();
        let limitParsed = 2;
        let pageParsed = 1;
        const queryParams = validateQueryParams(req.query);
        const { limit, page, sort, query } = queryParams;
        if (limit) {
            limitParsed = parseInt(limit)
        }
        if (page) {
            pageParsed = parseInt(page)
        }
        const products = await productManagerDB.getProducts(limitParsed, pageParsed, sort, query);
        const nextLink = products.hasNextPage ? `http://localhost:${PORT}${productsRoute}?page=${products.nextPage}&limit=${limitParsed}`:"";
        const prevLink = products.hasNextPage ? `http://localhost:${PORT}${productsRoute}?page=${products.prevPages}&limit=${limitParsed}`:"";
        const productsTemplate = {
            ...products,
            nextLink,
            prevLink
        };
        res.render("products", {
            title: "Products",
            style: "app.css",
            products: productsTemplate
        })
    } catch (error) {
        res.render("failure", {
            title: "Products",
            style: "app.css",
            failureMessage: error.message
        })
    }
});

viewsRouter.get("/carts/:cid", async(req, res) => {
    try {
        const cartManagerDB = new CartManagerDB();
        const cid = req.params.cid;
        const cart = await cartManagerDB.getCartById(cid);
        res.render("cartDetail", {
            title: "Cart Detail",
            style: "app.css",
            cart: cart
        });
    } catch (error) {
        res.render("failure", {
            title: "Cart detail",
            style: "app.css",
            failureMessage: error.message
        });
    }
});

viewsRouter.get(`${productRoute}/:pid`, async(req, res) => {
    try {
        const productManagerDB = new ProductManagerDB();
        const pid = req.params.pid;
        const product = await productManagerDB.getProductById(pid);
        res.render("product", {
            title: "Product",
            style: "app.css",
            product: product,
        });
    } catch (error) {
        res.render("failure", {
            title: "Product",
            style: "app.css",
            failureMessage: error.message
        })
    }
});

export default viewsRouter;