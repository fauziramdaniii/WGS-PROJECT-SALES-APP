import './featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import getDashboad from '../../stores/DashboardStores'
import { useState, useEffect } from 'react'

const Featured = () => {
  const [salesToday, setSalesToday] = useState([])
  const [salesWeekly, setSalesWeekly] = useState([])
  const [salesMonth, setSalesMonth] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDashboad()
      console.log(response)
      setSalesToday(response.countTotalOrderToday)
      setSalesWeekly(response.countTotalOrderLastWeek)
      setSalesMonth(response.countTotalOrderLastMonth)
    }

    fetchData()
  })

  const formatToRupiah = amount => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })
    return formatter.format(amount)
  }

  return (
    <div className='featured'>
      <div className='top'>
        <h1 className='title'>Total Revenue</h1>
        <MoreVertIcon fontSize='small' />
      </div>
      <div className='bottom'>
        <div className='featuredChart'>
          <CircularProgressbar value={70} text={'70%'} strokeWidth={5} />
        </div>
        <p className='title'>Total sales made today</p>
        <p className='amount'>{formatToRupiah(salesToday)}</p>
        <p className='desc'>
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className='summary'>
          <div className='item'>
            <div className='itemTitle'>Last Week</div>
            <div className='itemResult positive'>
              {/* <KeyboardArrowUpOutlinedIcon fontSize='small' /> */}
              <div className='resultAmount'>{formatToRupiah(salesWeekly)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured
