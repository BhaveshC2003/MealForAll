const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler('Please login to access this resource',401));
    }
    const decodedData =  jwt.verify(token,process.env.JWT_SECRET);
    req.user =  await User.findById(decodedData.id);
    next();
})

exports.isAuthorized = catchAsyncError((req,res,next)=>{
    if(req.user.role === 'user'){
        return next(new ErrorHandler('You are not authorized to access this resource',403));
    }
    next();
});

