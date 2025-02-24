import { z } from 'zod';

const updateProductSchema = z.object({
    title: z.string().optional,
    description: z.string().optional,
    code: z.string().optional,
    price: z.number().optional,
    stock: z.number().optional,
    category: z.string().optional,
    status: z.boolean().optional,
    title: z.string().optional,
});

function validateUpdateProduct(data) {
    let validatedData
    const validationResult = updateProductSchema.safeParse(data);
    if(validationResult.success) {
        if(!(Object.keys(validationResult.data).length === 0)){
            validatedData = validationResult.data
        }
    }
    return validatedData
}

export default validateUpdateProduct