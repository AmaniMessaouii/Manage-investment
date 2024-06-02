import React, { useState } from 'react'
import { Badge, Divider, Radio } from 'antd'
import TableContent from './TableContent';
import EmptyTable from './EmptyTable';

function Table() {
  const [tabPosition, setTabPosition] = useState(1);

  const changeTabPosition = e => {
    setTabPosition(e.target.value);
  };
  const tabsData = [
    {
      id: 0,
      name: "기본정보 관리",
      component: EmptyTable
    },
    {
      id: 1,
      name: "투자유형 관리",
      component: TableContent
    },
    {
      id: 2,
      name: "입출금내역 조회",
      component: EmptyTable
    },
    {
      id: 3,
      name: "영업내역 조회",
      component: EmptyTable
    },
    {
      id: 4,
      name: "투자내역 조회",
      component: EmptyTable
    },
    {
      id: 5,
      name: "채권내역 조회",
      component: EmptyTable
    },
    {
      id: 6,
      name: "SMS 관리",
      component: EmptyTable
    },
    {
      id: 7,
      name: "상담내역 관리",
      component: EmptyTable
    },
    {
      id: 8,
      name: "1:1문의내역 조회",
      component: EmptyTable
    },

  ]
  const ActiveComponent = tabsData.find(tab => tab.id === tabPosition)?.component;

  return (
    <>
      <div className='header-container'>
        <h5 className='title-text'>회원상세</h5>
        <Badge dot offset={[-52, 0]} color='#FF4D4F'>
          <span className='bage-text'>필수항목</span>
        </Badge>

      </div>
      <Divider style={{ color: "#D7D8DA" }} />
      <div>
        <Radio.Group value={tabPosition} onChange={changeTabPosition} style={{ marginBottom: 20 }}>
          {tabsData.map(item =>
            <Radio.Button value={item.id} key={item.id}>{item.name}</Radio.Button>
          )}
        </Radio.Group>
        <div className="tab-content">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>

<div>
  
</div>

    </>


  )
}

export default Table