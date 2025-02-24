export default class UpdateProduct  {
    constructor(title = undefined,
        description = undefined,
        code = undefined,
        price = undefined,
        stock = undefined,
        category =undefined,
        status = undefined,
        thumbnail = undefined,
        key,
        data
    ){
        this.description = description;
        this.code = code;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.status = status;
        this.thumbnail = thumbnail;
        this.key = key;
        this.data = data
    }
}