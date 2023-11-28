import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: []
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add: (state, action) => {
      state.tasks.push(action.payload)
    },
    remove: (state, action) => {
      state.tasks = action.payload
    }
  }
})

export const {add} = tasksSlice.actions;
const tasksReducer = tasksSlice.reducer

export default tasksReducer