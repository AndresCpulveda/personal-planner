import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/users/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUserViaGoogle: builder.mutation({
      query: (user) => ({
        url: "sign-google-user",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useSignUserViaGoogleMutation } = usersApi;
