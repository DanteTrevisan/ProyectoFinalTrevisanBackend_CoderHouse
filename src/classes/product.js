class Product{
    constructor(title, description, code, price, stock, category, status, thumbnail){
        if(!(title && description && code && price && stock && category && status && thumbnail)){
            throw Error("Los parametros del constructor son obligatorios")
        }

        this.title = title;
        this.description = description;
        this.price = price;
        this.code = code;
        this.stock = stock;
        this.category = category;
        this.status = status;
        this.thumbnail = thumbnail
    }

    addId(id){
        const idProduct = {
            id,
            title: this.title,
            description: this.description,
            code: this.code,
            price: this.price,
            stock: this.stock,
            category: this.category,
            status: this.status,
            thumbnail: this.thumbnail,
        };
        return idProduct
    }
}

export default Product