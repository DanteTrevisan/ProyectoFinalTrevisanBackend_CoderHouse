import UserMongodbDAO from "../dao/mongodb/user.mongodb.dao.js";

export default class UserService {
    dao;
  
    constructor(dao) {
      this.dao = dao;
    }
  
    async getAllUsers() {
      return await this.dao.getAll();
    }
  
    async getUserById(id) {
      return await this.dao.getById(id);
    }
  
    async getUserByEmail(email) {
      return await this.dao.getByEmail(email);
    }
  
    async createUser(newUser) {
      return await this.dao.create(newUser);
    }
  
    async getUserByCart(cartId) {
      return await this.dao.getByCart(cartId);
    }
  
    async getUserByToken(token) {
      return await this.dao.getByToken(token);
    }
  
    async updateUserRolById(id, rol) {
      return await this.dao.updateRolById(id, rol);
    }
  
    async updateUserPasswordByToken(token, password) {
      return await this.dao.updatePasswordByToken(token, password);
    }
  
    async updateUserTokenByEmail(email, token, expires) {
      return await this.dao.updateTokenByEmail(email, token, expires);
    }
  
    async updateLastConnectionById(id) {
      return await this.dao.updateLastConnectionById(id);
    }
  
    async addDocumentsById(id, newDocuments) {
      return await this.dao.addDocumentsById(id, newDocuments);
    }
  
    async deleteDocumentsByIdUser(id) {
      return await this.dao.deleteDocumentsById(id);
    }
  
    async deleteUserByIdUser(id) {
      return await this.dao.deleteUserById(id);
    }
  }