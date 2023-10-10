import mongoose from "mongoose"

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);
    if(!process.env.MONGODB_URL){
        console.log("MONGODB_URL is not defined");
        return null;
    }
    if(isConnected){
        console.log("=> using existing database connection");
        return true;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'devFlow'
        });
        console.log("=> new database connection");
        isConnected = true;
        return true;
    }catch(error){
        console.log("=> error while connecting with database");
        return null;
    }finally{
        console.log("=> attempt to connect with database finished");
    }
}