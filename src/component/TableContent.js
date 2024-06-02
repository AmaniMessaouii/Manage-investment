import React from 'react'
import TopTableHeader from './Content/TopTableHeader'
import {  Divider } from 'antd'
import SecondTopTableHeader from './Content/SecondTopTableHeader'
import TableItems from './Content/TableItems'
function TableContent() {
  return (
    <div>
    <TopTableHeader/>
    <Divider style={{ color: "#D7D8DA" }} />
    <SecondTopTableHeader/>
    <TableItems  empty={false}/>

    </div>
  )
}

export default TableContent