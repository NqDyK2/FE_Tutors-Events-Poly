import { apiSlice } from './apiSlice';


export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useGetAuthUserMutation } = authApiSlice;
