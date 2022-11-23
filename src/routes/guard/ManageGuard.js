import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectCurrentUser, selectIsAdmin, selectIsTeacher } from '../../features/auth/authSlice'

const ManageGuard = () => {
  const isAdmin = useSelector(selectIsAdmin)
  const isTeacher = useSelector(selectCurrentUser)?.is_teacher
  const location = useLocation();
  return (
    isAdmin || isTeacher ? <Outlet /> : <Navigate to='/' state={{ from: location }} />
  )
}

export default ManageGuard