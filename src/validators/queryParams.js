
import { z } from 'zod'

const queryParamsSchema = z.object({
    limit: z.string().optional()
})

function validateQueryParams(data){
    let validatedData
    const validationResult = queryParamsSchema.safeParse(data);
    if (validationResult.success){
        validatedData = validationResult.data
    }
    return validatedData
}

export default validateQueryParams