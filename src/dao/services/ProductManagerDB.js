import { productsModel } from "../models/products.model.js";


class ProductManagerDB {
    totalProducts = 0;

    constructor(){
        try {
            this.initializeTotalProducts()
        } catch (error) {
            throw error
        }
    }

    async initializeTotalProducts(){
        this.totalProducts = await this.getTotalProducts();
    }

    async getTotalProducts(){
        try {
            const totalProducts = await productsModel.countDocuments();
            return totalProducts
        } catch (error) {
            throw error
        }
    }

    async addProduct(productObj) {
        try {
            const existingProduct = await productsModel.findOne({
                code: productObj.code
            });
            if (existingProduct) {
                throw new Error(
                    "El codigo del producto que esta intentando agregar ya existe. Utilice otro codigo"
                );
            }
            await productsModel.create(productObj)
        } catch (error) {
            throw error
        }
    }

    async getProducts(limit, page, sort,query){
        try {
            const options ={
                limit: limit,
                page: page,
                sort: sort === "asc" ? {price: 1} : {price: -1},
                lean: true
            };
            const result = await productsModel.paginate(query, options);
            const products = {
                status: "success",
                payload: result.docs,
                totalPages: result.totalPages,
                prevPages: result.prevPages,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage
            };
            return products
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id){
        try {
            const product = await productsModel.findById(id);
            const dbProduct = await product.toObject();
            return dbProduct
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, updateObj){
        try {
            const product = await this.getProductById(id);
            Object.keys(updateObj).forEach((key) => {
                product[key] = updateObj[key]
            });
            await productsModel.updateOne({_id: id}, {$set: product})
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(id){
        try {
            await productsModel.deleteOne({_id: id})
        } catch (error) {
            throw error
        }
    }
}

export default ProductManagerDB