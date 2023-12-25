import { ErrorRequestHandler } from "express"
import config from "../../config"
import { IGenericErrorMessage } from "../../interfaces/error"
import { handleValidationError } from "../../errors/validationError"
import ApiError from "../../errors/ApiError"


const GlobalErrorHandler:ErrorRequestHandler = (err, req, res, next) => {

    
    let statusCode = 500
    let message = 'something wrong'
    let errorMessage: IGenericErrorMessage[] = []


    if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessages;

    } else if (err instanceof ApiError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorMessage = err?.stack ?
            [
                {
                    path: '',
                    message: err?.message
                }
            ] : [];
    } else if (err instanceof Error) {
        message = err?.message;
        errorMessage = err?.message ?
            [
                { path: '', message: err?.message }
            ] : [];
    }

    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message,
        errorMessage,
        stack: config.env !== 'production' ? err?.stack : undefined
    })

    next()
}

export default GlobalErrorHandler;