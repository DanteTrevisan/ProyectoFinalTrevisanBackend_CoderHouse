import { successStatus } from "../utils/statuses.js";
import config from "../config/env.config.js";

function adminAuth(req, res, next) {
  const { email, password } = req.body;
  if (email === config.adminEmail && password == config.adminPassword) {
    req.session.admin = {
      email: email,
      rol: "admin",
    };
    return res.status(200).json(successStatus);
  }
  next();
}

export default adminAuth;