import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("⏳ MongoDB Connecting...");
  try {
    await mongoose.connect(
      "mongodb+srv://parkinglot:parkinglot2022@cluster0.lowch.mongodb.net/parkinglot?retryWrites=true&w=majority"
    );
    console.log("✅ MongoDB Connected!");
  } catch (error: any) {
    console.log(`🔌 MONGO CONNECTION ERROR: ${error.message}`);
    process.exit(1);
  }
};
