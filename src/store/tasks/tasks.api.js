import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/api/tasks'}),
  endpoints: (builder) => ({
    getUnDismissedTasks: builder.query({
      query: () => 'all',
    })
  })
})

export const {useGetUnDismissedTasksQuery} = tasksApi;