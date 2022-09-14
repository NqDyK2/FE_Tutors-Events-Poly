import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from '../../auth/authSlice'

const HomePage = () => {
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)

  return (
    <>
    <Helmet>
      <title>Trang chủ | FPOLY</title>
    </Helmet>
    <div>
      {
        token ? (
          <h1>{user.email}</h1>
        )
       : (
        <h1>Chưa đăng nhập </h1>
      )}
    </div>
    </>
  )
}

export default HomePage