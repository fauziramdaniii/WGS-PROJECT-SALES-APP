import './list.scss'
import Sidebar from '../../../../components/sidebar/Sidebar'
import Navbar from '../../../../components/navbar/Navbar'
import DataTable from '../../../../components/datatable/category/DataTable'

const ListCategory = () => {
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

export default ListCategory
