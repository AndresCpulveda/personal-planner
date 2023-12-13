import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import tasksReducer from './tasks/tasks.slice'
import daysReducer from './days/days.reducer'
import { tasksApi } from './tasks/tasks.api'

const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    tasks: tasksReducer,
    days: daysReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware)
})

export default store