const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Product name required'],
        trim: true
    },
    description:{
        type:String,
        required:[true,'Product Description required']
    },
    price:{
        type:Number,
        required:[true,'Product price required'],
        maxLength:[8,'Max price of 8 characters allowed']
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,'Category required']
    },
    Stock:{
        type:Number,
        required:[true,'Stock required'],
        default:1,
        maxLength:[4,'Max stock 4 allowed']

    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
        },
            
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    }

});

module.exports = mongoose.model("Product",productSchema);