import { usersModel } from "./models/user.mongodb.model.js";

class UserMongodbDAO {
    constructor() { }

    async getAll() {
        try {
            const dbUsers = await usersModel.find();
            return dbUsers
        } catch (error) {
            throw error
        }
    }

    async getByEmail(email) {
        try {
            const DbUser = await usersModel.findOne({ email: email });
            return DbUser
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            const DbUser = await usersModel.findById(id);
            return DbUser;
        } catch (error) {
            throw error;
        }
    }

    async create(newUser) {
        try {
            const result = (await usersModel.create(newUser)).toObject();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getByCart(cartId) {
        try {
            const DbUser = await usersModel.findOne({ cart: cartId });
            return DbUser;
        } catch (error) {
            throw error;
        }
    }

    async getByToken(token) {
        try {
            const DbUser = await usersModel.findOne({ resetToken: token });
            return DbUser;
        } catch (error) {
            throw error;
        }
    }

    async updateRolById(id, rol) {
        try {
            await usersModel.updateOne({ _id: id }, { $set: { rol } });
        } catch (error) {
            throw error;
        }
    }

    async updatePasswordByToken(token, password) {
        try {
            await usersModel.updateOne({ resetToken: token }, { $set: { password } });
        } catch (error) {
            throw error;
        }
    }

    async updateTokenByEmail(email, token, expires) {
        try {
            await usersModel.updateOne(
                { email: email },
                { $set: { resetToken: token, resetTokenExpires: expires } }
            );
        } catch (error) {
            throw error;
        }
    }

    async updateLastConnectionById(id) {
        try {
            await usersModel.updateOne(
                { _id: id },
                { $set: { last_connection: new Date() } }
            );
        } catch (error) {
            throw error;
        }
    }

    async addDocumentsById(id, newDocuments) {
        try {
            await usersModel.updateOne(
                { _id: id },
                { $push: { documents: { $each: newDocuments } } }
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteDocumentsById(id) {
        try {
            await usersModel.updateOne({ _id: id }, { $set: { documents: [] } });
        } catch (error) {
            throw error;
        }
    }

    // @@@@
    async deleteUserById(id) {
        try {
            await usersModel.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

}

export default UserMongodbDAO;