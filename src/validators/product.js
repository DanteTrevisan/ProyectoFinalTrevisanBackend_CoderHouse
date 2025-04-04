import ErrorHandler from "../utils/ErrorHandler.js";
import productInfoError from "../utils/errors/productInfo.error.js";
import errorTypes from "../utils/errorTypes.js";
import { z } from "zod";

const productSchema = z.object({
    title: z.string(),
    description: z.string(),
    code: z.string(),
    price: z.number().min(0, { message: "Price cannot be negative" }),
    stock: z.number().min(0, { message: "Stock cannot be negative" }),
    category: z.string(),
    status: z.boolean().optional(),
    thumbnail: z.array(z.string()).optional(),
    owner: z.string().optional(),
  });
  
  function validateProduct(data) {
    const validationResult = productSchema.safeParse(data);
    if (validationResult.success) {
      return validationResult.data;
    } else {
      const errorDetails = validationResult.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw ErrorHandler.customError(
        "Product validation error",
        `Invalid product data: ${errorDetails}`,
        errorTypes.ERROR_DATA,
        productInfoError(data)
      );
    }
  }
  
  export default validateProduct;