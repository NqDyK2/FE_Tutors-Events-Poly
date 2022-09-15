import { Button, Col, Row } from 'antd'
import React from 'react'

// import image
import img1 from '../../../assets/images/9-fptsetochuc_CEKW 1.png'
import img2 from '../../../assets/images/Anh-bia-Top-10 1.png'
import img3 from '../../../assets/images/su-kien-cong-nghe-lon-nhat-cua-fpt-sap-dien-ra-1573035901 1.png'
import img4 from '../../../assets/images/9-fptsetochuc_CEKW 1.png'


const EventsPage = () => {
    return (
        <div>
            <Row gutter={[24, 16]}>
                <Col span={6} className='tw-text-center'>
                    <img src={img2} className='tw-w-full tw-h-1/2' />
                    <span className="tw-text-xl">- Sự kiện Hot Tháng 12 -</span>
                    <p>Tổng hợp sự kiện tháng 12, trong những tháng gần đây phong trào của sinh viên đang....</p>
                    <Button className='tw-w-32 tw-text-white tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500 tw-hover:bg-gradient-to-bl tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-font-medium tw-rounded-lg tw-text-sm  tw-text-center tw-mr-2 tw-mb-2'>Xem thêm </Button>
                </Col>
                <Col span={6} className='tw-text-center'>
                    <img src={img1} className='tw-w-full tw-h-1/2' />
                    <span className="tw-text-xl">- Sự kiện Hot Tháng 12 -</span>
                    <p>Tổng hợp sự kiện tháng 12, trong những tháng gần đây phong trào của sinh viên đang....</p>
                    <Button className='tw-w-32 tw-text-white tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500 tw-hover:bg-gradient-to-bl tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-font-medium tw-rounded-lg tw-text-sm  tw-text-center tw-mr-2 tw-mb-2'>Xem thêm </Button>
                </Col>
                <Col span={6} className='tw-text-center'>
                    <img src={img3} className='tw-w-full tw-h-1/2' />
                    <span className="tw-text-xl">- Sự kiện Hot Tháng 12 -</span>
                    <p>Tổng hợp sự kiện tháng 12, trong những tháng gần đây phong trào của sinh viên đang....</p>
                    <Button className='tw-w-32 tw-text-white tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500 tw-hover:bg-gradient-to-bl tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-font-medium tw-rounded-lg tw-text-sm  tw-text-center tw-mr-2 tw-mb-2'>Xem thêm </Button>
                </Col>
                <Col span={6} className='tw-text-center'>
                    <img src={img4} className='tw-w-full tw-h-1/2' />
                    <span className="tw-text-xl">- Sự kiện Hot Tháng 12 -</span>
                    <p>Tổng hợp sự kiện tháng 12, trong những tháng gần đây phong trào của sinh viên đang....</p>
                    <Button className='tw-w-32 tw-text-white tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500 tw-hover:bg-gradient-to-bl tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-cyan-300 tw-dark:focus:ring-cyan-800 tw-font-medium tw-rounded-lg tw-text-sm  tw-text-center tw-mr-2 tw-mb-2'>Xem thêm </Button>
                </Col>
            </Row>
        </div>
    )
}

export default EventsPage