const app = require('./app');
const cloudinary = require('cloudinary')
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//Config
dotenv.config({path:'backend/config/config.env'});

//Conncecting to database
connectDatabase();
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API,
    api_secret:process.env.CLOUD_SECRET
})


//Uncaught Error
process.on("uncaughtException",(err)=>{
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
});


const server = app.listen(process.env.PORT,()=>{
    console.log(`connected to server on port ${process.env.PORT}`);
});



//Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(err.message)
    console.log("Unhandled promise rejection");
    console.log("Shutting down the server...");

    server.close(()=>{
        console.log('Server shut down');
        process.exit(1);
    });
})