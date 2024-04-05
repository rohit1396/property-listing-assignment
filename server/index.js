import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connect from "./DB/connect.js";
import { userRouter } from "./routes/userRoutes.js";
import { propertyRouter } from "./routes/propertyRoutes.js";

dotenv.config({
  path: "./env",
});

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());

const port = process.env.PORT;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/property", propertyRouter);

app.listen(port, () => console.log(`server running on port :  ${port}`));
