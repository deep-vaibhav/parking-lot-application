import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("⏳ MongoDB Connecting...");
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );
    console.log("✅ MongoDB Connected!");
  } catch (error: any) {
    console.log(`🔌 MONGO CONNECTION ERROR: ${error.message}`);
    process.exit(1);
  }
};
