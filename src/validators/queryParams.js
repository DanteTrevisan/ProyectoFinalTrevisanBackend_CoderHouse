import QueryParams from '../improvised_utils/queryParams';
import { z } from 'zod'

const queryParamsSchema = z.object({
    limit: z.string().optional()
})

function validateQueryParams(data){
    let validatedData = new QueryParams();
    const validationResult = queryParamsSchema.safeParse(data);
    if (validationResult.success){
        validatedData.limit = validationResult.data
    }
    return validatedData
}

export default validateQueryParams