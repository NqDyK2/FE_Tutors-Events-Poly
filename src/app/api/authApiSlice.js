import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://quizee.ga/api/',
  }),
  endpoints: (builder) => ({
    getGoogleAuthUrl: builder.query({
      query: () => 'auth/get-url',
      method: 'GET',
    }),
    login: builder.query({
      query: (checkpoint) => `http://quizee.ga/api/auth/checkpoint${checkpoint}`,
      method: 'GET',
    }),
  }),
});

export const { useGetGoogleAuthUrlQuery, useLoginQuery } = authApiSlice;
