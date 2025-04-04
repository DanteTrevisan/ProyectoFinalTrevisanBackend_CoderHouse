import { Router } from "express";

import productsRouter from "./product.router.js";
import cartsRouter from "./cart.router.js";
import sessionsRouter from "./session.router.js";
import viewsRouter from "./view.router.js";
import mockingRouter from "./mocking.router.js";
import loggerRouter from "./logger.router.js";
import usersRouter from "./user.router.js";

import { apiRoute, productsRoute, cartsRoute, sessionRoute, userRoute } from "../utils/routes.js";

const routes = Router();

routes.use(apiRoute + productsRoute, productsRouter); // API Products
routes.use(apiRoute + cartsRoute, cartsRouter); // API Carts
routes.use(apiRoute + sessionsRoute, sessionsRouter); // API Sessions
routes.use(apiRoute + usersRoute, usersRouter); // API Users
routes.use(mockingRouter); // Mocking
routes.use(loggerRouter); // Logger
routes.use(viewsRouter); // Views

export default routes;