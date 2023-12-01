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
    add: (state, action) => {
      state.tasks.push(action.payload)
    },
    remove: (state, action) => {
      state.tasks = action.payload
    }
  }
})

export const {add, setAllTasks} = tasksSlice.actions;
const tasksReducer = tasksSlice.reducer

export default tasksReducer