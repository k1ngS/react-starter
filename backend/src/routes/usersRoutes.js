import express from "express";
import { listUsers } from "../controllers/usersController.js";
import cors from "cors";

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
}

export default routes;