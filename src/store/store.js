import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import tasksReducer from "./tasks/tasks.slice";
import daysReducer from "./days/days.reducer";
import userReducer from "./user/user.slice";
import { tasksApi } from "./tasks/tasks.api";
import { usersApi } from "./user/user.api";

const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    tasks: tasksReducer,
    days: daysReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: true,
    }).concat(tasksApi.middleware, usersApi.middleware),
});

export default store;
