import express from "express";
import { connectDB } from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./routes/mapsRouter.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config()
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"))
connectDB();

app.use("/upload",router);

app.listen(PORT, () => {
  console.log(`listening to prot: ${PORT}`);
});

export default app;
