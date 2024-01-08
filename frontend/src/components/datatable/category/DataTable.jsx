// DataTable.jsx
import React, { useState, useEffect } from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid'
import fetchCategory from './source'
import { Link } from 'react-router-dom'
import useCategoryStore from '../../../stores/category/CategoryStore'
import Swal from 'sweetalert2'
import AddModalCategory from '../../modal/category/AddModalCategory'
import UpdateModalCategory from '../../modal/category/UpdateModalCategory'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const DataTable = () => {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [addOpenModal, setAddOpenModal] = useState(false)
  const [updateOpenModal, setUpdateOpenModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const { getCategory, deleteCategory, createCategory, updateCategory } =
    useCategoryStore()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getCategory()
      const { categoryColoumn, categoryRows } = await fetchCategory(response)

      // Add unique ids to the rows, or set a specific id for error rows
      const userRowsNumber = categoryRows?.map((category, index) => ({
        ...category,
        id: category.error ? `error_${index + 1}` : category.id || index + 1,
        No: index + 1
      }))

      setColumns(categoryColoumn)
      setData(userRowsNumber)
    } catch (error) {
      // Handle the error, and set a specific id for the error row
      console.error('Error fetching categories:', error)
      setData([{ id: 'error', error: 'Category is Already Exist' }])
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
        await deleteCategory(id)
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

  const handleCreateCategory = async userData => {
    try {
      const response = await createCategory(userData)

      setData(prevData => [...prevData, response.data])
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const openModalCategory = () => {
    setAddOpenModal(true)
  }

  const closeModalCategory = () => {
    setAddOpenModal(false)
  }

  const openUpdateModal = category => {
    setSelectedCategory(category)
    setUpdateOpenModal(true)
  }

  const closeUpdateModal = () => {
    setSelectedCategory(null)
    setUpdateOpenModal(false)
  }

  const handleUpdate = async (id, updatedData, imageFile) => {
    try {
      const formData = new FormData()
      Object.keys(updatedData).forEach(key => {
        formData.append(key, updatedData[key])
      })

      if (imageFile) {
        formData.append('image', imageFile)
      }
      console.log(imageFile)
      console.log(formData)
      await updateCategory(id, formData)

      const updatedRows = data.map(row =>
        row.id === id ? { ...row, ...updatedData } : row
      )
      setData(updatedRows)

      Swal.fire({
        title: 'Updated!',
        text: 'Your category has been updated.',
        icon: 'success'
      })
    } catch (error) {
      console.error('Error updating category:', error)
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
        Add Category
        <button onClick={openModalCategory} className='link'>
          Add New
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
      <AddModalCategory
        isOpen={addOpenModal}
        onClose={closeModalCategory}
        onSubmit={handleCreateCategory}
      />
      <UpdateModalCategory
        isOpen={updateOpenModal}
        onClose={closeUpdateModal}
        onUpdate={handleUpdate}
        categoryData={selectedCategory}
      />
    </div>
  )
}

export default DataTable
