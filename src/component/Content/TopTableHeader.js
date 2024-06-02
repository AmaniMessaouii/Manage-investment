import React from 'react'
import { Select } from 'antd'
import arrowDown from "../../assets/images/Vector.svg"
function TopTableHeader() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const authorizedData = [
        {
            value: '승인여부 전체',
            label: '승인여부 전체',
        },
        {
            value: '승인대기',
            label: '승인대기',
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
    const dateData = [
        {
            value: '신청일시순',
            label: '신청일시순',
        },
        {
            value: '승인일시순',
            label: '승인일시순',
        },

    ]
    const piecesData = [
        {
            value: '50개씩 보기',
            label: '50개씩 보기',
        },

    ]
    return (
        <div className='topTab-header-container'>
            <div className='header-container' style={{ gap: "8px" }}>
                <h5 className='title-text-table'>신청 목록</h5>
                <span className='subtitle-text-table'>(총 100명 | 승인대기 <span className='span-subtitle-text'>1</span>건)</span>
            </div>
            <div className='topTab-select-container'>
                <Select
                    defaultValue="승인여부 전체"
                    onChange={handleChange}
                    options={authorizedData}
                    suffixIcon={<img src={arrowDown} alt="arrowDown" className="custom-arrow" />}
                    className="custom-select"
                    popupClassName="custom-dropdown"
                    // open={true}

                />
                <Select
                    defaultValue="신청일시순"
                    onChange={handleChange}
                    options={dateData}
                    suffixIcon={<img src={arrowDown} alt="arrowDown" className="custom-arrow" />}
                    className="custom-select"
                    popupClassName="custom-dropdown"
                />
                <Select
                    defaultValue="50개씩 보기"
                    onChange={handleChange}
                    options={piecesData}
                    suffixIcon={<img src={arrowDown} alt="arrowDown" className="custom-arrow" />}
                    className="custom-select"
                    popupClassName="custom-dropdown"

                />
            </div>
        </div>

    )
}

export default TopTableHeader