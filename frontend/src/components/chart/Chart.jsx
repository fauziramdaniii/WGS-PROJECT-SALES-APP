import React, { useEffect, useState } from 'react'
import './chart.scss'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import getDashboard from '../../stores/DashboardStores'

// Utility function to format number to Rupiah
const formatToRupiah = value => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  })
  return formatter.format(value)
}

const Chart = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboard()
        setData(response.countTotalOrderLast3Month)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='chart'>
      <div className='title'>Last 3 Months</div>
      <ResponsiveContainer width='99%' aspect={2 / 1}>
        <BarChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray='3 3'
            className='chartGrid'
            stroke='gray'
          />
          <XAxis dataKey='month' />
          {/* <YAxis
            tickFormatter={value => formatToRupiah(value)}
            domain={['auto', 'auto']} // To adjust YAxis ticks based on the data
          /> */}
          <Tooltip formatter={value => formatToRupiah(value)} />
          <Bar dataKey='total_amount' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
