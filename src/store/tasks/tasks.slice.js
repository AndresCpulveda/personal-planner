import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  addingTask: false,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setAllTasks: (state, action) => {
      state.tasks = action.payload
    },
    addNewTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    toggleAddingTask: (state) => {
      state.addingTask = !state.addingTask;
    }
  }
})

export const {add, setAllTasks, toggleAddingTask} = tasksSlice.actions;
const tasksReducer = tasksSlice.reducer

export default tasksReducer