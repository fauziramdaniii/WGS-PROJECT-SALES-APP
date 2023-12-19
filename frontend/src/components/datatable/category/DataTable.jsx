// DataTable.jsx
import React, { useState, useEffect } from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid'
import fetchCategory from './source'
import { Link } from 'react-router-dom'
import useCategoryStore from '../../../stores/category/CategoryStore'
import Swal from 'sweetalert2'
import AddModalCategory from '../../modal/category/AddModalCategory'

const DataTable = () => {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [addOpenModal, setAddOpenModal] = useState(false)

  const { getCategory, deleteCategory, createCategory } = useCategoryStore()

  useEffect(() => {
    fetchData()
  }, [getCategory])

  const fetchData = async () => {
    try {
      const response = await getCategory()
      const { categoryColoumn, categoryRows } = await fetchCategory(response)

      const userRowsNumber = categoryRows?.map((category, index) => ({
        ...category,
        No: index + 1
      }))

      setColumns(categoryColoumn)
      setData(userRowsNumber)
    } catch (error) {
      console.error('Error fetching categories:', error)
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

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 300,
      renderCell: params => (
        <div className='cellAction'>
          <Link
            to={`/superadmin/users/${params.row.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div className='viewButton'>View</div>
          </Link>
          <div
            className='deleteButton'
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
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
          rows={data}
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      ) : (
        <p>Loading...</p>
      )}
      <AddModalCategory
        isOpen={addOpenModal}
        onClose={closeModalCategory}
        onSubmit={handleCreateCategory}
      />
    </div>
  )
}

export default DataTable
