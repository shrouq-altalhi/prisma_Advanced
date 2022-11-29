import express from "express";
import "dotenv/config";
import schoolRouter from "./routes/school.router";
import { connectDB } from "./con/db";

const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1/school", schoolRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`The server running in port ${PORT}`);
});
