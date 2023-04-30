const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const stripe = require('stripe')("sk_test_51LdDlrSBycbbtHz5rY9QbvA8KIdEYP2y7aK2pJC0ah5Ov2MVGSDYp4hYpKHWCgJUqom9A6hXkdT3L3HCwikl4Jou00ojia0na9")

exports.processPayment = catchAsyncError(async(req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecommerce"
        }
    })
    res.status(200).json({
        success:true,
        client_secret:myPayment.client_secret
    })
})

exports.getStripeApiKey = catchAsyncError(async(req,res,next)=>{
    res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY})
})