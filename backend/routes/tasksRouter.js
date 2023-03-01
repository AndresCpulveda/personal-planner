import express from "express";

import { addTask, getTodaysTasks } from "../controllers/tasksController.js";

const tasksRouter = express.Router();

tasksRouter.post('/add', addTask)
tasksRouter.get('/todays', getTodaysTasks)

export default tasksRouter