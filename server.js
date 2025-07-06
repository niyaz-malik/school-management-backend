import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import errorHandler from "./src/middlewares/errorHandler.js";
import studentRouter from "./src/routers/studentRouter.js";
import teacherRouter from "./src/routers/teacherRouter.js";
import classRouter from "./src/routers/classRouter.js";
import seedAdmin from './src/seedAdmin.js';
import connectDB from './src/config/db-connection.js';

const app = express();
connectDB();

app.use(express.json());

app.get("/api/admin", seedAdmin);

app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/class", classRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Listening...");
})