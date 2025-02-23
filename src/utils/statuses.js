export const successStatus = {
    status: "SUCCESS"
}

export function failureStatus(message){
    return{
        status: "FAILURE",
        message
    }
}