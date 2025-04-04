import { failureStatus, successStatus } from "../utils/statuses.js";
import { productsRoute } from "../utils/routes.js";
import CurrentUserDTO from "../dao/dto/currentUser.dto.js";
import { userService } from "../services/services.js";

class SessionController {
    constructor() { }

    async register(req, res) {
        res.status(201).json(successStatus);
    }

    async registerFail(req, res) {
        const message = "Error al registrar el usuario.";
        req.logger.error(message);
        res.json(failureStatus(message));
    }

    async login(req, res) {
        if (!req.user) {
            return res.status(400).json(failureStatus("Error de credenciales."));
        }
        req.session.user = new CurrentUserDTO(req.user).currentUser;
        res.status(200).json(successStatus);
    }

    async loginFail(req, res) {
        res.json(failureStatus("Login fail."));
    }

    async logout(req, res) {
        // ADMIN
        if (req.session.admin) {
            return req.session.destroy(async (error) => {
                if (!error) {
                    res.status(200).json(successStatus);
                } else {
                    res.status(404).json(failureStatus(error.message));
                }
            });
        }
        // USERS
        const id = (
            await userService.getUserByEmail(req.session.user.email)
        )._id;
        req.session.destroy(async (error) => {
            if (!error) {
                await userService.updateLastConnectionById(id);
                res.json(successStatus);
            } else {
                res.json(failureStatus(error.message));
            }
        });
    }

    async current(req, res) {
        if (req.session.user) {
            res.json(req.session.user);
        } else {
            res.json(failureStatus("No hay sessión."));
        }
    }
}

export default new SessionController();
