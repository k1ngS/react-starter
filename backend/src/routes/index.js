import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200
}

const routes = (app) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors(corsOptions));

  app.use('/api/users', userRoutes);
  app.use("/api/auth", authRoutes);
}

export default routes;