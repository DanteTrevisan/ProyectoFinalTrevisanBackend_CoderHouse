import * as url from "url";

const directoryUrl = new URL("../..", import.meta.url);

export const rootPath = url.fileURLToPath(directoryUrl);
console.log(rootPath)
export const productsPath = rootPath + "src\\data\\products.json"
console.log(productsPath)
export const cartsPath = rootPath + "src\\data\\carts.json"
console.log(cartsPath)
export const productsImagesPath = rootPath + "src\\assets\\images\\products"
console.log(productsImagesPath)




