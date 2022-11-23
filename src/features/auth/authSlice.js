import { createSlice } from '@reduxjs/toolkit';
import { USER_ROLE } from '../../constants/role';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      switch (action.payload.role) {
        case USER_ROLE.ADMIN:
          state.role = USER_ROLE.ADMIN;
          break;
        case USER_ROLE.TEACHER:
          state.role = USER_ROLE.TEACHER;
          break;
        case USER_ROLE.STUDENT:
          state.role = USER_ROLE.STUDENT;
          break;
        case USER_ROLE.TUTOR:
          state.role = USER_ROLE.TUTOR;
          break;
        default:
      }
    },
    logOut: () => initialState,
    redirect: () => {
      window.location.href = '/';
    },
  },
});

export const { setCredentials, logOut, redirect } = authSlice.actions;

export default authSlice.reducer;

export const selectAuthInfo = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRole = (state) => state.auth.role;
export const selectIsAdmin = (state) => state.auth.role === USER_ROLE.ADMIN;
export const selectIsTeacher = (state) => state.auth.role === USER_ROLE.TEACHER;
export const selectIsStudent = (state) => state.auth.role === USER_ROLE.STUDENT;
export const selectIsTutor = (state) => state.auth.role === USER_ROLE.TUTOR;
