
import mongoose from "mongoose";

const connectdb = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL environment variable is not defined");
    }
    
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("db connected");
  } catch (error) {
    console.error("error:", error.message);
    process.exit(1); 
  }
};

export default connectdb;