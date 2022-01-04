// In the scripts this means start only in development and watch for any changes to any .ts files and execute index.ts
// "start:dev": "nodemon --watch './**/*.ts' --exec ts-node src/index.ts"

import express from "express";
import authRoutes from "./routes/auth";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Instantiate dot env file
dotenv.config();

// Mongoose is the object document mapper
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to mongodb");
    // Only do everything if connected to mongodb
    const app = express();

    // Allows res to use json
    app.use(express.json());
    app.use(cors());
    // Kinda like api/jumps/session jumps
    app.use("/auth", authRoutes);

    app.listen(5000, () => {
      console.log(`Now listening to port 5000`);
    });
  })
  .catch((error) => {
    console.log({ error });
    throw new Error(error);
  });
