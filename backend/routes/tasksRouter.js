import express from "express";

import { addTask } from "../controllers/tasksController.js";

const tasksRouter = express.Router();

tasksRouter.post('/add', addTask)

export default tasksRouter