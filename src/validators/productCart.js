import { z } from "zod";
import ErrorHandler from "../utils/ErrorHandler.js";
import errorTypes from "../utils/errorTypes.js";

const productCartSchema = z.object({
    product: z.string(),
    quantity: z.number().min(0, { message: "Quantity cannot be negative"}),
}).strict();

function validateProductCart(data) {
    const validatedProducts = [];

    for (const item of data) {
        const validationResult =  productCartSchema.safeParse(item);
        if(validationResult.success) {
            validatedProducts.push(validationResult.data);
        } else {
            const errorDetails = validationResult.error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join(", ");
            throw ErrorHandler.customError(
                "Data validation error",
                `Invalid Product Cart: ${errorDetails}`,
                errorTypes.ERROR_DATA,
                `ProductCart instance was expected. Received: ${JSON.stringify(item)}`
            );
        }
    }
    return validatedProducts;
}

export default validateProductCart