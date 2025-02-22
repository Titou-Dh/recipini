import mongoose from "mongoose";


let isConnected = false;
export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('mongo already connected');
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_prompt",
            useUnifiedTopology:true,
        })
        isConnected = true;
        console.log('MongoDB Connected')
        
    }
    catch(error){
        console.log(error);
    }
} 