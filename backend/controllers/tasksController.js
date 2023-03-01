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
  const currentDate = new Date();
  const startOfDay = currentDate.toISOString().split('T')[0]
  console.log(startOfDay);
  try {
    const todaysTasks = await Task.find({ due: startOfDay });
    res.json(todaysTasks);
  } catch (error) {
    
  }
}
export {addTask, getTodaysTasks}