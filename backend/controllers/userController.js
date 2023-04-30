const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/sendToken');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary') 

exports.registerUser = catchAsyncError(async(req,res,next)=>{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'Avatars',
        width:150,
        crop:"scale"
    })
    const {name,email,password,longitude,latitude,role} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        },
        longitude,
        latitude,
        role
    });
    sendToken(user,201,res);
})

exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const details = req.body;
    if(!details.email || !details.password){
        return next(new ErrorHandler("Please enter email and password",400));
    }
    const user = await User.findOne({email:details.email}).select('+password');
    
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    const isPasswordMatched = await user.comparePassword(details.password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invaild email or password",401));
    }
    await user.update({latitude:details.latitude,longitude:details.longitude})
    await user.save()
    sendToken(user,200,res);

});


exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler(`User with email ${req.body.email} does not exist`),404);
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    const message = `Your reset password token is :- \n\n ${resetPasswordUrl}`

    try{
        await sendEmail({
        email:user.email,
        subject: 'Password recovery',
        message
        });

        res.status(200).json({
            success:true,
            message:`Mail sent to ${user.email} successfully`
        });
    }catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        
        return next(new ErrorHandler(err.message,500));
    }
});


exports.logoutUser = catchAsyncError((req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message: 'Logged Out'
    });
});


exports.resetPassword = catchAsyncError(async(req,res,next)=>{
    //Hashing token to find saved hashed token in database
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.find({resetPasswordToken,
                                resetPasswordExpire:{$gt:Date.now()}
                                });
    if(!user){
        return next(new ErrorHandler('Invaild token or token has expired',400));
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password do not match',400));
    }
    user.password = req.body.password;
    sendToken(user,200,res);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
});

//Getting user details
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
   
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    });
    
});

//Updating password
exports.updatePassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler('Old password is incorrect',400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler('Password do not match',400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user,200,res);
});  

//Updating profile
exports.updateProfile = catchAsyncError(async(req,res,next)=>{

    const updatedDetails = {
        name: req.body.name,
        email:req.body.email
    }
    if(req.body.avatar !== ""){
        const user = await User.findById(req.user.id)
        const imageId = user.avatar.public_id
        await cloudinary.v2.uploader.destroy(imageId)
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"Avatars",
            width:150,
            crop:"scale"
        })
        updatedDetails.avatar={
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    }

    await User.findByIdAndUpdate(req.user.id,updatedDetails,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        message:'Changed made successfully'
    });
});

//For Admin
exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    });
});

exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler('User does not exist',400));
    }
    res.status(200).json({
        success:true,
        user
    });
});

exports.updateUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler('User does not exist',400));
    }
    const updatedDetails = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    await user.update(updatedDetails);
    res.status(200).json({
        success:true
    });

});

exports.deleteUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler('User does not exist',400));
    }

    await user.remove();
    res.status(200).json({
        success:true,
        message:'User deleted'
    });
});