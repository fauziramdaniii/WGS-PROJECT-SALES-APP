import Sidebar from '../../../../components/sidebar/Sidebar'
import Navbar from '../../../../components/navbar/Navbar'
import './home.scss'
import Widget from '../../../../components/widget/Widget'
import Featured from '../../../../components/featured/Featured'
import Chart from '../../../../components/chart/Chart'
import BasicTable from '../../../../components/table/Table'

const Home = () => {
  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className='widgets'>
          <Widget type='user' />
          <Widget type='order' />
          <Widget type='category' />
          <Widget type='product' />
        </div>
        <div className='charts'>
          <Featured />
          <Chart />
        </div>
        <div className='listContainer'>
          <div className='listTitle'>Last Transactions</div>
          <BasicTable />
        </div>
      </div>
    </div>
  )
}

export default Home
