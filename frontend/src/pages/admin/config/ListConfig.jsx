import './list.scss'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import ConfigForm from '../../../components/config/ConfigForm'

const ListConfig = () => {
  return (
    <div className='list'>
      <Sidebar />
      <div className='listContainer'>
        <Navbar />
        <ConfigForm />
      </div>
    </div>
  )
}

export default ListConfig
