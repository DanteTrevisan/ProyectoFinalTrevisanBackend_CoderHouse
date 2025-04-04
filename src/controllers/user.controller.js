import { userService } from "../services/services.js";
import { successStatus, failureStatus } from "../utils/statuses.js";
import { createHash, isValidPassword } from "../utils/passwordHashing.js";
import { generatePasswordResetToken } from "../utils/resetToken.js";
import ApiUsersDTO from "../dao/dto/apiUsers.dto.js";

class UserController {
    constructor() { }

    /** CREATE */

    /** READ */

    async getAllUsers(req, res) {
        try {
            const dbUsers = await userService.getAllUsers();
            const users = new ApiUsersDTO(dbUsers);
            res.status(200).json(users);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }

    /** UPDATE */

    async updateUserRolById(req, res) {
        try {
            const uid = req.params.uid;
            const dbUser = await userService.getUserById(uid);
            const requiredDocuments = [
                "identificacion",
                "comprobante-domicilio",
                "comprobante-estado-cuenta",
            ];
            let rol = "";
            // user -> premium
            if (dbUser.rol === "user") {
                const userDocuments = dbUser.documents.map((doc) =>
                    doc.name.split(".").slice(0, -1).join(".")
                );
                const hasAllDocuments = requiredDocuments.every((doc) =>
                    userDocuments.includes(doc)
                );
                if (hasAllDocuments) {
                    rol = "premium";
                } else {
                    return res.status(400).json({
                        message: "El usuario no ha terminado de procesar su documentación.",
                    });
                }
            }
            // premium -> user
            if (dbUser.rol === "premium") {
                rol = "user";
            }
            await userService.updateUserRolById(uid, rol);
            res.status(200).json(successStatus);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }

    async createNewPasswordUser(req, res) {
        try {
            const { password } = req.body;
            const token = req.query.token;
            const dbUser = await userService.getUserByToken(token);
            if (!dbUser || dbUser.resetTokenExpires < Date.now()) {
                res.render("resetPassword", {
                    title: "Reset Password",
                    style: "app.css",
                });
            }
            if (isValidPassword(dbUser, password)) {
                req.logger.error("You can't use the same password than before.");
                return res
                    .status(400)
                    .json({ message: "You can't use the same password than before." });
            }
            await userService.updateUserPasswordByToken(token, createHash(password));
            res.status(200).json(successStatus);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }


    /** DELETE */

    async deleteDocumentsByIdUser(req, res) {
        try {
            const uid = req.params.uid;
            await userService.deleteDocumentsByIdUser(uid);
            res.status(200).json(successStatus);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }

    async clearInactiveUsers(req, res) {
        try {
            const timeNowMilliseconds = new Date().getTime();
            const twoDaysMilliseconds = 2 * 24 * 60 * 60 * 1000;
            const dbUsers = await userService.getAllUsers();
            for (let i = 0; i < dbUsers.length; i++) {
                if (dbUsers[i].last_connection != null) {
                    if (
                        timeNowMilliseconds -
                        new Date(dbUsers[i].last_connection).getTime() >
                        twoDaysMilliseconds
                    ) {
                        await userService.deleteUserByIdUser(dbUsers[i]._id);
                        await mailService.googleMailService(
                            dbUsers[i].email,
                            "Cuenta eliminada por inactividad",
                            "<p>Estimado usuario, su cuenta ha sido eliminada por estar inactiva por más de dos días.</p>"
                        );
                    }
                }
            }
            res.status(200).json(successStatus);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }

    async deleteUserByIdUser(req, res) {
        try {
            const uid = req.params.uid;
            await userService.deleteUserByIdUser(uid);
            res.status(200).json(successStatus);
        } catch (error) {
            res.json(failureStatus(error.message));
        }
    }
}

export default new UserController();
