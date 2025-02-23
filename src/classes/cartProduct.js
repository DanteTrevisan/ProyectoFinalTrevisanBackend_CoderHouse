class CartProduct {
    constructor(product, quantity = 1){
        if(!product){
            throw new Error(
                "Se necesitan los parametros del constructor de CartProduct"
            )
        }
        this.product = product;
        this.quantity = quantity
    }

    raiseQuantity(){
        this.quantity += 1;
    }
}

export default CartProduct