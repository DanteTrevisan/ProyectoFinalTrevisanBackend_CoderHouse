import { z } from 'zod'

const pidSchema = z.string();

function validateId(data){
    let validatedData = null;
    const validationResult = pidSchema.safeParse(data);
    if(validationResult.success){
        const dataNumber = parseInt(validationResult.data);
        if(!isNaN(dataNumber)){
            validatedData = dataNumber
        }
    }
    return validatedData
}

export default validateId