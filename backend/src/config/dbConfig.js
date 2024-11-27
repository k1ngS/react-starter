import { MongoClient } from "mongodb";

export default async function connectDB(connection) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(connection);
    console.log(`Connecting to MongoDB: ${connection}`);
    await mongoClient.connect();
    console.log("Connected to MongoDB");
    return mongoClient;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit();
  }
}