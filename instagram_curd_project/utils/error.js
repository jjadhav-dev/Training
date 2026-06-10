class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message)
        this.name = this.constructor.name
        this.statusCode = statusCode
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }
}

class ConflictError extends AppError {
    constructor(message="Already exists") {
        super(message, 409)
    }
}

class NotFoundError extends AppError {
    constructor(message = "Not Found") {
        super(message, 404)
    }
}

class validationError extends AppError {
    constructor(message = "Validation Error") {
        super(message, 400)
    }
}


module.exports = {  
    AppError,
    ConflictError,
    NotFoundError,
    validationError
}


