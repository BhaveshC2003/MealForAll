const ErrorHandler = require('../utils/errorHandler');

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    if(err.name === 'CastError'){
        const message = `Resource not found.Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)}`
        err = new ErrorHandler(message,err.code);
    }

    if(err.name === 'JsonWebTokenError'){
        const message = 'Invaild JsonWebToken.Try again later'
        err = new ErrorHandler(message,400);
    }

    if(err.name === 'TokenExpiredError'){
        const message = 'Token has expired.Try again'
        err = new ErrorHandler(message,400);
    }
    
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
}