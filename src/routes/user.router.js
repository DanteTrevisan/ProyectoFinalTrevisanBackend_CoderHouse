import { Router } from "express";
import userController from "../controllers/user.controller.js";
import endpointAuth from "../middlewares/endpointAuth.js";
import { uploadFields } from "../middlewares/uploadFields.js";

const usersRouter = Router();

/** ENDPOINT: /api/users */

/** GET ENPOINTS */
usersRouter.get("/", userController.getAllUsers);

/** POST ENPOINTS */
usersRouter.post(
  "/:uid/documents",
  uploadFields,
  userController.uploadDocumentsByIdUser
);

/** PUT ENPOINTS */
usersRouter.put(
  "/premium/:uid",
  endpointAuth(["admin"]),
  userController.updateUserRolById
);
usersRouter.put("/reset-password", userController.resetPasswordUser);
usersRouter.put("/create-new-password", userController.createNewPasswordUser);

/** DELETE ENPOINTS */
usersRouter.delete("/:uid/documents", userController.deleteDocumentsByIdUser);
usersRouter.delete("/", userController.clearInactiveUsers);
usersRouter.delete("/:uid", userController.deleteUserByIdUser);

export default usersRouter;
