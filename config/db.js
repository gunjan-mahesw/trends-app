const mongoose = require('mongoose');
const connectDb=async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
    }catch(error){
        console.error("MongoDB connection failed", error.message);
        process.exit(1); // Exit the process with failure
    }
}
module.exports = connectDb;