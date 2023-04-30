const ErrorHandler = require('../utils/errorHandler');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const nodemailer = require("nodemailer")

//New order creation
exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    });
    res.status(201).json({
        success:true,
        order
    });
});

//Scheduled pickup
exports.scheduledPickup = catchAsyncError(async(req,res,next)=>{
        let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: "pace191401@gmail.com", 
            pass: "cfqzpsliyduxwlks",
        },
    });
        await transporter.sendMail({
        from: '"MealForAll" <pace191401@gmail.com>',
        to: req.user.email, // list of receivers
        subject: "Wohooo", // Subject line
        text: `Your order has been scheduled for pickup.`, // plain text body
    });
    res.status(200).json({
        success:true
    })
})

//Getting single order details 
exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new ErrorHandler('No order found',404));
    }
    res.status(200).json({
        success:true,
        order
    });
});

//Getting all orders --User
exports.myOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id});

    res.status(200).json({
        success:true,
        orders
    });
})

//Getting all orders --Admin
exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    });
    res.status(200).json({
        success:true,
        orders
    });    
});

//Updating order --Admin
exports.updateOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler('No order found',404));
    }
    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('Order has been delivered already.',400));
    }
    order.orderItems.forEach(async(item)=>{
        await updateStock(item.productId,item.quantity);
    });

    order.orderStatus = req.body.status;

    if(req.body.status === 'Delivered'){
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,

    });
});

const updateStock = async(productId,quantity)=>{
    const product = await Product.findById(productId);
    product.Stock -= quantity;
    await product.save({validateBeforeSave:false});
}

//Delete order --Admin
exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const product = await Order.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Order not found',404));
    }
    await product.remove();
    res.status(200).json({
        success:true
    });
});