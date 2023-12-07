import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

const Widget = props => {
  let data = {}

  const amount = 200
  const diff = 20

  switch (props.type) {
    case 'user':
      data = {
        title: 'USERS',
        isMoney: true,
        link: 'See All Users',
        icon: (
          <PersonOutlineIcon
            className='icon'
            style={{
              color: 'crimson',
              backgroundColor: 'rgba(255, 0, 0, 0.2)'
            }}
          />
        )
      }
      break
    case 'order':
      data = {
        title: 'ORDERS',
        isMoney: true,
        link: 'Show All Orders',
        icon: (
          <ShoppingCartIcon
            className='icon'
            style={{
              color: 'goldenrod',
              backgroundColor: 'rgba(255, 0, 0, 0.2)'
            }}
          />
        )
      }
      break
    case 'earning':
      data = {
        title: 'EARNING',
        isMoney: true,
        link: 'View All Earnings',
        icon: (
          <MonetizationOnIcon
            className='icon'
            style={{
              color: 'green',
              backgroundColor: 'rgba(255, 0, 0, 0.2)'
            }}
          />
        )
      }
      break
    case 'balance':
      data = {
        title: 'BALANCE',
        isMoney: true,
        link: 'See All Balance',
        icon: (
          <PersonOutlineIcon
            className='icon'
            style={{
              color: 'purple',
              backgroundColor: 'rgba(255, 0, 0, 0.2)'
            }}
          />
        )
      }
      break
    default:
      break
  }

  return (
    <div className='widget'>
      <div className='left'>
        <div className='title'>{data.title}</div>
        <div className='counter'>
          {data.isMoney && '$'} {amount}
        </div>
        <div className='link'>{data.link}</div>
      </div>
      <div className='right'>
        <div className='percentage positive'>
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  )
}

export default Widget
