/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Col, Row } from 'antd'

const ListPost = () => {
    return (
        <div>
            <Row className='tw-text-center'>
                <Col span={8}>
                    <div className="tw-max-w-sm tw-bg-white tw-rounded-lg tw-border tw-border-gray-200 tw-shadow-md tw-dark:bg-gray-800 tw-dark:border-gray-700">
                        <a href="#">
                            <img className="tw-rounded-t-lg" src="https://tamnguyen.vn/wp-content/uploads/2021/09/html-la-gi.png" alt width="100%" />
                        </a>
                        <div className="tw-p-5">
                            <a href="#">
                                <h5 className="tw-mb-2 tw-text-2xl tw-font-bold tw-tracking-tight tw-text-gray-900 tw-dark:text-white">Nội dung học tập của buổi học 1 - WEB1013 - Xây dựng trang web</h5>
                            </a>
                            <p className="tw-mb-3 tw-font-normal tw-text-gray-700 tw-dark:text-gray-400">
                                Trong buổi học này chúng ta sẽ cùng nhau ôn tập lại các phím tắt hỗ trợ code. Ôn tập lại các cặp thẻ HTML mà chúng ta sẽ thường gặp trong khi học và đi thi.
                                Quan trọng nhất là chúng ta cùng ôn tập và thực hành lại việc chia layouts để lấy trước 4 điểm. Cuối cùng sẽ là một chút với nội dung buổi tiếp theo là về CSS.
                            </p>
                            {/* <a href="#" className="tw-inline-flex tw-items-center tw-py-2 tw-px-3 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-blue-700 tw-rounded-lg tw-hover:bg-blue-800 tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-blue-300 tw-dark:bg-blue-600 tw-dark:hover:bg-blue-700 tw-dark:focus:ring-blue-800">
                                Read more
                                <svg aria-hidden="true" className="tw-ml-2 -tw-mr-1 tw-w-4 tw-h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </a> */}
                        </div>
                    </div>

                </Col>
                <Col span={8}>
                    <div className="tw-max-w-sm tw-bg-white tw-rounded-lg tw-border tw-border-gray-200 tw-shadow-md tw-dark:bg-gray-800 tw-dark:border-gray-700">
                        <a href="#">
                            <img className="tw-rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt width="100%" />
                        </a>
                        <div className="tw-p-5">
                            <a href="#">
                                <h5 className="tw-mb-2 tw-text-2xl tw-font-bold tw-tracking-tight tw-text-gray-900 tw-dark:text-white">Noteworthy technology acquisitions 2021</h5>
                            </a>
                            <p className="tw-mb-3 tw-font-normal tw-text-gray-700 tw-dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <a href="#" className="tw-inline-flex tw-items-center tw-py-2 tw-px-3 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-blue-700 tw-rounded-lg tw-hover:bg-blue-800 tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-blue-300 tw-dark:bg-blue-600 tw-dark:hover:bg-blue-700 tw-dark:focus:ring-blue-800">
                                Read more
                                <svg aria-hidden="true" className="tw-ml-2 -tw-mr-1 tw-w-4 tw-h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                    </div>

                </Col>
                <Col span={8}>
                    <div className="tw-max-w-sm tw-bg-white tw-rounded-lg tw-border tw-border-gray-200 tw-shadow-md tw-dark:bg-gray-800 tw-dark:border-gray-700">
                        <a href="#">
                            <img className="tw-rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt width="100%" />
                        </a>
                        <div className="tw-p-5">
                            <a href="#">
                                <h5 className="tw-mb-2 tw-text-2xl tw-font-bold tw-tracking-tight tw-text-gray-900 tw-dark:text-white">Noteworthy technology acquisitions 2021</h5>
                            </a>
                            <p className="tw-mb-3 tw-font-normal tw-text-gray-700 tw-dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <a href="#" className="tw-inline-flex tw-items-center tw-py-2 tw-px-3 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-blue-700 tw-rounded-lg tw-hover:bg-blue-800 tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-blue-300 tw-dark:bg-blue-600 tw-dark:hover:bg-blue-700 tw-dark:focus:ring-blue-800">
                                Read more
                                <svg aria-hidden="true" className="tw-ml-2 -tw-mr-1 tw-w-4 tw-h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                    </div>

                </Col >
            </Row >
        </div >
    )
}

export default ListPost