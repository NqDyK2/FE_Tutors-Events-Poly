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
    getAuthSetting: builder.query({
      query: () => `/auth/setting`,
      providesTags: ['Auth'],
    }),
    updateAuthSetting: builder.mutation({
      query: (body) => ({
        url: `/auth/setting`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Auth'],
    }),
  })
})

export const { useGetAuthUserMutation, useGetLoginUrlQuery, useGetTokenMutation, useGetAuthSettingQuery, useUpdateAuthSettingMutation } = authApiSlice;
