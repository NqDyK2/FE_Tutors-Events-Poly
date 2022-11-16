import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import breadcrumbReducer from "../components/AppBreadcrumb/breadcrumbSlice";

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  breadcrumb: breadcrumbReducer,
});