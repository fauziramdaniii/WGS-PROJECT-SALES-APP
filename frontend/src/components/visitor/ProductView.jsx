import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCart } from '../../redux/action/action'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { Link, useNavigate } from 'react-router-dom'

const Products = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState(data)
  const [loading, setLoading] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState({})
  let componentMounted = true

  const dispatch = useDispatch()
  const roles = localStorage.getItem('roles')
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('id_user')

  const navigate = useNavigate()

  const addProduct = product => {
    if (roles && token) {
      dispatch(addCart(product, userId, token))
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/products`
      )
      if (componentMounted) {
        const responseData = await response.json()
        setData(responseData)
        setFilter(responseData)
        setLoading(false)
      }

      return () => {
        componentMounted = false
      }
    }

    getProducts()
  }, [])

  // Fungsi untuk memformat angka sebagai mata uang Rupiah
  const formatToRupiah = amount => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })
    return formatter.format(amount)
  }

  const Loading = () => {
    return (
      <>
        <div className='col-12 py-5 text-center'>
          <Skeleton height={40} width={560} />
        </div>
        {[1, 2, 3, 4, 5, 6].map(index => (
          <div key={index} className='col-md-4 col-sm-6 col-xs-8 col-12 mb-4'>
            <Skeleton height={592} />
          </div>
        ))}
      </>
    )
  }

  const filterProduct = categoryId => {
    const updatedList = data.filter(item => item.id_category === categoryId)
    setFilter(updatedList)
  }

  // Function to toggle the display of full description
  const toggleDescription = productId => {
    setShowFullDescription(prevShowFullDescription => ({
      ...prevShowFullDescription,
      [productId]: !prevShowFullDescription[productId]
    }))
  }

  const ShowProducts = () => {
    return (
      <>
        {/* Your filter buttons go here */}
        <div className='buttons text-center py-5'>
          <button
            className='btn btn-outline-dark btn-sm m-2'
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className='btn btn-outline-dark btn-sm m-2'
            onClick={() => filterProduct(10)} // Replace 7 with the actual category ID
          >
            Shoes
          </button>
          <button
            className='btn btn-outline-dark btn-sm m-2'
            onClick={() => filterProduct(11)} // Replace 7 with the actual category ID
          >
            T-Shirt
          </button>
          <button
            className='btn btn-outline-dark btn-sm m-2'
            onClick={() => filterProduct(12)} // Replace 7 with the actual category ID
          >
            Hoddie
          </button>
        </div>
        {filter.map(product => (
          <div
            id={product.id}
            key={product.id}
            className='col-md-4 col-sm-6 col-xs-8 col-12 mb-4'
          >
            <div className='card text-center h-100' key={product.id}>
              <img
                className='card-img-top p-3'
                src={`${import.meta.env.VITE_API_URL}uploads/${product.image}`}
                alt='Card'
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <div className='card-body'>
                <h5 className='card-title'>{product.name}</h5>
                <p className='card-text'>
                  {
                    product.description.length > 50
                      ? // Show "More" button only for descriptions with more than 50 characters
                        showFullDescription[product.id]
                        ? product.description // Show full description
                        : `${product.description.slice(0, 70)}...` // Truncate description
                      : product.description // Show short description as is
                  }
                  {product.description.length > 50 && (
                    <button
                      className='btn btn-link btn-sm'
                      onClick={() => toggleDescription(product.id)}
                    >
                      {showFullDescription[product.id] ? 'Hide' : 'More'}
                    </button>
                  )}
                </p>
              </div>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item lead'>
                  {' '}
                  {formatToRupiah(product.price)}
                </li>
              </ul>
              <div className='card-body'>
                <Link
                  to={'/product/' + product.id}
                  className='btn btn-dark m-1'
                >
                  Buy Now
                </Link>
                <button
                  className='btn btn-dark m-1'
                  onClick={() => addProduct(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      <div className='container my-3 py-3'>
        <div className='row'>
          <div className='col-12'>
            <h2 className='display-5 text-center'>Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className='row justify-content-center'>
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  )
}

export default Products
