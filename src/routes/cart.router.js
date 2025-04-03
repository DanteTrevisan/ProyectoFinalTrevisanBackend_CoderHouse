import { Router } from "express";
import { productRoute } from "../utils/routes.js";
import cartController from "../controllers/cart.controller.js";
import endpointAuth from "../middlewares/endpointAuth.js";

const cartsRouter = Router();

/** ENDPOINT: /api/carts */

/** GET ENDPOINTS */
cartsRouter.get("/", cartController.getAllCarts);
cartsRouter.get("/:cid", cartController.getCartById);

/** POST ENPOINTS */
cartsRouter.post("/", cartController.createCart);
cartsRouter.post(
  "/:cid" + productRoute + "/:pid",
  endpointAuth(["user", "premium"]),
  cartController.addProductCart
);
cartsRouter.post("/:cid/purchase", cartController.purchase);

/** PUT ENPOINTS */
cartsRouter.put("/:cid", cartController.updateCart);
cartsRouter.put(
  "/:cid" + productRoute + "/:pid",
  cartController.updateProductQuantityCart
);

/** DELETE ENPOINTS */
cartsRouter.delete(
  "/:cid" + productRoute + "/:pid",
  cartController.removeProductCart
);
cartsRouter.delete("/:cid", cartController.clearCart);

export default cartsRouter;
