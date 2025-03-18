
import { z } from 'zod'

const queryParamsSchema = z.object({
    limit: z.string().optional(),
    page: z.string().optional(),
    sort: z.enum(["asc", "desc"]).optional(),
    query: z.object({
        category: z.string().optional(),
        status: z.string().optional(),
    }).optional(),
});

function validateQueryParams(data){
    const { limit, page, sort, query} = data;
    let parsedQuery = undefined;
    if (query) {
        try {
            parsedQuery = JSON.parse(query)
        } catch (error) {
            throw new Error("Error al analizar el string JSON en query")
        }
    }
    const validationResult = queryParamsSchema.safeParse({
        limit,
        page,
        sort,
        query: parsedQuery
    });

    if (validationResult.success) {
        return validationResult.data
    } else {
        throw new Error("Query Params invalidos")
    }
}

export default validateQueryParams