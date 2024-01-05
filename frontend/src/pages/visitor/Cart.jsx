import React, { useState, useEffect } from 'react'
import Footer from '../../components/visitor/Footer'
import Navbar from '../../components/visitor/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import useTermAndConditionStores from '../../stores/termCondition/TermAndConditionStores'
import {
  getCart,
  incrementItemQuantity,
  decrementItemQuantity
} from '../../redux/action/action' // Import removeFromCart action

const Cart = () => {
  const { getTerm } = useTermAndConditionStores()
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.cartItems)
  // console.log(cartItems, 'di cart')
  const [localCartItems, setLocalCartItems] = useState([])

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  useEffect(() => {
    setLocalCartItems(cartItems)
  }, [cartItems])

  const removeItemFromLocalCart = productId => {
    setLocalCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    )
  }

  const EmptyCart = () => {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 py-5 bg-light text-center'>
            <h4 className='p-3 display-5'>Your Cart is Empty</h4>
            <Link to='/' className='btn  btn-outline-dark mx-4'>
              <i className='fa fa-arrow-left'></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const formatToRupiah = amount => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })
    return formatter.format(amount)
  }

  const collectAtStore = async () => {
    try {
      // Confirm order with SweetAlert
      const responseTerm = await getTerm()
      const termsAndConditions = responseTerm.data[0].content

      // Confirm order with SweetAlert
      const result = await Swal.fire({
        title: responseTerm.data[0].title,
        html: termsAndConditions,
        showCancelButton: true,
        confirmButtonText: 'Order',
        cancelButtonText: 'Next Time',
        width: '70%' // Set the width as needed
      })

      if (!result.isConfirmed) {
        return // If not confirmed, do nothing
      }

      // Send order to API
      const idUser = localStorage.getItem('id_user')
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}api/order`,
        {
          id_user: idUser,
          payment_method: 'cash',
          notes: 'Collect at Store'
        }
      )
      dispatch(getCart())

      console.log(response)
      if (response.status !== 201) {
        throw new Error('Failed to place order')
      }

      // Show success notification
      Swal.fire('Order Placed, Check Email For Invoice Booking!', '', 'success')
    } catch (error) {
      console.error('Error placing order:', error)
      // Handle error or dispatch an action to handle the error
      Swal.fire('Error', 'Failed to place order', 'error')
    }
  }

  const ShowCart = () => {
    const calculateTotal = item => {
      return item.quantity * (item.product?.price || 0)
    }

    const totalItems = localCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    )

    const subtotal = localCartItems.reduce(
      (total, item) => total + calculateTotal(item),
      0
    )

    const addItem = item => {
      dispatch(incrementItemQuantity(item.id))
    }

    const decrementItem = item => {
      dispatch(decrementItemQuantity(item.id))
      if (item.quantity === 1) {
        removeItemFromLocalCart(item.id)
      }
    }

    return (
      <>
        {/* Rest of the component remains the same */}
        <section className='h-100 gradient-custom'>
          <div className='container py-5'>
            <div className='row d-flex justify-content-center my-4'>
              <div className='col-md-8'>
                <div className='card mb-4'>
                  <div className='card-header py-3'>
                    <h5 className='mb-0'>Item List</h5>
                  </div>
                  <div className='card-body'>
                    {localCartItems.map(item => (
                      <div key={item.id}>
                        <div className='row d-flex align-items-center'>
                          <div className='col-lg-3 col-md-12'>
                            <div
                              className='bg-image rounded'
                              data-mdb-ripple-color='light'
                            >
                              <img
                                src={`${import.meta.env.VITE_API_URL}uploads/${
                                  item.product?.image || ''
                                }`}
                                alt={item.title}
                                style={{
                                  height: '200px',
                                  objectFit: 'cover'
                                }}
                              />
                            </div>
                          </div>
                          <div className='col-lg-5 col-md-6'></div>
                          <div className='col-lg-4 col-md-6'>
                            <p>
                              <strong>{item.product?.name || ''}</strong>
                            </p>
                            <div
                              className='d-flex mb-4'
                              style={{ maxWidth: '300px' }}
                            >
                              <button
                                className='btn px-3'
                                onClick={() => {
                                  decrementItem(item)
                                }}
                              >
                                <i className='fas fa-minus'></i>
                              </button>
                              <p className='mx-5'>{item.quantity}</p>
                              <button
                                className='btn px-3'
                                onClick={() => {
                                  addItem(item)
                                }}
                              >
                                <i className='fas fa-plus'></i>
                              </button>
                            </div>
                            <p className='text-start text-md-center'>
                              <strong>
                                <span className='text-muted'>
                                  {item.quantity}
                                </span>{' '}
                                x {formatToRupiah(item.product?.price || 0)}
                              </strong>
                            </p>
                            <li className='list-group-item align-items-center border-0 px-5 mb-2'>
                              <span>
                                <strong>
                                  {formatToRupiah(calculateTotal(item))}
                                </strong>
                              </span>
                            </li>
                          </div>
                        </div>
                        <hr className='my-4' />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card mb-4'>
                  <div className='card-header py-3 bg-light'>
                    <h5 className='mb-0'>Order Summary</h5>
                  </div>
                  <div className='card-body'>
                    <ul className='list-group list-group-flush'>
                      <li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0'>
                        Products ({totalItems})
                        <span>{formatToRupiah(Math.round(subtotal))}</span>
                      </li>
                      <li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3'>
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>
                            {formatToRupiah(Math.round(subtotal))}
                          </strong>
                        </span>
                      </li>
                    </ul>
                    <button
                      className='btn btn-dark btn-lg btn-block'
                      onClick={collectAtStore}
                    >
                      Collect at Store
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className='container my-3 py-3'>
        <h1 className='text-center'>Cart</h1>
        <hr />
        {cartItems.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  )
}

export default Cart
