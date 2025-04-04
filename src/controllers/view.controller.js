import config from "../config/env.config.js";
import { productsRoute } from "../utils/routes.js";
import validateQueryParams from "../validators/queryParams.js";
/** Services */
import { cartService, productService, userService } from "../services/services.js";

const PORT = config.port;

class ViewController {
    constructor() { }

    // @@@@
    async realTimeProducts(req, res) {
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
    }
    // @@@@
    async chat(req, res) {
        try {
            res.render("chat", { title: "Chat", style: "app.css" });
        } catch (error) {
            res.render("failure", {
                title: "Chat",
                style: "app.css",
                failureMessage: error.message,
            });
        }
    }

    // @@@@
    async products(req, res) {
        try {
            let limitParsed = 2;
            let pageParsed = 1;
            const queryParams = validateQueryParams(req.query);
            const { limit, page, sort, query } = queryParams;
            // @@@@ Pendiente: Validar que el parseo a entero de limit y page de un número válido.
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
            const nextLink = products.hasNextPage
                ? `http://localhost:${PORT}${productsRoute}?page=${products.nextPage}&limit=${limitParsed}`

                : "";
            const prevLink = products.hasPrevPage
                ? `http://localhost:${PORT}${productsRoute}?page=${products.prevPage}&limit=${limitParsed}`
                : "";
            const productsTemplate = {
                ...products,
                nextLink,
                prevLink,
            };
            res.render("products", {
                title: "Products",
                style: "app.css",
                products: productsTemplate,
                user: req.session.user,
                admin: req.session.admin,
            });
        } catch (error) {
            res.render("failure", {
                title: "Products",
                style: "app.css",
                failureMessage: error.message,
            });
        }
    }

    // @@@@
    async cart(req, res) {
        try {
            const cid = req.params.cid;
            const cart = await cartService.getCartById(cid);
            res.render("cartDetail", {
                title: "Cart detail",
                style: "app.css",
                cart: cart,
            });
        } catch (error) {
            res.render("failure", {
                title: "Cart detail",
                style: "app.css",
                failureMessage: error.message,
            });
        }
    }

    // @@@@
    async product(req, res) {
        try {
            const pid = req.params.pid;
            const product = await productService.getProductById(pid);
            res.render("product", {
                title: "Product",
                style: "app.css",
                product: product,
                cart: req.session.user.cart,
            });
        } catch (error) {
            res.render("failure", {
                title: "Product",
                style: "app.css",
                failureMessage: error.message,
            });
        }
    }

    // @@@@
    async register(req, res) {
        try {
            res.render("register", {
                title: "Register",
                style: "app.css",
            });
        } catch (error) {
            res.render("failure", {
                title: "Register",
                style: "app.css",
                failureMessage: error.message,
            });
        }
    }

    // @@@@
    async login(req, res) {
        try {
            res.render("login", {
                title: "Login",
                style: "app.css",
            });
        } catch (error) {
            res.render("failure", {
                title: "Login",
                style: "app.css",
                failureMessage: error.message,
            });
        }
    }

    // @@@@
    async profile(req, res) {
        try {
            res.render("profile", {
                title: "Profile",
                style: "app.css",
                user: req.session.user,
            });
        } catch (error) {
            res.render("failure", {
                title: "Profile",
                style: "app.css",
                failureMessage: error.message,
            });
        }
    }

    // @@@@
    async index(req, res) {
        try {
            res.render("login", {
                title: "Login",
                style: "app.css",
            });
        } catch (error) {
            res.render("failure", {
                title: "Login",
                style: "app.css",
                failureMessage: error.message,
            });
        }
    }

    // @@@@
    async resetPassword(req, res) {
        try {
            res.render("resetPassword", {
                title: "Reset Password",
                style: "app.css",
            });
        } catch (error) {
            res.render("failure", {
                title: "Reset Password",
                style: "app.css",
                failureMessage: error.message,
            });
        }
    }

    // @@@@
    async createNewPassword(req, res) {
        try {
            res.render("newPassword", {
                title: "Create New Password",
                style: "app.css",
            });
        } catch (error) {
            res.render("failure", {
                title: "Reset Password",
                style: "app.css",
                failureMessage: error.message,
            });
        }
    }

    // @@@@
    async usersRol(req, res) {
        try {
            const dbUsers = await userService.getAllUsers();
            res.render("usersRol", {
                title: "Users Rol",
                style: "app.css",
                users: dbUsers,
            });
        } catch (error) {
            res.render("failure", {
                title: "Reset Password",
                style: "app.css",
                failureMessage: error.message,
            });
        }
    }
}

export default new ViewController();
