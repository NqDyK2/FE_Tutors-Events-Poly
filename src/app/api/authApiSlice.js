import { apiSlice } from './apiSlice';


export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoginUrl: builder.query({
      query: () => '/auth/get-url',
    }),
    getToken: builder.mutation({
      query: (state) => `${process.env.REACT_APP_API_URL}auth/checkpoint${state}`,
      extraOptions: {
        method: 'GET',
      },
    }),
    getAuthUser: builder.mutation({
      query: (token) => ({
        url: 'auth/user',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }),
    }),
  })
})

export const { useGetAuthUserMutation, useGetLoginUrlQuery, useGetTokenMutation } = authApiSlice;
