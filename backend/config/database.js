const mongoose = require("mongoose");

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true,family: 4})
    .then((data)=>{
    console.log(`mongoDB connected to server: ${data.connection.host}`);
    })
}

module.exports = connectDatabase;