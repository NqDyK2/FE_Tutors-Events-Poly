import { Spin } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useGetAuthUserMutation } from '../../../app/api/authApiSlice'
import { logOut, selectCurrentToken, selectIsAuthenticated, setCredentials } from '../authSlice'
import Logo from './../../../assets/images/Logo.png';


const RequireAuth = () => {
  const isAuth = useSelector(selectIsAuthenticated)
  const token = useSelector(selectCurrentToken)
  const [getUserInfo, { error, isLoading }] = useGetAuthUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignIn = async () => {
    const { data } = await getUserInfo(token)
    if (data) {
      dispatch(
        setCredentials({ user: data.data, token, role: data.data.role_id })
      )
    }
  }

  React.useEffect(() => {
    if (token) {
      handleSignIn()
    }
  }, [])

  React.useEffect(() => {
    if (error) {
      navigate('/welcome')
    }
  }, [])
  return (
    isAuth ? <Outlet /> : (
      token ? <div>
        <div className='login-page tw-container tw-mx-auto tw-flex tw-h-screen'>
          <div className='login-container tw-mx-auto tw-px-8 tw-pt-[6%] tw-pb-4'>
            <div className='tw-flex tw-w-[430px] tw-flex-col tw-items-center tw-justify-center'>
              <div className='logo'>
                <img src={Logo} alt='logo' width={200} />
              </div>
              <div className='login-content tw-my-4  tw-mx-auto tw-block tw-text-center'>
                <Spin
                  spinning={isLoading}
                  className='tw-text-orange-400'
                  size='large'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
        : <Navigate to='/welcome'
        />

    )
  )
}

export default RequireAuth