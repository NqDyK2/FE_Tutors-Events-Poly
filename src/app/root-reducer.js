import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});