import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './apiSlice';

// export const authApiSlice = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl:'http://ten-ads-peel-118-70-80-24.loca.lt/api/',
//   }),
//   endpoints: (builder) => ({
//     getGoogleAuthUrl: builder.query({
//       query: () => 'auth/get-url',
//       method: 'GET',  
//     }),
//     login: builder.query({
//      query: (endpoint) => ({
//       url: `http://ten-ads-peel-118-70-80-24.loca.lt/api/auth/checkpoint${endpoint}`,  
//      }),
//     },
//     ),
//   }),
// });

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthUser: builder.mutation({
      query: () => ({
        url: process.env.REACT_APP_API_URL + 'auth/user',
      }),
    }),
  })
})

export const { useGetAuthUserMutation } = authApiSlice;
