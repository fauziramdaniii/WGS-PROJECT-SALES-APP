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
import useTermAndConditionStores from '../../../stores/termCondition/TermAndConditionStores'
import AddModalTerm from '../../modal/termCondition/AddModalTerm'
import UpdateModalTerm from '../../modal/termCondition/UpdateModalTerm'

const DataTable = () => {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [addOpenModal, setAddOpenModal] = useState(false)
  const [updateOpenModal, setUpdateOpenModal] = useState(false)
  const [selectedTerm, setSelectedTerm] = useState(null)

  const { getTerm, createTerm, updateTerm, deleteTerm } =
    useTermAndConditionStores()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getTerm()
      const { termAndContditionColoumns, termAndConditionRows } =
        await fetchTermCondition(response)

      // Add unique ids to the rows, or set a specific id for error rows
      const userRowsNumber = termAndConditionRows?.map((term, index) => ({
        ...term,
        id: term.error ? `error_${index + 1}` : term.id || index + 1,
        No: index + 1
      }))

      setColumns(termAndContditionColoumns)
      setData(userRowsNumber)
    } catch (error) {
      // Handle the error, and set a specific id for the error row
      console.error('Error fetching categories:', error)
      setData([{ id: 'error', error: 'term is Already Exist' }])
    }
  }

  const handleDelete = async id => {
    try {
      const confirmDelete = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })

      if (confirmDelete.isConfirmed) {
        await deleteTerm(id)
        setData(prevData => prevData.filter(item => item.id !== id))

        Swal.fire({
          title: 'Deleted!',
          text: 'Your category has been deleted.',
          icon: 'success'
        })
      }
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  const handleCreateTerm = async userData => {
    try {
      const response = await createTerm(userData)

      setData(prevData => [...prevData, response.data])
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const openModalTerm = () => {
    setAddOpenModal(true)
  }

  const closeModalTerm = () => {
    setAddOpenModal(false)
  }

  const openUpdateModal = term => {
    setSelectedTerm(term)
    setUpdateOpenModal(true)
  }

  const closeUpdateModal = () => {
    setSelectedTerm(null)
    setUpdateOpenModal(false)
  }

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateTerm(id, updatedData)
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
          {/* <Link
            to={`/superadmin/users/${params.row.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div className='viewButton'>View</div>
          </Link> */}
          <div
            className='deleteButton'
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </div>
          <div
            className='deleteButton'
            onClick={() => openUpdateModal(params.row)}
          >
            Edit
          </div>
        </div>
      )
    }
  ]

  return (
    <div className='datatable'>
      <div className='datatableTitle'>
        Term And Condition
        <button onClick={openModalTerm} className='link'>
          Add New Term Condition
        </button>
      </div>
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
      <AddModalTerm
        isOpen={addOpenModal}
        onClose={closeModalTerm}
        onSubmit={handleCreateTerm}
      />
      <UpdateModalTerm
        isOpen={updateOpenModal}
        onClose={closeUpdateModal}
        onUpdate={handleUpdate}
        termData={selectedTerm}
      />
    </div>
  )
}

export default DataTable
