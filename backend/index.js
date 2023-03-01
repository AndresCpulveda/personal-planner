import express from "express";
import tasksRouter from "./routes/tasksRouter.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

dotenv.config()
connectDB();


app.use('/api/tasks', tasksRouter)

app.listen( port, () => {
  console.log(`Server running on port: ${port}`);
})