export default class ErrorHandler {
    static customError(name, message, code, description){
        const customError = new Error(message);
        customError.name = name;
        customError.code = code;
        customError.description = description;
        return customError;
    }
}