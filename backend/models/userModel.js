const mongoose = require('mongoose');
const validator = require('validator'); //Checking for valid email
const bcrypt = require("bcryptjs"); //Hashing password
const jwt = require("jsonwebtoken"); //For creating jsonweb tokens
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name required'],
        minLength:[4,'Name should be greater than 4 characters'],
        maxLength:[50,'Name cannot exceed more than 50 characters']
    },
    email:{
        type:String,
        required:[true,'Email required'],
        unique:true,
        validate:[validator.isEmail,'Enter a vaild email']
    },
    password:{
        type:String,
        required:[true,'Password required'],
        minLength:[8,'Minimum length of password should be 8 character'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        }
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    latitude:Number,
    longitude:Number,
    resetPasswordToken:String,
    resetPasswordExpire:Date
});

//Hashing password before saving
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);

});

//Creating JWT 
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE 
    });
}

//Verifying password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

//Reset password token creation
userSchema.methods.getResetPasswordToken = async function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;
}

module.exports = mongoose.model('User',userSchema);