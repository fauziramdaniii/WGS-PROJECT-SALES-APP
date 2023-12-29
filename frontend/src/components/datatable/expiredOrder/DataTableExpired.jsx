// DataTable.jsx
import React, { useState, useEffect } from 'react'
import './datatable.scss'

// Package Third-Party
import { DataGrid } from '@mui/x-data-grid'
import Swal from 'sweetalert2'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

// Import Module
import fetchTermCondition from './source'
import useSettingStores from '../../../stores/setting/useSettingStores'
import UpdateModalExpired from '../../modal/Setting/UpdateModalExpired'

const DataTableExpired = () => {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [updateOpenModal, setUpdateOpenModal] = useState(false)
  const [selectedExpired, setSelectedExpired] = useState(null)

  const { getExpiredOrder, updateExpiredOrder } = useSettingStores()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getExpiredOrder()
      const { expiredColoumns, expiredRows } = await fetchTermCondition(
        response
      )

      // Add unique ids to the rows, or set a specific id for error rows
      const userRowsNumber = expiredRows?.map((expired, index) => ({
        ...expired,
        id: expired.error ? `error_${index + 1}` : expired.id || index + 1,
        No: index + 1
      }))

      setColumns(expiredColoumns)
      setData(userRowsNumber)
    } catch (error) {
      // Handle the error, and set a specific id for the error row
      console.error('Error fetching categories:', error)
      setData([{ id: 'error', error: 'term is Already Exist' }])
    }
  }

  const openUpdateModal = term => {
    setSelectedExpired(term)
    setUpdateOpenModal(true)
  }

  const closeUpdateModal = () => {
    setSelectedExpired(null)
    setUpdateOpenModal(false)
  }

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateExpiredOrder(id, updatedData)
      const updatedRows = data.map(row =>
        row.id === id ? { ...row, ...updatedData } : row
      )
      setData(updatedRows)

      Swal.fire({
        title: 'Updated!',
        text: 'Your term has been updated.',
        icon: 'success'
      })
    } catch (error) {
      console.error('Error updating term:', error)
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
            onClick={() => openUpdateModal(params.row)}
          >
            Edit Expired Date Order
          </div>
        </div>
      )
    }
  ]

  return (
    <div className='datatable'>
      <div className='datatableTitle'>Expired Order Set</div>
      {data.length > 0 ? (
        <DataGrid
          className='datagrid'
          rows={data || []} // Pastikan data tidak bernilai undefined
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      ) : (
        <p style={{ textAlign: 'center', marginTop: '200px' }}>
          <Box size='large'>
            <CircularProgress />
          </Box>
        </p>
      )}
      <UpdateModalExpired
        isOpen={updateOpenModal}
        onClose={closeUpdateModal}
        onUpdate={handleUpdate}
        expiredOrder={selectedExpired}
      />
    </div>
  )
}

export default DataTableExpired
