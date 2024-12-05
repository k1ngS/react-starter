import express from "express";
import cors from "cors";
import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js";

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  app.use('/users', userRoutes);
  app.use("/auth", authRoutes);
}

export default routes;