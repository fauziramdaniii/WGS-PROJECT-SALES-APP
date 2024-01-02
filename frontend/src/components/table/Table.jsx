import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'
import useOrderStores from '../../stores/order/OrderStore'

const BasicTable = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5) // You can adjust the number of rows per page
  const { getOrder } = useOrderStores()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrder()
      setData(response.data)
    }

    fetchData()
  }, [getOrder])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const formatToRupiah = amount => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })
    return formatter.format(amount)
  }

  return (
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
              <TableCell className='tableCell'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map(row => (
              <TableRow key={row.id}>
                <TableCell className='tableCell'>{row.id}</TableCell>
                <TableCell className='tableCell'>
                  <div className='cellWrapper'>
                    <img
                      src={`${import.meta.env.VITE_API_URL}uploads/${
                        row.product.image
                      }`}
                      className='image'
                    />
                    {row.product.name}
                  </div>
                </TableCell>
                <TableCell className='tableCell'>{row.order_date}</TableCell>
                <TableCell className='tableCell'>
                  {formatToRupiah(row.total_amount)}
                </TableCell>
                <TableCell className='tableCell'>
                  {row.payment_method}
                </TableCell>
                <TableCell className='tableCell'>
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default BasicTable
