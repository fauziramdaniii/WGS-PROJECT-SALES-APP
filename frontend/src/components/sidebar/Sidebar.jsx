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
import useAuthStores from '../../stores/auth/Auth'
// Link Router
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const { logout } = useAuthStores()
  const role = localStorage.getItem('roles')
  // console.log(role)
  return (
    <div className='sidebar'>
      <div className='top'>
        {role === 'superadmin' && (
          <Link to='/superadmin' style={{ textDecoration: 'none' }}>
            <span className='logo'>Admin App</span>
          </Link>
        )}
        {role === 'admin' && (
          <Link to='/admin' style={{ textDecoration: 'none' }}>
            <span className='logo'>Admin App</span>
          </Link>
        )}
      </div>
      <hr />
      <div className='center'>
        {role === 'superadmin' && (
          <ul>
            <p className='title'>MAIN</p>
            <li>
              <GridViewRoundedIcon className='icon' />
              <span>Dashboard</span>
            </li>
            <p className='title'>LIST</p>
            <Link to='/superadmin/users' style={{ textDecoration: 'none' }}>
              <li>
                <PersonRoundedIcon className='icon' />
                <span>Users</span>
              </li>
            </Link>
            <p className='title'>SERVICE</p>
            <li>
              <HubIcon className='icon' />
              <span>Logs</span>
            </li>
            <p className='title'>USER</p>
            <li>
              <LogoutIcon className='icon' />
              <span onClick={logout}>Logout</span>
            </li>
          </ul>
        )}
        {role === 'admin' && (
          <ul>
            <p className='title'>MAIN</p>
            <li>
              <GridViewRoundedIcon className='icon' />
              <span>Dashboard</span>
            </li>
            <p className='title'>LIST</p>
            <Link to='/admin/users' style={{ textDecoration: 'none' }}>
              <li>
                <PersonRoundedIcon className='icon' />
                <span>Users</span>
              </li>
            </Link>
            <Link to='/admin/category' style={{ textDecoration: 'none' }}>
              <li>
                <LeaderboardRoundedIcon className='icon' />
                <span>Category</span>
              </li>
            </Link>
            <Link to='/admin/product' style={{ textDecoration: 'none' }}>
              <li>
                <ProductionQuantityLimitsIcon className='icon' />
                <span>Product</span>
              </li>
            </Link>
            <Link to='/admin/order' style={{ textDecoration: 'none' }}>
              <li>
                <CreditCardIcon className='icon' />
                <span>Orders</span>
              </li>
            </Link>
            <p className='title'>SERVICE</p>
            <Link to='/admin/log' style={{ textDecoration: 'none' }}>
              <li>
                <HubIcon className='icon' />
                <span>Logs</span>
              </li>
            </Link>
            <Link to='/admin/term-condition' style={{ textDecoration: 'none' }}>
              <li>
                <SettingsIcon className='icon' />
                <span>Term Condition</span>
              </li>
            </Link>
            <p className='title'>USER</p>
            <li>
              <PermContactCalendarRoundedIcon className='icon' />
              <span>Profile</span>
            </li>
            <li>
              <LogoutIcon className='icon' />
              <span onClick={logout}>Logout</span>
            </li>
          </ul>
        )}
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
