import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: []
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
  }
})

export const {add, setAllTasks} = tasksSlice.actions;
const tasksReducer = tasksSlice.reducer

export default tasksReducer