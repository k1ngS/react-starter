import connectDB from "../config/dbConfig.js";
import 'dotenv/config';

const connection = await connectDB(process.env.MONGODB_URL);

export async function getAllUsers(req, res) {
  const db = connection.db("react-starter-template");
  const collection = db.collection("users");
  return await collection.find().toArray();
}