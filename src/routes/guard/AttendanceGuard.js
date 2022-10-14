import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {
  selectIsAdmin,
  selectIsTeacher,
  selectIsTutor,
} from '../../features/auth/authSlice';

const AttendanceGuard = () => {
  const isAdmin = useSelector(selectIsAdmin);
  const isTeacher = useSelector(selectIsTeacher);
  const isTutor = useSelector(selectIsTutor);
  const location = useLocation();
  return isAdmin || isTeacher || isTutor ? (
    location.children
  ) : (
    <Navigate to='/' state={{ from: location }} />
  );
};

export default AttendanceGuard;
