class Product{
    constructor(code, title, description, price, thumbnail, stock){
        if(!(code && title && description && price && thumbnail &&stock)){
            throw Error("Los parametros del constructor son obligatorios")
        }

        this.code = code
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.stock = stock
    }

    addId(id){
        return{
            id,
            code: this.code,
            title: this.title,
            description: this.description,
            price: this.price,
            thumbnail: this.thumbnail,
            stock: this.stock,
        }
    }
}

export default Product