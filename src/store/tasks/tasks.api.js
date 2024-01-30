import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/tasks/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUnDismissedTasks: builder.query({
      query: (userId) => `all/${userId}`,
    }),
    addNewTask: builder.mutation({
      query: (newTask) => ({
        url: "add",
        method: "POST",
        body: newTask,
      }),
    }),
    updateTask: builder.mutation({
      query: (taskToUpdate) => ({
        url: "update",
        method: "PUT",
        body: taskToUpdate,
      }),
    }),
    deleteTask: builder.mutation({
      query: (taskToDelete) => ({
        url: `delete/${taskToDelete.id}`,
        method: "DELETE",
        body: taskToDelete,
      }),
    }),
  }),
});

export const {
  useGetUnDismissedTasksQuery,
  useAddNewTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
