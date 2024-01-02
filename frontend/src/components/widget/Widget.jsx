import React, { useState, useEffect } from 'react'
import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import getDashboard from '../../stores/DashboardStores'
import { Link } from 'react-router-dom'

const Widget = props => {
  const [dataCount, setDataCount] = useState([])

  useEffect(() => {
    // Fetch dashboard data when component mounts
    const fetchData = async () => {
      try {
        const response = await getDashboard()
        setDataCount(response)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    fetchData()
  }, []) // Empty dependency array ensures the effect runs only once on mount

  // Initialize data object
  let data = {}

  const diff = 20

  // Switch case to determine the type of widget and set corresponding data
  switch (props.type) {
    case 'user':
      data = {
        title: 'USERS',
        link: (
          <Link
            to='/admin/users'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            See All Users
          </Link>
        ),
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
        link: (
          <Link
            to='/admin/order'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            See All Order
          </Link>
        ),
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
    case 'category':
      data = {
        title: 'CATEGORIES',
        link: (
          <Link
            to='/admin/category'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            See All Category
          </Link>
        ),
        icon: (
          <MonetizationOnIcon
            className='icon'
            style={{
              color: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.2)'
            }}
          />
        )
      }
      break
    case 'product':
      data = {
        title: 'PRODUCTS',
        link: (
          <Link
            to='/admin/product'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            See All Product
          </Link>
        ),
        icon: (
          <ShoppingCartIcon
            className='icon'
            style={{
              color: 'orange',
              backgroundColor: 'rgba(255, 165, 0, 0.2)'
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
          <span>{dataCount[`${props.type.toLowerCase()}Count`]}</span>
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
