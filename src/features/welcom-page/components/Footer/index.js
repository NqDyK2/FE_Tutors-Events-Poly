import React from 'react';
import { Link } from 'react-router-dom';

// import images
import LogoWhite from './../../../../assets/images/WhiteLogo.png';

const WelcomeFooter = () => {
  return (
    <div className='tw-h-fit tw-w-full -tw-mt-[6px] tw-content-center tw-bg-[#192041]'>
      <div className='tw-flex tw-gap-4 md:tw-gap-16 tw-border-t-[9px] tw-border-[#F7941D] md:tw-flex-row tw-flex-col tw-px-5 md:tw-px-16 lg:tw-px-48 tw-pt-[20px]'>

        {/* Logo White */}
        <div>
          <Link to='#'>
            <img className='tw-min-h-[70px] tw-min-w-[200px]' width={200} height={70} src={LogoWhite} alt='' />
          </Link>
        </div>

        {/* Contact info */}
        <div>
          <div>
            <h3 className='tw-text-[24px] tw-font-normal tw-uppercase tw-text-white'>
              thông tin liên hệ
            </h3>
            <Link className='tw-text-[13px] tw-text-white' to='#'>
              Trụ sở chính Tòa nhà FPT Polytechnic, Phố Trịnh Văn Bô, Nam Từ
              Liêm, Hà Nội
            </Link>
          </div>
          <div className='tw-flex tw-gap-4 tw-pt-[10px]'>
            <div>
              <div className='tw-pb-2 tw-text-[13px] tw-text-white'>
                <span className='tw-text-[16px] tw-text-[#F7941D] tw-underline tw-underline-offset-1'>
                  Cơ Sở Hà Nội
                </span>
                <p>
                  Tòa nhà FPT Polytechnic, Phố Trịnh Văn Bô, Nam Từ Liêm, Hà Nội
                </p>
                <span>(024) 7300 1955</span>
              </div>
              <div className='tw-pb-2 tw-text-[13px] tw-text-white'>
                <span className='tw-text-[16px] tw-text-[#F7941D] tw-underline tw-underline-offset-1'>
                  Cơ Sở Đà Nẵng
                </span>
                <p>
                  Số 137 Nguyễn Thị Thập, Phường Hòa Minh, Quận Liên Chiểu, TP.
                  Đà Nẵng
                </p>
                <span>(0236) 3710 999</span>
              </div>
              <div className='tw-pb-2 tw-text-[13px] tw-text-white'>
                <span className='tw-text-[16px] tw-text-[#F7941D] tw-underline tw-underline-offset-1'>
                  Cơ Sở Cần Thơ
                </span>
                <p>
                  Số 288, Nguyễn Văn Linh, phường An Khánh, quận Ninh Kiều, Tp.
                  Cần Thơ.
                </p>
                <span>(0292) 7300 468</span>
              </div>
              <div className='tw-pb-2 tw-text-[13px] tw-text-white'>
                <span className='tw-text-[16px] tw-text-[#F7941D] tw-underline tw-underline-offset-1'>
                  Cơ Sở Hải Phòng
                </span>
                <p>
                  271 Lê Thánh Tông, phường Máy Chai, quận Ngô Quyền, TP Hải
                  Phòng.
                </p>
                <span>(0915) 431 313</span>
              </div>
            </div>
            <div>
              <div className='tw-pb-2 tw-text-[13px] tw-text-white'>
                <span className='tw-text-[16px] tw-text-[#F7941D] tw-underline tw-underline-offset-1'>
                  Cơ Sở Hồ Chí Minh
                </span>
                <p>391A Nam Kỳ Khởi Nghĩa, Q. 3, TP. Hồ Chí Minh</p>
                <p>778/B1 Nguyễn Kiệm, P.4, Q. Phú Nhuận, TP. Hồ Chí Minh</p>
                <p>
                  Toà nhà Innovation, lô 24, Công viên phần mềm Quang Trung,
                  Quận 12, Hồ Chí Minh
                </p>
                <span>(028) 3526 8799 – (028) 62523434</span>
              </div>
              <div className='tw-pb-2 tw-text-[13px] tw-text-white'>
                <span className='tw-text-[16px] tw-text-[#F7941D] tw-underline tw-underline-offset-1'>
                  Cơ Sở Tây Nguyên
                </span>
                <p>
                  Số 300/6 đường Hà Huy Tập, p. Tân An, TP. Buôn Ma Thuột, Đắk
                  Lắk
                </p>
                <span>(0262) 355 5678</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeFooter;
