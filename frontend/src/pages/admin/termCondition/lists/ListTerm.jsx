import './list.scss'
import Sidebar from '../../../../components/sidebar/Sidebar'
import Navbar from '../../../../components/navbar/Navbar'
import DataTable from '../../../../components/datatable/termCondition/DataTable'
import DataTableExpired from '../../../../components/datatable/expiredOrder/DataTableExpired'

const ListTerm = () => {
  return (
    <div className='list'>
      <Sidebar />
      <div className='listContainer'>
        <Navbar />
        <DataTable />
        <DataTableExpired />
      </div>
    </div>
  )
}

export default ListTerm
