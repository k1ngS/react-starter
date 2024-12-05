import express from "express";
import routes from "./src/routes/index.js";
import { connectDB } from "./src/config/connectDB.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
routes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

