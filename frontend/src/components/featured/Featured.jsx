import './featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { CircularProgressbar } from 'react-circular-progressbar'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import 'react-circular-progressbar/dist/styles.css'

function Featured () {
  return (
    <div className='featured'>
      <div className='top'>
        <h1 className='title'> Senggol Dong Bos</h1>
        <MoreVertIcon fontSize='small' />
      </div>
      <div className='bottom'>
        <div className='featuredChart'>
          <CircularProgressbar value={70} text={'70%'} strokeWidth={5} />
        </div>
        <p className='title'>Total Sales Made Today</p>
        <p className='amount'>$420</p>
        <p className='desc'>Last Payment Not Be Include</p>
        <div className='summary'>
          <div className='item'>
            <div className='itemTitle'>Target</div>
            <div className='itemResult'>
              <KeyboardArrowUpIcon fontSize='small' />
              <div className='resultAmount'>Rp. 50k</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemTitle'>Target</div>
            <div className='itemResult'>
              <KeyboardArrowUpIcon fontSize='small' />
              <div className='resultAmount'>Rp. 50k</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemTitle'>Target</div>
            <div className='itemResult negative'>
              <KeyboardArrowDownIcon fontSize='small' />
              <div className='resultAmount'>Rp. 20k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured
