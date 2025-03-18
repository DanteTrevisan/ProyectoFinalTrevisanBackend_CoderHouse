 export default class Cart {
    products = []
    constructor(products = []){
        this.products = products
    }

    addId(id){
        const idCart = {
            id,
            products: this.products
        };
        return idCart
    }
}