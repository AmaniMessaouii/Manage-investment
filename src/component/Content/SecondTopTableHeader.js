import { Button, Select } from 'antd'
import React, { useState } from 'react'
import arrowDown from "../../assets/images/Vector.svg"
import InvestmentTypeModal from '../modals/InvestmentTypeModal';

function SecondTopTableHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const approvalData = [
        {
            value: '승인상태 변경',
            label: '승인상태 변경',
        },
        {
            value: '승인완료',
            label: '승인완료',
        },
        {
            value: '승인거부',
            label: '승인거부',
        },
    ]
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='topTab-header-container' style={{ marginBottom: "10px" }}>
                <Button className='btn-tab' onClick={showModal}>등록</Button>
                <div className='topTab-select-container'>
                    <span className='name-topTab0'>선택한 0건</span>
                    <Select
                        defaultValue="승인상태 변경"
                        onChange={handleChange}
                        options={approvalData}
                        suffixIcon={<img src={arrowDown} alt="arrowDown" className="custom-arrow" />}
                        className="custom-select"
                        popupClassName="custom-dropdown"
                    // open={true}

                    />
                    <Button className='btn-tab'>저장</Button>
                </div>

            </div>

            <InvestmentTypeModal
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                handleOk={handleOk}
                setIsModalOpen={setIsModalOpen}
            />


        </>

    )
}

export default SecondTopTableHeader