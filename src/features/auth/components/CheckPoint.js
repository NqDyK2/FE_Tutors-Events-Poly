/* eslint-disable react-hooks/exhaustive-deps */
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
  const [getUserInfo, { isLoading, error }] = useGetAuthUserMutation();
  const handleSignIn = async () => {
    const { data } = await getUserInfo(token);
    if (data) {
      dispatch(
        setCredentials({ user: data.data, token, role: data.data.role_id })
      );
      navigate('/');
    }
  };

  useEffect(() => {
    if (token) {
      handleSignIn();
    } else {
      navigate('/welcome');
    }
  }, [token, navigate]);
  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <>
      <Helmet>
        <title>Đang đăng nhập - FPOLY</title>
      </Helmet>
      <div>
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
                {error && (
                  <>
                    <div className='tw-mt-2 tw-text-sm tw-text-red-500'>
                      Lỗi đăng nhập
                    </div>
                    <div className='tw-mt-2'>
                      <a href={process.env.REACT_APP_API_URL + 'auth/get-url'}>
                        Thử lại
                      </a>
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
