import Task from "../models/tasks.js";

const addTask = async (req, res) => {
  const newTask = new Task(req.body)
  try {
    const savedTask = await newTask.save()
    return res.json(savedTask)
  } catch (error) {
    console.log(error);
  }
}

const getTodaysTasks = async (req, res) => {
  console.log(Date.now());
  try {
    const todaysTasks = await Task.find({date: })
  } catch (error) {
    
  }
}
export {addTask}