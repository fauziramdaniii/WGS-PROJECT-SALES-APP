import './list.scss'
import Sidebar from '../../../../components/sidebar/Sidebar'
import Navbar from '../../../../components/navbar/Navbar'
import DataTable from '../../../../components/datatable/termCondition/DataTable'

const ListTerm = () => {
  return (
    <div className='list'>
      <Sidebar />
      <div className='listContainer'>
        <Navbar />
        <DataTable />
      </div>
    </div>
  )
}

export default ListTerm
