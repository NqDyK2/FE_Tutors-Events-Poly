import React from 'react';
import { Helmet } from 'react-helmet-async';
import Logo from './../../../assets/images/Logo.png';
import Gif404 from './../../../assets/images/404page.gif';
import { Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Helmet>
        <title>Không có trang này - 404</title>
      </Helmet>
      <div>
        <div className='tw-container tw-mx-auto tw-flex login-page tw-h-screen'>
          <div className='login-container tw-pt-[6%] tw-px-8 tw-pb-4 tw-mx-auto'>
            <div className='tw-flex tw-flex-col tw-w-[430px] tw-items-center tw-justify-center'>
              <div className='logo'>
                <img src={Logo} alt='logo' width={200} />
              </div>
              <img src={Gif404} alt='404' width={400} />
              <div className='login-content tw-block  tw-my-4 tw-mx-auto tw-text-center'>
                <h1 className='tw-text-2xl tw-font-bold tw-text-gray-800'>
                  Không có trang này
                </h1>
              </div>
              <div>
                <Button icon={<RollbackOutlined />} className="tw-flex tw-items-center tw-text-white tw-bg-orange-400 hover:tw-bg-orange-500 tw-border-none tw-rounded-2xl" onClick={goBack}>
                  Quay lại
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
