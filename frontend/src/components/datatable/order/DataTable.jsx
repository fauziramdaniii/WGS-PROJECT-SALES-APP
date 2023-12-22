// DataTable.jsx
import React, { useState, useEffect } from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid'
import fetchProduct from './source'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import useOrderStores from '../../../stores/order/OrderStore'

const DataTable = () => {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  const { getOrder } = useOrderStores()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getOrder()
      const res = response.data
      const { orderColoumns, orderRows } = await fetchProduct(res)

      // Add unique ids to the rows, or set a specific id for error rows
      const userRowsNumber = orderRows?.map((product, index) => ({
        ...product,
        id: product.error ? `error_${index + 1}` : product.id || index + 1,
        No: index + 1
      }))

      setColumns(orderColoumns)
      setData(userRowsNumber)
    } catch (error) {
      // Handle the error, and set a specific id for the error row
      console.error('Error fetching categories:', error)
      setData([{ id: 'error', error: 'Product is Already Exist' }])
    }
  }

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 300,
      renderCell: params => (
        <div className='cellAction'>
          <div
            className='deleteButton'
            onClick={() => handleStatusToSold(params.row.id)}
          >
            Confirm
          </div>
        </div>
      )
    }
  ]

  return (
    <div className='datatable'>
      {/* <div className='datatableTitle'>
        Add Product
        <button className='link'>Add New</button>
      </div> */}
      <DataGrid
        className='datagrid'
        rows={data || []} // Pastikan data tidak bernilai undefined
        columns={columns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}

export default DataTable
