import { Footer } from 'antd/lib/layout/layout';
import React from 'react';
// imnport icon
import { RiMapPin2Line, RiPhoneFill, RiMailFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import Logo from './../../assets/images/Logo.png';

const AppFooter = () => {
  return (
    <Footer className='tw-bg-white dark:tw-bg-[#202125]'>
      <div className='tw-flex tw-bg-white dark:tw-bg-[#202125] dark:tw-text-slate-300'>
        <div className='tw-w-[35%] tw-py-[30px]'>
          <div>
            <img
              className='tw-max-h-[94px] tw-max-w-[294px]'
              src={Logo}
              alt=''
            />
          </div>
          <div className='tw-flex'>
            <RiMapPin2Line size={20} />
            <span className='tw-pt-[4px] tw-text-[12px]'>
              {' '}
              Tòa nhà FPT Polytechnic, Phố Trịnh Văn Bô, Nam Từ Liêm, Hà Nội.
            </span>
          </div>
        </div>

        <div className='tw-w-[65%] tw-border-l-2 tw-border-black tw-pl-[15px] dark:tw-border-l-white'>
          <h5 className='tw-text-[16px] tw-font-bold dark:tw-text-slate-300 '>
            Thông tin liên hệ
          </h5>
          <div>
            <div className='tw-flex'>
              <RiPhoneFill size={16} />
              <span className='tw-pl-[4px] tw-text-[12px] '>
                Số điện thoại liên hệ giải đáp ý kiến sinh viên:
                <Link
                  to='#'
                  className='tw-pl-[2px] tw-text-[12px] tw-font-bold tw-text-black dark:tw-text-slate-300'
                >
                  0123456789
                </Link>
              </span>
            </div>
            <div className='tw-flex'>
              <RiMailFill size={16} />
              <span className='tw-pl-[4px] tw-text-[12px]'>
                Địa chỉ email các phòng ban:
                <ul className='tw-list-disc tw-pl-6'>
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
                    <ul className='tw-pl-6 tw-text-[10px] tw-font-bold '>
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
              </span>
            </div>
          </div>
          <span className='tw-text-[16px]'>
            Ý kiến đóng góp chung gửi về ykien.poly@fpt.edu.vn bằng email
            @fpt.edu.vn
          </span>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
