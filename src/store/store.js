import {configureStore} from '@reduxjs/toolkit'
import tasksReducer from './tasks/tasks.slice'
import daysReducer from './days/days.reducer'

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    days: daysReducer
  }
})

export default store