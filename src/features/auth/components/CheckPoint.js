import { Spin } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './../../../assets/images/Logo.png';
import { useGetAuthUserMutation } from '../../../app/api/authApiSlice';
import { selectIsAuthenticated, setCredentials } from '../authSlice';
import { Helmet } from 'react-helmet-async';

const CheckPoint = () => {
  const location = useLocation();
  const checkpoint = location.search;
  const token = checkpoint.split('=')[1];
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const [getUserInfo, { isLoading, error }] =
    useGetAuthUserMutation();
  const handleSignIn = async () => {
    const {data} = await getUserInfo();
    if (data) {
      dispatch(setCredentials({ user: data.data, token}));
      navigate('/');
    }
  };
  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);
  useEffect(() => {
    if (token) {
      handleSignIn();
    } else {
      navigate('/welcome');
    }
  }, [token, navigate]);

  return (
    <>
      <Helmet>
        <title>Đang đăng nhập - FPOLY</title>
      </Helmet>
      <div>
        <div className='tw-container tw-mx-auto tw-flex login-page tw-h-screen'>
          <div className='login-container tw-pt-[6%] tw-px-8 tw-pb-4 tw-mx-auto'>
            <div className='tw-flex tw-flex-col tw-w-[430px] tw-items-center tw-justify-center'>
              <div className='logo'>
                <img src={Logo} alt='logo' width={200} />
              </div>
              <div className='login-content tw-block  tw-my-4 tw-mx-auto tw-text-center'>
                <Spin
                  spinning={isLoading}
                  className='tw-text-orange-400'
                  size='large'
                />
                {error && (
                  <>
                    <div className='tw-text-red-500 tw-text-sm tw-mt-2'>
                      Lỗi đăng nhập
                    </div>
                    <div className='tw-mt-2'>
                      <a href='https://pink-shirts-go-118-70-80-24.loca.lt/api/auth/get-url'>Thử lại</a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckPoint;
