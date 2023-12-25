import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail
} from '@devexpress/dx-react-grid-material-ui'
import { RowDetailState } from '@devexpress/dx-react-grid'
import useOrderStores from '../../../stores/order/OrderStore'
import fetchOrder from './source'

const DataTable = () => {
  const [dataOrder, setDataOrder] = useState([])
  const [columnsOrders, setColumnOrders] = useState([])
  const [dataOrderDetails, setDataOrderDetails] = useState([])
  const [columnOrderDetails, setColumnOrderDetails] = useState([])
  const { getOrder, getOrderProduct } = useOrderStores()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getOrder()
      const res = response.data
      const resProduct = await getOrderProduct()
      const resProductForDetailOrder = resProduct.data

      const {
        orderColumnOrders,
        orderColumnOrderDetails,
        orderRows,
        orderDetailsRows
      } = await fetchOrder(res, resProductForDetailOrder)

      const userRowOrders = orderRows?.map((order, index) => ({
        ...order,
        id: order.error ? `error_${index + 1}` : order.id || index + 1,
        No: index + 1
      }))

      const userRowNumberOrderDetail = orderDetailsRows?.map(
        (order, index) => ({
          ...order,
          id: order.error ? `error_${index + 1}` : order.id || index + 1,
          No: index + 1
        })
      )

      setColumnOrders(orderColumnOrders)
      setDataOrder(userRowOrders)

      setColumnOrderDetails(orderColumnOrderDetails)
      setDataOrderDetails(userRowNumberOrderDetail)
    } catch (error) {
      console.error('Error fetching orders:', error)
      setDataOrder([
        { id: 'error', error: 'Order data could not be retrieved' }
      ])
      setDataOrderDetails([
        { id: 'error', error: 'Order data could not be retrieved' }
      ])
    }
  }

  return (
    <Paper>
      <Grid rows={dataOrder} columns={columnsOrders}>
        <Table />
        <TableHeaderRow />
        <RowDetailState />
        <TableRowDetail
          contentComponent={({ row }) => (
            <div>
              <p>ID: {row.id}</p>
              {/* Add other details as needed */}
            </div>
          )}
        />
      </Grid>
    </Paper>
  )
}

export default DataTable
