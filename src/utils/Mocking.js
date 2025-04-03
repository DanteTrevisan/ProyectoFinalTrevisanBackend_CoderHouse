import { faker } from "@faker-js/faker";

class Mocking {
    constructor(){}

    async mockingProduct() {
        const dbProduct = {
            _id: faker.database.mongodbObjectId(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.string.alphanumeric(10),
            price: parseFloat(faker.commerce.price()),
            stock: faker.number.int({min: 0, max: 1000}),
            category: faker.commerce.department(),
            status: faker.datatype.boolean(),
            thumbnail: [faker.image.url()],
            owner: faker.datatype.boolean() ? faker.internet.email() : "admin",
        };
        return dbProduct;
    }
}

export default new Mocking();