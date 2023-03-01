import mongoose from "mongoose";

const tasksSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  due: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  timeSpent: {
    type: String,
  }
}, {
  timestamps: true,
})

const Task = mongoose.model('Task', tasksSchema)

export default Task