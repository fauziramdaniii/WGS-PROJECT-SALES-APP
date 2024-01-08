import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import addToCartAsync from '../../stores/cart/CartStores'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { getCart } from '../../redux/action/action'
const Products = () => {
  const { id: categoryId } = useParams()

  const [data, setData] = useState([])
  const [filter, setFilter] = useState(data)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState({})
  const cartItems = useSelector(state => state.cart.cartItems)
  // console.log(cartItems, 'di product')

  let componentMounted = true

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  const navigate = useNavigate()

  const handleAddToCart = async (productId, quantity) => {
    try {
      const id_user = localStorage.getItem('id_user')
      const roles = localStorage.getItem('roles')
      const token = localStorage.getItem('token')

      if (!id_user || !roles || !token) {
        console.error(
          'User is not authenticated or missing necessary information.'
        )
        navigate('/login')
        return
      }

      await dispatch(addToCartAsync(productId, quantity, id_user))
      dispatch(getCart())

      Swal.fire({
        title: 'Add!',
        text: 'Success Add To Cart',
        icon: 'success',
        timer: 1200
      })
    } catch (error) {
      console.error('Error adding to cart:', error.message)

      if (error.response && error.response.status === 400) {
        // Handle 400 Bad Request errors (e.g., insufficient stock)
        Swal.fire({
          title: 'Error',
          text: error.response.data.error || 'Failed to add to cart',
          icon: 'error',
          timer: 2000
        })
      } else {
        // Handle other errors
        Swal.fire({
          title: 'Error',
          text: 'Failed to add to cart',
          icon: 'error',
          timer: 3500
        })
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      // Fetch products
      const productsResponse = await fetch(
        `${import.meta.env.VITE_API_URL}api/products`
      )
      const productsData = await productsResponse.json()
      setData(productsData)

      // Fetch categories
      const categoriesResponse = await fetch(
        `${import.meta.env.VITE_API_URL}api/category`
      )
      const categoriesData = await categoriesResponse.json()
      setCategories(categoriesData)

      setLoading(false)
    }

    fetchData()
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

  useEffect(() => {
    // Update the filter when the category ID changes
    if (categoryId) {
      const updatedList = data.filter(
        item => item.id_category === parseInt(categoryId) && item.stock > 0
      )
      setFilter(updatedList)
    } else {
      // If no category ID is provided, show all products
      setFilter(data)
    }
  }, [categoryId, data])

  const filterProduct = categoryId => {
    setFilter(
      data.filter(item => item.id_category === categoryId && item.stock > 0)
    )
    navigate(`/category/${categoryId}`)
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
            onClick={() => navigate('/category')}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              className={`btn btn-outline-dark btn-sm m-2 ${
                parseInt(categoryId) === category.id ? 'active' : ''
              }`}
              onClick={() => filterProduct(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        {filter.map(product =>
          product.stock > 0 ? (
            <div
              id={product.id}
              key={product.id}
              className='col-md-4 col-sm-6 col-xs-8 col-12 mb-4'
            >
              <div className='card text-center h-100' key={product.id}>
                <img
                  className='card-img-top p-3'
                  src={`${import.meta.env.VITE_API_URL}uploads/${
                    product.image
                  }`}
                  alt='Card'
                  style={{ height: '400px', objectFit: 'cover' }}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{product.name}</h5>
                  <p className='card-text'>
                    {product.description.length > 50
                      ? showFullDescription[product.id]
                        ? product.description
                        : `${product.description.slice(0, 70)}...`
                      : product.description}
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
                    onClick={() => handleAddToCart(product.id, 1)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              id={product.id}
              key={product.id}
              className='col-md-4 col-sm-6 col-xs-8 col-12 mb-4'
            >
              <div className='card text-center h-100' key={product.id}>
                <img
                  className='card-img-top p-3'
                  src={`${import.meta.env.VITE_API_URL}uploads/${
                    product.image
                  }`}
                  alt='Card'
                  style={{ height: '400px', objectFit: 'cover' }}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{product.name}</h5>
                  <p className='card-text'>
                    {product.description.length > 50
                      ? showFullDescription[product.id]
                        ? product.description
                        : `${product.description.slice(0, 70)}...`
                      : product.description}
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
                    {formatToRupiah(product.price)}
                  </li>
                </ul>
                <div className='card-body'>
                  <button className='btn btn-danger m-1' disabled>
                    Out Of Stock
                  </button>
                </div>
              </div>
            </div>
          )
        )}
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
