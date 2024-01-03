import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link, useParams } from 'react-router-dom'
// import Marquee from 'react-fast-marquee'
import Footer from '../../components/visitor/Footer'
import Navbar from '../../components/visitor/Navbar'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import addToCartAsync from '../../stores/cart/CartStores'

const Product = () => {
  const { id } = useParams()
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState({})

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true)

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/products/${id}`
        )
        console.log(response)

        const data = await response.data
        console.log(data, 'apa nich')
        setProduct(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching product data:', error)
      }
    }

    getProduct()
  }, [id])

  const toggleDescription = productId => {
    setShowFullDescription(prevShowFullDescription => ({
      ...prevShowFullDescription,
      [productId]: !prevShowFullDescription[productId]
    }))
  }

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
        <div className='container my-5 py-2'>
          <div className='row'>
            <div className='col-md-6 py-3'>
              <Skeleton height={400} width={400} />
            </div>
            <div className='col-md-6 py-5'>
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className='mx-3' height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    )
  }

  const ShowProduct = () => {
    return (
      <>
        <div className='container my-5 py-2'>
          <div className='row'>
            <div className='col-md-6 col-sm-12 py-3'>
              <img
                className='img-fluid'
                srcSet={`${import.meta.env.VITE_API_URL}uploads/${
                  product.image
                }`}
                alt={product.name}
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </div>
            <div className='col-md-6 col-md-6 py-5'>
              <h4 className='text-uppercase text-muted'>{product.category}</h4>
              <h6 className='display-6'>{product.name}</h6>
              <h1 className='display-5 my-4 font-weight-bold text-uppercase'>
                {formatToRupiah(product.price)}
              </h1>
              <p className='card-text'>
                {
                  product.description &&
                    (product.description.length > 50
                      ? // Show "More" button only for descriptions with more than 50 characters
                        showFullDescription[product.id]
                        ? product.description // Show full description
                        : `${product.description.slice(0, 70)}...` // Truncate description
                      : product.description) // Show short description as is
                }
                {product.description && product.description.length > 50 && (
                  <button
                    className='btn btn-link btn-sm'
                    onClick={() => toggleDescription(product.id)}
                  >
                    {showFullDescription[product.id] ? 'Hide' : 'More'}
                  </button>
                )}
              </p>
              <div className='my-3'>
                {product.stock > 0 ? (
                  product.stock < 5 ? (
                    <span className='text-danger'>
                      Only {product.stock} Left in Stock
                    </span>
                  ) : (
                    <span className='text-success'>
                      ({product.stock} Stock Available)
                    </span>
                  )
                ) : (
                  <span className='text-danger'>Out of Stock</span>
                )}
              </div>

              <button
                className='btn btn-outline-dark'
                onClick={() => handleAddToCart(product.id, 1)}
                disabled={product.stock <= 0}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <Link to='/cart' className='btn btn-dark mx-3'>
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  const dispatch = useDispatch()

  const handleAddToCart = async (productId, quantity) => {
    try {
      const id_user = localStorage.getItem('id_user')
      if (!id_user) {
        // Handle case where user is not authenticated or id_user is not available
        console.error('User is not authenticated or id_user is not available.')
        return
      }

      await dispatch(addToCartAsync(productId, quantity, id_user))
      console.log('Product added to cart successfully')
      // Tambahkan logika atau notifikasi sesuai kebutuhan
    } catch (error) {
      console.error('Error adding to cart:', error.message)
      // Handle error, misalnya menampilkan notifikasi error kepada pengguna
    }
  }

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='row'>{loading ? <Loading /> : <ShowProduct />}</div>
      </div>
      <Footer />
    </>
  )
}

export default Product
