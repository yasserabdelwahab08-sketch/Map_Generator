import express from "express";
import { connectDB } from "./config/connectDB";
import cookieParser from "cookie-parser";
import "dotenv/config";
import swaggerUi from "swagger-ui-express"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
connectDB();


app.listen(PORT, () => {
  console.log(`listening to prot: ${PORT}`);
});

export default app;