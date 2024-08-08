import mongoose from "mongoose";
import { handleError } from "./utils";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected...");
  } catch (err) {
    handleError(err);
    process.exit(1);
  }
};

export default connectDB;
