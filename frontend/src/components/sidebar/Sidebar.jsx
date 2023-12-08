// Outline CSS
import './sidebar.scss'

// Icon From Material React UI
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import AccessibleForwardRoundedIcon from '@mui/icons-material/AccessibleForwardRounded'
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded'
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded'
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded'
import HubIcon from '@mui/icons-material/Hub'
import SettingsIcon from '@mui/icons-material/Settings'
import PermContactCalendarRoundedIcon from '@mui/icons-material/PermContactCalendarRounded'
import LogoutIcon from '@mui/icons-material/Logout'

// Link Router
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='top'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className='logo'>Admin App</span>
        </Link>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <p className='title'>MAIN</p>
          <li>
            <GridViewRoundedIcon className='icon' />
            <span>Dashboard</span>
          </li>
          <p className='title'>LIST</p>
          <Link to='/users' style={{ textDecoration: 'none' }}>
            <li>
              <PersonRoundedIcon className='icon' />
              <span>Users</span>
            </li>
          </Link>
          <Link to='/products' style={{ textDecoration: 'none' }}>
            <li>
              <ProductionQuantityLimitsIcon className='icon' />
              <span>Product</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className='icon' />
            <span>Orders</span>
          </li>
          <li>
            <AccessibleForwardRoundedIcon className='icon' />
            <span>Delivery</span>
          </li>
          <p className='title'>USEFULL</p>
          <li>
            <LeaderboardRoundedIcon className='icon' />
            <span>Stats</span>
          </li>
          <li>
            <CircleNotificationsRoundedIcon className='icon' />
            <span>Notification</span>
          </li>
          <p className='title'>SERVICE</p>
          <li>
            <HealthAndSafetyRoundedIcon className='icon' />
            <span>System Health</span>
          </li>
          <li>
            <HubIcon className='icon' />
            <span>Logs</span>
          </li>
          <li>
            <SettingsIcon className='icon' />
            <span>Setting</span>
          </li>
          <p className='title'>USER</p>
          <li>
            <PermContactCalendarRoundedIcon className='icon' />
            <span>Profile</span>
          </li>
          <li>
            <LogoutIcon className='icon' />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className='bottom'>
        <div className='colorOption'></div>
        <div className='colorOption'></div>
        <div className='colorOption'></div>
      </div>
    </div>
  )
}

export default Sidebar
