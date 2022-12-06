import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut, redirect } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  // credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    return headers;
  },
});

const baseQueryWithoutContentType = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Accept', 'application/json');
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  console.log(args.exceptContentType)
  let result = await args.exceptContentType ? baseQueryWithoutContentType(args, api, extraOptions) : baseQuery(args, api, extraOptions);

  if (result?.error) {
    if (result.error.status === 401) {
      api.dispatch(logOut());

    }
    if (result.error.status === 403) {
      api.dispatch(redirect());
    }
  }
  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});