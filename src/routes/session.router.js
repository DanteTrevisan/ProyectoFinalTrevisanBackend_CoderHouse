import { Router } from "express";
import passport from "passport";
import adminAuth from "../middlewares/adminAuth.js";
import sessionController from "../controllers/session.controller.js";

const sessionsRouter = Router();

/** ENDPOINT: /api/sessions */

/** REGISTER */
sessionsRouter.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  sessionController.register
);

sessionsRouter.get("/failregister", sessionController.registerFail);

/** LOGIN */
sessionsRouter.post(
  "/login",
  adminAuth,
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  sessionController.login
);

sessionsRouter.get("/faillogin", sessionController.loginFail);

/** LOGOUT */
sessionsRouter.post("/logout", sessionController.logout);

/** CURRENT */
sessionsRouter.get("/current", sessionController.current);

export default sessionsRouter;
