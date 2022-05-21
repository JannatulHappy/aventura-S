import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
const app = express();
import dotenv from "dotenv";
import userRouter from "./routes/user.js"
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();
const port = 5000;
app.use("/users",userRouter)//http://localhost:5000/users/signup
const MONGODB_URL = process.env.MONGODB_URL;
mongoose
  .connect(MONGODB_URL)
  .then(() => {
      app.get("/",(req,res)=>{
          res.send("Hello from Aventura Server")
      })
    app.listen(port, () => {
      console.log(`Server running on Port ${port}.`);
    });
  })
  .catch((error) => {
    console.log(`${error} did not connect!!`);
  });
