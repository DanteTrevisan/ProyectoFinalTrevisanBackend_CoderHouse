import { Router } from "express";
import productController from "../controllers/product.controller.js";
import endpointAuth from "../middlewares/endpointAuth.js";

const productsRouter = Router();

/** ENDPOINT: /api/products */

/** GET ENDPOINTS */
productsRouter.get("/", productController.getAllProducts);
productsRouter.get("/:pid", productController.getProductById);

/** POST ENDPOINT */
productsRouter.post(
  "/",
  endpointAuth(["admin", "premium"]),
  productController.createProduct
);

/** PUT ENDPOINT */
productsRouter.put(
  "/:pid",
  endpointAuth(["admin", "premium"]),
  productController.updateProduct
);

/** DELETE ENDPOINT */
productsRouter.delete(
  "/:pid",
  endpointAuth(["admin", "premium"]),
  productController.deleteProduct
);

export default productsRouter;
