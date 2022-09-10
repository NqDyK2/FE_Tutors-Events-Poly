import React from 'react'
import { Helmet } from 'react-helmet-async'

const AuthPage = () => {
  return (
   <>
    <Helmet>
      <title>Đăng nhập - FPOLY</title>
    </Helmet>
    <div className='tw-text-2xl tw-text-red-200'>AuthPage</div>
   </>
  )
}

export default AuthPage