import { Footer } from 'antd/lib/layout/layout';
import React from 'react';
// imnport icon
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import { Link } from 'react-router-dom';

import Logo from './../../assets/images/Logo.png';

const AppFooter = () => {
  return (
    <Footer className='tw-bg-white dark:tw-bg-dark-mode-primary'>
      <div className='tw-flex tw-bg-white dark:tw-bg-dark-mode-primary tw-flex-col md:tw-flex-row dark:tw-text-slate-300'>
        <div className='tw-items-center md:tw-items-start tw-flex tw-flex-col md:tw-w-[35%] tw-pb-4 md:tw-py-[30px]'>
          <img
            className='tw-max-h-[94px] tw-max-w-[150px] md:tw-max-w-[200px]'
            src={Logo}
            alt=''
          />
          <div className='tw-hidden md:tw-flex tw-items-center'>
            <FaMapMarkerAlt size={18} />
            <span className='tw-pt-[4px] tw-ml-1 tw-text-[12px]'>
              {' '}
              Tòa nhà FPT Polytechnic, Phố Trịnh Văn Bô, Nam Từ Liêm, Hà Nội.
            </span>
          </div>
        </div>

        <div className='md:tw-w-[65%] tw-w-full md:tw-border-l-2 tw-border-black md:tw-pl-[15px] dark:tw-border-l-white'>
          <h5 className='tw-text-[16px] tw-font-bold dark:tw-text-slate-300 '>
            Thông tin liên hệ
          </h5>
          <div>
            <div className='md:tw-hidden tw-flex tw-items-center'>
              <FaMapMarkerAlt size={12} />
              <span className='tw-pt-[4px] tw-ml-1 tw-text-[12px]'>
                {' '}
                Tòa nhà FPT Polytechnic, Phố Trịnh Văn Bô, Nam Từ Liêm, Hà Nội.
              </span>
            </div>
            <div className='tw-flex tw-items-center tw-py-1'>
              <FaPhoneAlt size={12} />
              <span className='tw-pl-1 tw-text-[12px] '>
                Số điện thoại liên hệ giải đáp ý kiến sinh viên:
                <Link
                  to='#'
                  className='tw-pl-[2px] tw-text-[12px] tw-font-bold tw-text-black dark:tw-text-slate-300'
                >
                  0123456789
                </Link>
              </span>
            </div>
            <div className='tw-text-[12px]'>
              <span className='tw-flex tw-items-center'>
                <FaEnvelope size={12} />
                <span className='tw-pl-1'>Địa chỉ email các phòng ban:</span>
              </span>
              <ul className='tw-list-disc tw-pl-10'>
                <li>
                  Phòng dịch vụ sinh viên:
                  <Link
                    to='#'
                    className='tw-pl-[4px] tw-font-bold tw-text-black dark:tw-text-slate-300'
                  >
                    dvsvpoly.hn@poly.edu.vn
                  </Link>
                </li>
                <li>
                  Phòng tổ chức và quản lý đào tạo:
                  <ul className='tw-pl-6 tw-font-bold '>
                    <li>Đào tạo: daotaopoly.hn@fe.edu.vn - 02462979544</li>
                    <li>Khảo thí: khaothipolyhn@fe.edu.vn - 02462594013</li>
                  </ul>
                </li>
                <li>
                  Phòng hành chính:
                  <Link
                    to='#'
                    className='tw-pl-[4px] tw-font-bold tw-text-black dark:tw-text-slate-300'
                  >
                    Phòng hành chính: hanhchinhfplhn@fe.edu.vn - 02466822713 -
                    02463276306 - 02463276305
                  </Link>
                </li>
                <li>
                  Phòng quan hệ doanh nghiệp:
                  <Link
                    to='#'
                    className='tw-pl-[4px] tw-font-bold tw-text-black dark:tw-text-slate-300'
                  >
                    qhdn.poly@fe.edu.vn - 02462604713
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <span className='tw-text-[14px]'>
            Ý kiến đóng góp chung gửi về ykien.poly@fpt.edu.vn bằng email
            @fpt.edu.vn
          </span>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
