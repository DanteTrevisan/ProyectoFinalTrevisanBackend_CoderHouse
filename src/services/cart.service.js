import CartMondodbDAO from "../dao/mongodb/cart.mongodb.dao.js";

export default class CartService {
    dao;

    constructor(dao){
        this.dao = dao;
    }

    async getAllCarts(){
        return await this.dao.getAll()
    }

    async createCart() {
        return await this.dao.create();
      }
    
      async getCartById(id) {
        return await this.dao.getById(id);
      }
    
      async addProductCart(cid, pid) {
        return await this.dao.addProduct(cid, pid);
      }
    
      async removeProductCart(cid, pid) {
        return await this.dao.removeProduct(cid, pid);
      }
    
      async updateCart(cid, updateProducts) {
        return await this.dao.update(cid, updateProducts);
      }
    
      async updateProductQuantityCart(cid, pid, quantity) {
        return await this.dao.updateProductQuantity(cid, pid, quantity);
      }
    
      async clearCart(cid) {
        return await this.dao.clear(cid);
      }
}