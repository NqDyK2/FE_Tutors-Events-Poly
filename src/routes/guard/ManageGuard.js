import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectIsAdmin, selectIsTeacher } from '../../features/auth/authSlice'

const ManageGuard = () => {
  const isAdmin = useSelector(selectIsAdmin)
  const isTeacher = useSelector(selectIsTeacher)
  const location = useLocation();
  return (
     isAdmin || isTeacher ? <Outlet/> : <Navigate to='/' state={{from:location}} /> 
  )
}

export default ManageGuard