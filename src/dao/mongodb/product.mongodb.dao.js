import { productsModel } from "./models/product.mongodb.model.js";

class ProductMongodbDAO {
    constructor(){}

    async getAll(limit, page, sort, query){
        try {
            const options = {
                limit: limit,
                page: page,
                sort: sort === "asc" ? { price: 1 } : { price: -1},
                lean: true,
            };
            const result = await productsModel.paginate(query, options);
            const products = {
                status: "success",
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
            };
            return products;
        } catch (error) {
            throw error;
        }
    }

    async create(productObj){
        try {
            const existingProduct = await productsModel.findOne({
                code: productObj.code
            });
            if (existingProduct) {
                throw new Error("El codigo del producto que esta intentando agregar ya existe. Utilice otro codigo");
            }
            await productsModel.create(productObj);
        } catch (error) {
            throw error;
        }
    }

    async getById(id){
        try {
            const product = await productsModel.findById(id);
            const dbProduct = await product.toObject();
            return dbProduct
        } catch (error) {
            throw error;
        }
    }

    async update(id, updateObj){
        try {
            const product = await this.getById(id);
            Object.keys(updateObj).forEach((key) => {
                product[key] = updateObj[key]
            });
            await productsModel.updateOne({ _id:id}, { $set: product})
        } catch (error) {
            throw error
        }
    }

    async delete(id){
        try {
            await productsModel.deleteOne({ _id: id})
        } catch (error) {
            throw error
        }
    }
}

export default ProductMongodbDAO;