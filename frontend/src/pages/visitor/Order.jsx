import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './table.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import useOrderStores from '../../stores/order/OrderStore'
import axios from 'axios'

const Order = () => {
  const { getOrderProduct } = useOrderStores()
  const [dataOrder, setDataOrder] = useState([])
  useEffect(() => {
    const id_user = localStorage.getItem('id_user')
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/order/${id_user}`
        )
        setDataOrder(response.data.data)
      } catch (error) {
        console.error('error fetching data: ', error)
      }
    }
    fetchData()
  }, [getOrderProduct])

  const formatToRupiah = amount => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })
    return formatter.format(amount)
  }

  return (
    <>
      <div className='container my-1 py-1'>
        <h4 className='text-center'>Order</h4>
        <hr />

        <TableContainer component={Paper} className='table'>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell className='tableCell'>Tracking ID</TableCell>
                <TableCell className='tableCell'>Product</TableCell>
                <TableCell className='tableCell'>Date</TableCell>
                <TableCell className='tableCell'>Amount</TableCell>
                <TableCell className='tableCell'>Method</TableCell>
                <TableCell className='tableCell'>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataOrder.map(row => (
                <TableRow key={row.id}>
                  <TableCell className='tableCell'>{row.id}</TableCell>
                  <TableCell className='tableCell'>
                    <div className='cellWrapper'>
                      <img
                        src={`${import.meta.env.VITE_API_URL}uploads/${
                          row.product.image
                        }`}
                        alt=''
                        className='image'
                      />
                      {row.product.name}
                    </div>
                  </TableCell>
                  <TableCell className='tableCell'>
                    {new Date(row.order_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className='tableCell'>
                    {formatToRupiah(row.total_amount)}
                  </TableCell>
                  <TableCell className='tableCell'>
                    {row.payment_method}
                  </TableCell>
                  <TableCell className='tableCell'>
                    <span className={`status ${row.status[0].toLowerCase()}`}>
                      {row.status[0]}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default Order
