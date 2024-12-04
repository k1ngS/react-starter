import express from "express";
import { listUsers } from "../controllers/usersController.js";
import cors from "cors";
import { loginUser, registerUser } from "../models/usersModel.js";

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}

const routes = (app) => {
  app.use(express.json());

  app.use(cors(corsOptions));

  app.get("/", (req, res) => {
    res.send("Hello World!");
  })
  
  app.get("/users", listUsers)

  app.post("/auth/register", registerUser)

  app.post("/auth/login", loginUser)
}

export default routes;