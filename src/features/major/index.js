import { SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Collapse, Select } from 'antd';
import React, { useState } from 'react';

const { Panel } = Collapse;
const MajorPage = () => {
    const [expandIconPosition, setExpandIconPosition] = useState('start');

    const onChange = (key) => {
        console.log(key);
    };
    const genExtra = () => (
        <SettingOutlined
            onClick={(event) => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}
        />
    );
    return (
        <>
            <Collapse
                defaultActiveKey={['1']}
                onChange={onChange}
                expandIconPosition={expandIconPosition}
            >
                <Panel header="Công nghệ thông Tin" key="1" extra={genExtra()}>
                    <Collapse
                        onChange={onChange}
                        defaultActiveKey={['web']}
                        expandIconPosition={expandIconPosition}>
                        <Panel header="Thiết kế website" key="web" extra={genExtra()}>
                            <div className='tw-flex tw-gap-2 tw-items-center'>
                                <span>- Xây dựng trang Web</span>
                                <a><EditOutlined /></a>
                                <a><DeleteOutlined /></a>
                            </div>
                            <br />
                            <span>- JavaScript</span>
                            <br />
                            <span>- PHP</span>
                            <br />
                            <span>- ReactJs</span>
                            <br />
                            <a className='tw-pl-3 tw-mt-3 tw-text-sm'>+ Thêm môn học...</a>
                        </Panel>
                        <Panel header="Ứng dụng phần mềm"></Panel>
                        <Panel header="Lập trình máy tính"></Panel>
                    </Collapse>
                </Panel>
                <Panel header="Quản trị kinh doanh" key="2" extra={genExtra()}>
                    <div>Dogs</div>
                </Panel>
                <Panel header="Thiết kế đồ họa" key="3" extra={genExtra()}>
                    <div>Cats</div>
                </Panel>
            </Collapse>

        </>
    )
}

export default MajorPage