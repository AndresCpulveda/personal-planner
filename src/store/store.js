import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import tasksReducer from './tasks/tasks.slice'
import daysReducer from './days/days.reducer'
import userReducer from './user/user.slice'
import { tasksApi } from './tasks/tasks.api'

const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    tasks: tasksReducer,
    days: daysReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: true,
  }).concat(tasksApi.middleware)
})

export default store