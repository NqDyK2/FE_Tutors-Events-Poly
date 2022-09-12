import React from 'react'
import { Link } from 'react-router-dom';

// import images
import LogoWhite from './../../../../assets/images/WhiteLogo.png';

const WelcomeFooter = () => {
    return (
        <div className='tw-w-full tw-h-[554px] tw-content-center tw-bg-[#192041]'>
            <div className='tw-flex tw-px-48 tw-pt-[20px] tw-border-t-8 tw-border-[#F7941D]'>
                {/* Logo White */}
                <div className='tw-w-[30%]'>
                    <Link to='#'>
                        <img
                            className='tw-w-[200px] tw-ml-12'
                            src={LogoWhite}
                            alt=''
                        />
                    </Link>
                </div>
                {/* Contact info */}
                <div className='tw-w-[70%]'>
                    <div>
                        <h3 className='tw-uppercase tw-text-white tw-text-[24px] tw-font-normal'>
                            thông tin liên hệ
                        </h3>
                        <Link
                            className='tw-text-white tw-text-[13px]'
                            to='#'
                        >
                            Trụ sở chính Tòa nhà FPT Polytechnic, Phố Trịnh Văn Bô, Nam Từ Liêm, Hà Nội
                        </Link>
                    </div>
                    <div className='tw-flex tw-pt-[10px]'>
                        <div className='tw-w-[50%] '>
                            <div className='tw-text-white tw-text-[13px] tw-pb-2'>
                                <span className='tw-text-[#F7941D] tw-text-[16px] tw-underline tw-underline-offset-1'>
                                    Cơ Sở Hà Nội
                                </span>
                                <p>Tòa nhà FPT Polytechnic, Phố Trịnh Văn Bô, Nam Từ Liêm, Hà Nội</p>
                                <span>(024) 7300 1955</span>
                            </div>
                            <div className='tw-text-white tw-text-[13px] tw-pb-2'>
                                <span className='tw-text-[#F7941D] tw-text-[16px] tw-underline tw-underline-offset-1'>
                                    Cơ Sở Đà Nẵng
                                </span>
                                <p>Số 137 Nguyễn Thị Thập, Phường Hòa Minh, Quận Liên Chiểu, TP. Đà Nẵng</p>
                                <span>(0236) 3710 999</span>
                            </div>
                            <div className='tw-text-white tw-text-[13px] tw-pb-2'>
                                <span className='tw-text-[#F7941D] tw-text-[16px] tw-underline tw-underline-offset-1'>
                                    Cơ Sở Cần Thơ
                                </span>
                                <p>Số 288, Nguyễn Văn Linh, phường An Khánh, quận Ninh Kiều, Tp. Cần Thơ.</p>
                                <span>(0292) 7300 468</span>
                            </div>
                            <div className='tw-text-white tw-text-[13px] tw-pb-2'>
                                <span className='tw-text-[#F7941D] tw-text-[16px] tw-underline tw-underline-offset-1'>
                                    Cơ Sở Hải Phòng
                                </span>
                                <p>271 Lê Thánh Tông, phường Máy Chai, quận Ngô Quyền, TP Hải Phòng.</p>
                                <span>(0915) 431 313</span>
                            </div>
                        </div>
                        <div className='tw-pl-[35px]'>
                            <div className='tw-text-white tw-text-[13px] tw-pb-2'>
                                <span className='tw-text-[#F7941D] tw-text-[16px] tw-underline tw-underline-offset-1'>
                                    Cơ Sở Hồ Chí Minh
                                </span>
                                <p>391A Nam Kỳ Khởi Nghĩa, Q. 3, TP. Hồ Chí Minh</p>
                                <p>778/B1 Nguyễn Kiệm, P.4, Q. Phú Nhuận, TP. Hồ Chí Minh</p>
                                <p>Toà nhà Innovation, lô 24, Công viên phần mềm Quang Trung, Quận 12, Hồ Chí Minh</p>
                                <span>(028) 3526 8799 – (028) 62523434</span>
                            </div>
                            <div className='tw-text-white tw-text-[13px] tw-pb-2'>
                                <span className='tw-text-[#F7941D] tw-text-[16px] tw-underline tw-underline-offset-1'>
                                    Cơ Sở Tây Nguyên
                                </span>
                                <p>Số 300/6 đường Hà Huy Tập, p. Tân An, TP. Buôn Ma Thuột, Đắk Lắk</p>
                                <span>(0262) 355 5678</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeFooter