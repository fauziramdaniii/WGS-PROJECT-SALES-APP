import React, { useEffect, useState } from 'react'
import Footer from '../../components/visitor/Footer'
import Navbar from '../../components/visitor/Navbar'
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

const Order = () => {
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

  return (
    <>
      <Navbar />
      <div className='container my-3 py-3'>
        <h1 className='text-center'>Order</h1>
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
      <Footer />
    </>
  )
}

export default Order
