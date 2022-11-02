import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectIsAdmin } from '../../features/auth/authSlice'

const AdminGuard = () => {
  const isAdmin = useSelector(selectIsAdmin)
  const location = useLocation();

  return (
    isAdmin ? <Outlet /> : <Navigate to='/' state={{ from: location }} />
  )
}

export default AdminGuard