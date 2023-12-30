import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Swal from 'sweetalert2'
import axios from 'axios'
import useOrderStores from '../../../../stores/order/OrderStore'
import Sidebar from '../../../../components/sidebar/Sidebar'
import Navbar from '../../../../components/navbar/Navbar'
import './list.scss'

const ListOrder = () => {
  const { getOrder } = useOrderStores()
  const [dataOrder, setDataOrder] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getOrder()
      console.log(response)
      setDataOrder(response.data)
    } catch (error) {
      console.error('error fetching data: ', error)
    }
  }

  const formatToRupiah = amount => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })
    return formatter.format(amount)
  }

  const handleConfirmStatus = async orderId => {
    Swal.fire({
      title: 'Do you want to confirm the order?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `${import.meta.env.VITE_API_URL}api/order/${orderId}/status`,
            {
              status: 'sold'
            }
          )
          Swal.fire('Order confirmed!', '', 'success')
          fetchData()
        } catch (error) {
          console.error('Error confirming status:', error)
          Swal.fire('Error confirming order', '', 'error')
        }
      }
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div className='list'>
      <Sidebar />
      <div className='listContainer'>
        <Navbar />
        {dataOrder.length > 0 ? (
          <div>
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
                  {(rowsPerPage > 0
                    ? dataOrder.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : dataOrder
                  ).map(row => (
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
                        {' '}
                        {formatToRupiah(row.total_amount)}
                      </TableCell>
                      <TableCell className='tableCell'>
                        {row.payment_method}
                      </TableCell>
                      <TableCell className='tableCell'>
                        {row.status[0] === 'canceled' ? (
                          <span style={{ color: 'red' }}>Canceled</span>
                        ) : (
                          <button
                            className={`btn ${
                              row.status[0] === 'sold'
                                ? 'btn-outline-secondary btn-sm'
                                : 'btn-outline-success btn-sm'
                            }`}
                            onClick={() => handleConfirmStatus(row.id)}
                            disabled={
                              row.status[0] === 'sold' ||
                              row.status[0] === 'canceled'
                            }
                          >
                            {row.status[0] === 'sold' ? 'Sold' : 'Confirm'}
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component='div'
              count={dataOrder.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '200px' }}>
            <Box size='large'>
              <CircularProgress />
            </Box>
          </p>
        )}
      </div>
    </div>
  )
}

export default ListOrder
