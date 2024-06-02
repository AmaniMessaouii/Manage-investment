import React from 'react'
import TopTableHeader from './Content/TopTableHeader'
import { Divider } from 'antd'
import TableItems from './Content/TableItems'
import SecondTopTableHeader from './Content/SecondTopTableHeader'

function EmptyTable() {
  return (
    <div>
      <TopTableHeader />
      <Divider style={{ color: "#D7D8DA" }} />
      <SecondTopTableHeader />
      <TableItems empty={true} />
    </div>
  )
}

export default EmptyTable