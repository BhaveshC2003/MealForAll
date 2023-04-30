const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/ApiFeatures');
const cloudinary = require('cloudinary');
const User = require("../models/userModel")
const nodemailer = require("nodemailer")

//Create product --Admin
exports.createProduct = catchAsyncError(async(req,res,next)=>{
    let imagesData = [];
    for(let i=0;i<req.body.images.length;i++){
        const myCloud = await cloudinary.v2.uploader.upload(req.body.images[i],{
            folder:"Food"
        })
        imagesData.push({
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        })
    }
    req.body.images = imagesData;
    const product = await Product.create(req.body);
    const latitude = [product.latitude-0.1,product.latitude+0.1]
    const longitude = [product.longitude-0.1,product.longitude+0.1]
    const userEmails = await User.find({latitude:{$gte:latitude[0],$lte:latitude[1]},longitude:{$gte:longitude[0],$lte:longitude[1]}}).select("email")
    let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: "pace191401@gmail.com", 
                pass: "cfqzpsliyduxwlks",
            },
        });
        let info;
            for (var i = 0; i < userEmails.length; i++) {
                info = await transporter.sendMail({
                    from: '"MealForAll" <pace191401@gmail.com>',
                    to: userEmails[i].email, // list of receivers
                    subject: "Wohooo", // Subject line
                    text: `${product.name} has been added on MealForAll `, // plain text body
                });
            }
    res.status(201).json({
        success:true,
        product
    });
});

//Get all products 
exports.getAllProducts = catchAsyncError(async(req,res,next)=>{
    const productsPerPage = 8;
    const totalProducts = await Product.countDocuments();

    let apiFeatures = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter();

    let products = await apiFeatures.query;  
    const filteredProductCount = products.length; 
    apiFeatures.pagination(productsPerPage);
    products = await apiFeatures.query.clone();
    res.status(200).json({
        success:true,
        products,
        totalProducts,
        productsPerPage,
        filteredProductCount
    });
});

//Get all products --Admin
exports.getAdminProducts = catchAsyncError(async(req,res,next)=>{
    const products = await Product.find()
    res.status(200).json({
        success:true,
        products
    })
})


//Updating product --Admin
exports.updateProduct = catchAsyncError(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product not found',404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
         new:true,
         runValidators:true,
         useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    });
});

//Getting product details
exports.getProductDetails = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    const user = req.user
    if(!product){
       return next(new ErrorHandler('Product not found',404));
    }
        const lon1 = user.longitude * Math.PI / 180;
		const lon2 = product.longitude * Math.PI / 180;
		const lat1 = user.latitude * Math.PI / 180;
		const lat2 = product.latitude * Math.PI / 180;

		let dlon = lon1 - lon2;
		let dlat = lat1 - lat2;
		let a = Math.pow(Math.sin(dlat / 2), 2)
				+ Math.cos(lat1) * Math.cos(lat2)
				* Math.pow(Math.sin(dlon / 2),2);
			
		let c = 2 * Math.asin(Math.sqrt(a));

		let r = 6371;
        const distance = (c*r).toFixed(3)
    res.status(200).json({
        success:true,
        product,
        distance
    });
});


//Deleting product

exports.deleteProduct = catchAsyncError(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Failed to delete',404));
    }
    for(let i=0;i<product.length;i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product deleted"
    });
    
});

//Adding review
exports.createProductReview = catchAsyncError(async(req,res,next)=>{
    const {rating,comment,productId} = req.body;

    const product = await Product.findById(productId);

    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
        const isReviewed = product.reviews.find((rev)=>rev.user.toString() === req.user._id.toString())

    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString() == req.user._id.toString()){
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    }else{
        product.reviews.push(review);
        product.numOfReviews++;
    }
    let totalRating = 0;
    product.reviews.forEach(rev=>{
        totalRating += rev.rating;
    });
    product.rating = totalRating/product.numOfReviews;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true
    })

});

//Get all reviews
exports.getAllReviews = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler('Product not found',400));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    });
    
});

//Deleting reviews
exports.deleteReview = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler('Product not found',400));
    }
    const reviews = product.reviews.filter(rev=>rev._id.toString() !== req.query.id.toString());

    let totalRating = 0;
    reviews.forEach(rev=>{
        totalRating += rev.rating;
    })

    const rating = reviews.length == 0 ? 0 : totalRating/reviews.length;

    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId,
        {numOfReviews,reviews,rating},{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });

    res.status(200).json({
        success:true
    });
});





