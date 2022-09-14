import React, { useState } from 'react';

import Logo from './../../../assets/images/Logo.png';
import ReCAPTCHA from 'react-google-recaptcha';
import { Helmet } from 'react-helmet-async';
import './login_page.css';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../authSlice';
import { useNavigate } from 'react-router-dom';
import { useGetGoogleAuthUrlQuery } from '../../../app/api/authApiSlice';
import { useEffect } from 'react';

const AuthPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isNotVerified, setIsNotVerified] = useState(false);
  function onChange() {
    setIsVerified(true);
  }
  const { data, isLoading } = useGetGoogleAuthUrlQuery();
  console.log(data);
  console.log(isLoading);
  async function checkVerifiedReCAPTCHA() {
    if (!isVerified) {
      setIsNotVerified(true);
    } else {
      window.location.href = data.url;
    }
  }

  return (
    <>
      <Helmet>
        <title>Đăng nhập - FPOLY</title>
      </Helmet>
      <div>
        <div className='tw-container tw-mx-auto tw-flex login-page tw-h-screen'>
          <div className='login-container tw-pt-[6%] tw-px-8 tw-pb-4 tw-mx-auto'>
            <div className='tw-flex tw-flex-col tw-w-[430px] tw-items-center tw-justify-center'>
              <div className='logo'>
                <img src={Logo} alt='logo' width={200} />
              </div>
              <div className='login-content tw-block tw-w-full tw-text-[13px] tw-font-normal'>
                <form className='login-form'>
                  {/* <div className="tw-flex">
                    <select 
                      className="tw-border-none tw-px-6 tw-mt-6 tw-focus-visible:border-none
                      tw-mb-[15px] tw-h-[46px] tw-flex-1 tw-text-[#495057] tw-rounded
                      tw-bg-[rgba(235,237,242,.4)]"
                    >
                      <option>Lựa chọn cơ sở</option>
                      <option>FPT Polytechnic Hà Nội</option>
                      <option>FPT Polytechnic Hà Nội</option>
                    </select>
                  </div> */}
                  <div className='tw-flex tw-justify-center'>
                    <ReCAPTCHA
                      sitekey='6Lcq_PAhAAAAAAmAKhrwkVqAThx7eNe-US3edfdD'
                      onChange={onChange}
                    />
                  </div>
                  <div>
                    {isNotVerified && !isVerified && (
                      <p className='tw-text-red-500 tw-text-center'>
                        Vui lòng xác nhận bạn không phải là robot
                      </p>
                    )}
                  </div>
                  <div className='tw-flex tw-mt-[15px]'>
                    <button
                      type='button'
                      onClick={checkVerifiedReCAPTCHA}
                      disabled={isLoading}
                      className={` ${
                        isLoading ? 'tw-bg-gray-600' : 'tw-bg-[#fd397a]'
                      } tw-w-full tw-flex tw-justify-center tw-items-center
                      tw-text-[#fff] tw-py-2 tw-px-4 tw-rounded`}
                    >
                      <svg
                        className='tw-mr-1'
                        fill='#fff'
                        viewBox='0 0 30 30'
                        width='20px'
                        height='20px'
                      >
                        <path d='M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z' />
                      </svg>
                      Google
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
