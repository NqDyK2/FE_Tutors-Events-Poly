import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectCurrentToken, selectIsAuthenticated } from '../authSlice'

const RequireAuth = () => {
  const isAuth = useSelector(selectIsAuthenticated)
  const location = useLocation();
  return (
    isAuth ? <Outlet/> : <Navigate to='/auth' state={{from:location}} replace />
  )
}

export default RequireAuth