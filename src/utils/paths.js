import * as url from "url";
import path from "path";

const directoryUrl = new URL("../../", import.meta.url);

export const rootPath = url.fileURLToPath(directoryUrl);
console.log(rootPath)
export const productsPath = rootPath + "src\\data\\products.json"
export const cartsPath = rootPath + "src\\data\\carts.json"
export const productsImagesPath = rootPath + "src\\assets\\images\\products"




