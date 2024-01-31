export class CustomErrors{
    static create({name = 'Error random', cause, message, code = 1}){
        const error = new Error(message);
        error.name = name;
        error.cause = cause;
        error.code = code;
        console.error(error);
        throw error;
    }
}