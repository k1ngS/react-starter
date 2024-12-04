import connectDB from "../config/dbConfig.js";
import 'dotenv/config';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const connection = await connectDB(process.env.MONGODB_URL);
const db = connection.db("react-starter-template");
const collection = db.collection("users");

export async function getAllUsers(req, res) {
  return await collection.find().toArray();
}

export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
      return res.status(422).json({ message: "Please provide all fields" });
    }

    if (await collection.findOne({ email })) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await collection.insertOne({
      username: username,
      email: email,
      password: hashedPassword
    })

    res.status(201).json({ message: "User registered successfully", user: newUser.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(422).json({ message: "Please provide all fields" });
    }

    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { subject: 'accessApi', expiresIn: '1h' });

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
