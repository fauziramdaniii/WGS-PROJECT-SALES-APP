// DataTable.jsx
import React, { useState, useEffect } from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid'
import fetchProduct from './source'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import useProductStore from '../../../stores/product/ProductStore'
import AddModalProduct from '../../modal/product/AddModalProduct'
import UpdateModalProduct from '../../modal/product/UpdateModalProduct'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const DataTable = () => {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [addOpenModal, setAddOpenModal] = useState(false)
  const [updateOpenModal, setUpdateOpenModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const { getProduct, deleteProduct, updateProduct, createProduct } =
    useProductStore()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getProduct()
      const { productColoumn, productRows } = await fetchProduct(response)

      // Add unique ids to the rows, or set a specific id for error rows
      const userRowsNumber = productRows?.map((product, index) => ({
        ...product,
        id: product.error ? `error_${index + 1}` : product.id || index + 1,
        No: index + 1
      }))

      setColumns(productColoumn)
      setData(userRowsNumber)
    } catch (error) {
      // Handle the error, and set a specific id for the error row
      console.error('Error fetching categories:', error)
      setData([{ id: 'error', error: 'Product is Already Exist' }])
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
        await deleteProduct(id)
        setData(prevData => prevData.filter(item => item.id !== id))

        Swal.fire({
          title: 'Deleted!',
          text: 'Your Product has been deleted.',
          icon: 'success'
        })
      }
    } catch (error) {
      console.error('Error deleting Product:', error)
    }
  }

  const handleCreateProduct = async userData => {
    try {
      const response = await createProduct(userData)

      setData(prevData => [...prevData, response.data])
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const openModalProduct = () => {
    setAddOpenModal(true)
  }

  const closeModalProduct = () => {
    setAddOpenModal(false)
  }

  const openUpdateModal = product => {
    setSelectedProduct(product)
    setUpdateOpenModal(true)
  }

  const closeUpdateModal = () => {
    setSelectedProduct(null)
    setUpdateOpenModal(false)
  }

  const handleUpdate = async (id, updatedData, imageFile) => {
    try {
      // Create a FormData object to handle both text and file data
      const formData = new FormData()

      // Append text data
      Object.keys(updatedData).forEach(key => {
        formData.append(key, updatedData[key])
      })

      // Append the image file if it exists
      if (imageFile) {
        formData.append('image', imageFile)
      }

      await updateProduct(id, formData) // Pass the FormData object to the updateProduct function

      const updatedRows = data.map(row =>
        row.id === id ? { ...row, ...updatedData } : row
      )
      setData(updatedRows)

      Swal.fire({
        title: 'Updated!',
        text: 'Your product has been updated.',
        icon: 'success'
      })
    } catch (error) {
      console.error('Error updating product:', error)
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
            className='updateButton'
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
        Add Product
        <button onClick={openModalProduct} className='link'>
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
      <AddModalProduct
        isOpen={addOpenModal}
        onClose={closeModalProduct}
        onSubmit={handleCreateProduct}
      />
      <UpdateModalProduct
        isOpen={updateOpenModal}
        onClose={closeUpdateModal}
        onUpdate={handleUpdate}
        productData={selectedProduct}
      />
    </div>
  )
}

export default DataTable
