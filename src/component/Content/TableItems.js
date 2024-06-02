import React, { useState } from 'react';
import { Button, Table, Tag } from 'antd';
import arrowLeft from "../../assets/images/arrow-chevron-left.svg"
import arrowRight from "../../assets/images/arrow-chevron-right.svg"
import doubleArrowLeft from "../../assets/images/double-arrow-left.svg"
import doubleArrowRight from "../../assets/images/double-arrow-right.svg"
import DocModal from '../modals/DocModal';



const TableItems = ({ empty }) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const columns = [
        {
            title: 'NO',
            dataIndex: 'no',
        },
        {
            title: '기존유형',
            dataIndex: 'type',
            render: (type) => (<span className='wrap-date-title'>{type}</span>)
        },
        {
            title: '신청유형',
            dataIndex: 'requestType',
            render: (requestType) => (<span className='wrap-date-title'>{requestType}</span>)
        },
        {
            title: '제출서류',
            dataIndex: 'documents',
            render: () => (<Button className='btn-tableitem' onClick={showModal}>보기</Button>)
        },

        {
            title: '신청일시',
            dataIndex: 'date',
            render: (date) => (<span className='wrap-date-title'>{date}</span>)
        },
        {
            title: '승인여부',
            dataIndex: 'status',
            render: status => {
                let color;
                if (status === '승인거부') {
                    color = 'red';
                } else if (status === '승인대기') {
                    color = 'orange';
                } else {
                    color = 'green';
                }
                return <Tag color={color}>{status}</Tag>;
            },

        },
        {
            title: '승인거부 사유',
            dataIndex: 'reason',
            render: (admin) => (<span className='wrap-date-title0'>{admin}</span>)

        },
        {
            title: '승인일시',
            dataIndex: 'approvalDate',
            render: (date) => (<span className='wrap-date-title'>{date}</span>)
        },
        {
            title: '관리자',
            dataIndex: 'admin',
            render: (admin) => (<span className='wrap-date-title'>{admin}</span>)
        }
    ];
    const data = [];
    const types = ['소득적격', '소득적격', '일반개인'];
    const requestTypes = ['개인전문', '개인전문', '소득적격'];

    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            no: i + 1,
            type: types[i % 3],
            requestType: requestTypes[i % 3],
            documents: `Document ${i}`,
            date: `2023-01-10 09:00:00`,
            status: i % 3 === 0 ? '승인완료' : i % 3 === 1 ? '승인거부' : '승인대기',
            reason: i % 2 === 0 ? '' : '서류 식별 불가 금융투자업자에 계좌를 개설한지 1년 미만으로 전문투자자 승인 불가',
            approvalDate: i % 2 === 0 ? '2023-01-10 09:00:00' : '',
            admin: `김관리자`,
        });
    }
    //  { no: 1, type: '소득적격', requestType: '개인전문', date: '2023-01-10 09:00:00', status: '승인거부', reason: '서류  ...', approvalDate: '2023-01-10 09:00:00' },
   
 
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,

    };
    const itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <div className="arrow-container">
                <img src={doubleArrowLeft} alt="arrowLeft" />
                <img src={arrowLeft} alt="arrowLeft" />
            </div>;
        }
        if (type === 'next') {
            return <div className="arrow-container">
                <img src={arrowRight} alt="arrowRight" />
                <img src={doubleArrowRight} alt="arrowLeft" />
            </div>;
        }
        return originalElement;
    };


    return (
        <div className="table-stand-container" >

            <Table rowSelection={rowSelection}
                columns={columns}
                dataSource={empty ? [] : data}
                stickyScrollBarBg="#000"
                locale={{
                    emptyText: (
                        <span className='empty-text-tab'>
                            조회 결과가 없습니다.
                        </span>
                    )
                }}
                size="small"
                scroll={{ x: '100%' }}
                pagination={{ itemRender }}
            />
            <DocModal
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                handleOk={handleOk}
            />
     
          
        </div>

    );
};
export default TableItems;


