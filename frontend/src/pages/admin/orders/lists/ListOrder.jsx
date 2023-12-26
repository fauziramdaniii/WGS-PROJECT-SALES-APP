import './list.scss'
import Sidebar from '../../../../components/sidebar/Sidebar'
import Navbar from '../../../../components/navbar/Navbar'
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
import useOrderStores from '../../../../stores/order/OrderStore'
import axios from 'axios'
import Swal from 'sweetalert2'

const ListOrder = () => {
  const { getOrderProduct } = useOrderStores()
  const [dataOrder, setDataOrder] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrderProduct()
        setDataOrder(response.data)
      } catch (error) {
        console.error('error fetching data: ', error)
      }
    }
    fetchData()
  }, [getOrderProduct])

  const handleConfirmStatus = async orderId => {
    Swal.fire({
      title: 'Do you want to confirm the order?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: `Cancel`
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:3000/api/order/${orderId}/status`, {
            status: 'sold'
          })
          Swal.fire('Order confirmed!', '', 'success')
        } catch (error) {
          console.error('Error confirming status:', error)
          Swal.fire('Error confirming order', '', 'error')
        }
      }
    })
  }

  return (
    <div className='list'>
      <Sidebar />
      <div className='listContainer'>
        <Navbar />
        <TableContainer component={Paper} className='table'>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell className='tableCell'>Tracking ID</TableCell>
                <TableCell className='tableCell'>Product</TableCell>
                <TableCell className='tableCell'>Date</TableCell>
                <TableCell className='tableCell'>Amount</TableCell>
                <TableCell className='tableCell'>Method</TableCell>
                <TableCell className='tableCell'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataOrder.map(row => (
                <TableRow key={row.id}>
                  <TableCell className='tableCell'>{row.id}</TableCell>
                  <TableCell className='tableCell'>
                    <div className='cellWrapper'>
                      <img
                        src={`http://localhost:3000/uploads/${row.product.image}`}
                        alt=''
                        className='image'
                      />
                      {row.product.name}
                    </div>
                  </TableCell>
                  <TableCell className='tableCell'>
                    {new Date(row.order_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className='tableCell'>{`Rp. ${row.total_amount}`}</TableCell>
                  <TableCell className='tableCell'>
                    {row.payment_method}
                  </TableCell>
                  <TableCell className='tableCell'>
                    <button
                      className={`btn ${
                        row.status[0] === 'sold'
                          ? 'btn-outline-secondary btn-sm'
                          : 'btn-outline-success btn-sm'
                      }`}
                      onClick={() => handleConfirmStatus(row.id)}
                      disabled={row.status[0] === 'sold'}
                    >
                      {row.status[0] === 'sold' ? 'Sold' : 'Confirm'}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default ListOrder
