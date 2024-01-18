import './navbar.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined'
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import useOrderStores from '../../stores/order/OrderStore'
import { useEffect, useState } from 'react'
const Navbar = () => {
  const [length, setLength] = useState('')
  const { getOrder } = useOrderStores()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrder()
      setLength(response.data.length)
    }

    fetchData()
  })
  return (
    <div className='navbarAdmin'>
      <div className='wrapper'>
        <div className='search'>
          <input
            type='text'
            className='form-control'
            placeholder='Search...'
            value='Search...'
            readOnly
            //or onChange Bro ada Error di Console
          />
          <SearchOutlinedIcon />
        </div>
        <div className='items'>
          {/* <div className='item'>
            <LanguageOutlinedIcon className='icon' />
            English
          </div> */}
          {/* <div className='item'>
            <DarkModeOutlinedIcon className='icon' />
          </div>
          <div className='item'>
            <FullscreenExitOutlinedIcon className='icon' />
          </div> */}
          <div className='item'>
            <CircleNotificationsOutlinedIcon className='icon' />
            <div className='counter'>{length}</div>
          </div>
          {/* <div className='item'>
            <ChatOutlinedIcon className='icon' />
            <div className='counter'>1</div>
          </div> */}
          {/* <div className='item'>
            <FormatListBulletedOutlinedIcon className='icon' />
          </div> */}
          <div className='item'>
            <img
              src='https://marketplace.canva.com/EAFlcJIzmtg/1/0/800w/canva-bright-colorful-young-man-avatar-U6MaG3J9sic.jpg'
              alt=''
              className='avatar'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
