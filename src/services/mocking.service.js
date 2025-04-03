import mocking from "../utils/Mocking.js";

export default class MockingService {
    constructor(){}

    async mockingProducts(quantity) {
        try {
            const fakeProducts = [];
            for (let i = 0; i < quantity; i++) {
                const dbProduct = await this.mocking.mockingProducts();
                fakeProducts.push(dbProduct)
            }
            return fakeProducts;
        } catch (error) {
            throw error;
        }
    }
}