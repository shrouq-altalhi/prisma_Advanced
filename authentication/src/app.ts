import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth.router";
import { connectDB } from "./config/db";

const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`The server running in port ${PORT}`);
});
