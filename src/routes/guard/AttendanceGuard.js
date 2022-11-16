import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {
  selectIsTeacher,
  selectIsTutor,
} from '../../features/auth/authSlice';

const AttendanceGuard = () => {
  const isTeacher = useSelector(selectIsTeacher);
  const isTutor = useSelector(selectIsTutor);
  const location = useLocation();
  return isTeacher || isTutor ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} />
  );
};

export default AttendanceGuard;
