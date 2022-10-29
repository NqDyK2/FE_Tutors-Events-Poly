import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectIsStudent, selectIsTutor } from '../../features/auth/authSlice';

const LichHocGuard = () => {
  const isTutor = useSelector(selectIsTutor);
  const isStudent = useSelector(selectIsStudent)
  const location = useLocation();

  return isStudent || isTutor ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} />
  );
}

export default LichHocGuard