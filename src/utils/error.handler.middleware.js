import listErrors from "./list.errors.js";

export const errorHandlerMiddleware = (error, req , res ,next) => {
    console.error(error.case || error.message)
    switch(error.code){
        case listErrors.BAD_REQUEST_ERROR:
        case listErrors.INVALID_PARAMS_ERROR:
            res.status(400).json({message: error.message})
            break;
        case listErrors.DATA_BASE_ERROR:
        case listErrors.ROUTING_ERROR:
        default:
            res.status(500).json({message: error.message})                
    }
    next();
}