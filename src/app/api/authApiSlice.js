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
    getGoogleAuthUrl: builder.query({
      query: () => 'https://plenty-lies-double-113-22-61-144.loca.lt/api/auth/get-url',
    }),
    login: builder.query({
      query: (endpoint) => ({
        url: `https://plenty-lies-double-113-22-61-144.loca.lt/api/auth/checkpoint${endpoint}`,
      }),
    }),
    getUser: builder.mutation({
      query: () => ({
        url: `https://pink-shirts-go-118-70-80-24.loca.lt/api/user`,
      }),
    }),
  })
})

export const { useGetGoogleAuthUrlQuery, useLoginQuery, useGetUserMutation } = authApiSlice;
