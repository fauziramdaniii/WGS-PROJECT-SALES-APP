// DataTable.jsx
import React, { useState, useEffect } from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid'
import fetchUserData from './source'
import { Link } from 'react-router-dom'
import useUserStore from '../../../stores/user/AddUserStore'
import Swal from 'sweetalert2'
import AddUserFormModal from '../../modal/user/AddUserFormModal'
import ResetPasswordModal from '../../modal/user/ResetPassword'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const DataTable = () => {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const { getUser, deleteUser, createUser } = useUserStore()
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false)
  const [selectedUserEmail, setSelectedUserEmail] = useState('')
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getUser()
      const { userColumns, userRows } = await fetchUserData(response)

      const userRowsNumber = userRows.map((user, index) => ({
        ...user,
        No: index + 1
      }))

      setColumns(userColumns)
      setData(userRowsNumber)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleDelete = async userId => {
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
        await deleteUser(userId)
        setData(prevData => prevData.filter(item => item.id !== userId))

        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success'
        })
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleCreateUser = async userData => {
    try {
      const response = await createUser(userData)

      setData(prevData => [...prevData, response.data])
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const handleOpenAddUserModal = () => {
    setIsAddUserModalOpen(true)
  }

  const handleCloseAddUserModal = () => {
    setIsAddUserModalOpen(false)
  }

  const handleResetPassword = email => {
    setSelectedUserEmail(email)
    setIsResetPasswordModalOpen(true)
  }

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 300,
      renderCell: params => (
        <div className='cellAction'>
          {/* <Link to='/superadmin/users/test' style={{ textDecoration: 'none' }}>
            <div className='viewButton'>View</div>
          </Link> */}
          <div
            className='deleteButton'
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </div>
          <div
            className='resetButton'
            onClick={() => handleResetPassword(params.row.email)}
          >
            Reset Password
          </div>
        </div>
      )
    }
  ]

  return (
    <div className='datatable'>
      <div className='datatableTitle'>
        Add New User
        <button onClick={handleOpenAddUserModal} className='link'>
          Add New
        </button>
      </div>
      {data.length > 0 ? (
        <DataGrid
          className='datagrid'
          rows={data}
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
      <AddUserFormModal
        isOpen={isAddUserModalOpen}
        onClose={handleCloseAddUserModal}
        onSubmit={handleCreateUser}
      />
      <ResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onClose={() => setIsResetPasswordModalOpen(false)}
        onResetPassword={email => {
          handleResetPassword(email)
          setIsResetPasswordModalOpen(false)
        }}
        initialEmail={selectedUserEmail} // Set nilai email awal di sini
      />
    </div>
  )
}

export default DataTable
