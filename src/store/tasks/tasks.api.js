import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/api/tasks/'}),
  endpoints: (builder) => ({
    getUnDismissedTasks: builder.query({
      query: () => 'all',
    }),
    addNewTask: builder.mutation({
      query: (newTask) => ({
        url: 'add',
        method: 'POST',
        body: newTask,
      })
    }),
    updateTask: builder.mutation({
      query: (taskToUpdate) => ({
        url: 'update',
        method: 'PUT',
        body: taskToUpdate,
      })
    }),
    deleteTask: builder.mutation({
      query: (taskToDelete) => ({
        url: `delete/${newask.id}`,
        method: 'DELETE',
        body: taskToDelete,
      })
    }),
  })
})

export const {useGetUnDismissedTasksQuery, useAddNewTaskMutation, useUpdateTaskMutation} = tasksApi;