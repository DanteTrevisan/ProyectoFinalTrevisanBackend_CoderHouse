import ProductMongodbDAO from "../dao/mongodb/product.mongodb.dao";

export default class ProductService {
  dao;

  constructor(dao) {
    this.dao = dao;
  }

  async getAllProducts(limit, page, sort, query) {
    return await this.dao.getAll(limit, page, sort, query);
  }

  async createProduct(productObj) {
    return await this.dao.create(productObj);
  }

  async getProductById(id) {
    return await this.dao.getById(id);
  }

  async updateProduct(id, updateObj) {
    return await this.dao.update(id, updateObj);
  }

  async deleteProduct(id) {
    return await this.dao.delete(id);
  }
}
