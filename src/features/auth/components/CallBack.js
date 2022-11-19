import React from 'react'
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useGetAuthUserMutation, useGetTokenMutation } from '../../../app/api/authApiSlice'
import Spinner from '../../../components/Spinner'
import { selectIsAuthenticated, setCredentials } from '../authSlice';
import Logo from './../../../assets/images/Logo.png';


const CallBack = () => {
  const [state, setState] = React.useState()
  const [getToken, { error: tokenError, isLoading: getTokenLoading }] = useGetTokenMutation()
  const isAuth = useSelector(selectIsAuthenticated)
  const [getUserInfo, { isLoading, error }] = useGetAuthUserMutation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();

  React.useEffect(() => {
    setState(location?.search)
  }, [location])

  const handleSignIn = async (token) => {
    if (state) {
      const { data: tokenData } = await getToken(state)
      const { data } = await getUserInfo(tokenData?.token);
      if (data) {
        dispatch(
          setCredentials({ user: data.data, token: tokenData?.token, role: data.data.role_id })
        );
        navigate('/');
      }
    }
  };

  React.useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])

  React.useEffect(() => {
    handleSignIn()
  }, [state])



  return (
    <>
      <Helmet>
        <title>Đang đăng nhập - FPOLY</title>
      </Helmet>
      <div
        className='tw-flex tw-flex-col tw-items-center tw-justify-center tw-min-h-[50vh]'
      >
        <div className='logo'>
          <img src={Logo} alt='logo' width={300} />
        </div>
        <div
          className='tw-flex tw-flex-col tw-items-center tw-justify-center '
        >
          <Spinner
            spinning={getTokenLoading || isLoading}
          />
          {
            getTokenLoading || isLoading ? <span className='tw-text-orange-400'>
              Đang đăng nhập...
            </span> : ''
          }

        </div>
        {(error || tokenError) && <div className='tw-text-red-500 tw-text-center'>{
          (tokenError?.data?.message || error?.data?.message) ?? 'Lỗi đăng nhập'


        }
          <br />
          <div>
            <Link to={'/auth'} className="tw-text-center">
              <span className='tw-text-blue-500 tw-cursor-pointer'>
                Thử lại
              </span>
            </Link>
          </div>
        </div>}
      </div>
    </>
  )


}

export default CallBack