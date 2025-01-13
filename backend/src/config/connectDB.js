import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 5000, // Tempo limite de 5 segundos
      maxPoolSize: 5000, // Número máximo de conexões
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connection to MongoDB: ${err.message}`);
    process.exit(1);
  }
}