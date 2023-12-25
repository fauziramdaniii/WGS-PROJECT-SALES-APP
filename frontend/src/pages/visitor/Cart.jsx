import React from 'react'
import Footer from '../../components/visitor/Footer'
import Navbar from '../../components/visitor/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { addCart, delCart } from '../../redux/action/action'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
const Cart = () => {
  const state = useSelector(state => state.handleCart)
  console.log(state)
  const dispatch = useDispatch()

  const EmptyCart = () => {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 py-5 bg-light text-center'>
            <h4 className='p-3 display-5'>Your Cart is Empty</h4>
            <Link to='/' className='btn  btn-outline-dark mx-4'>
              <i className='fa fa-arrow-left'></i> Continue Shopping
            </Link>
            <Link to='/order' className='btn btn-outline-dark mx-4'>
              See My Order <i className='fa fa-arrow-right'></i>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const addItem = product => {
    dispatch(addCart(product))
    console.log(product)
  }

  const removeItem = product => {
    dispatch(delCart(product))
  }

  const collectAtStore = async () => {
    try {
      // Confirm order with SweetAlert
      const result = await Swal.fire({
        title: 'Do you want to place the order?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        icon: 'question'
      })

      if (!result.isConfirmed) {
        return // If not confirmed, do nothing
      }

      // Send order to API
      const response = await axios.post('http://localhost:3000/api/order', {
        id_user: 2,
        id_product: state[0].cart.id_product,
        quantity: state[0].qty,
        payment_method: 'cash',
        notes: 'Collect at Store'
      })

      console.log(response)
      if (response.status !== 201) {
        throw new Error('Failed to place order')
      }

      // Remove items from the cart after a successful order
      state.forEach(item => {
        dispatch(delCart(item))
      })

      // Show success notification
      Swal.fire('Order Placed!', '', 'success')
    } catch (error) {
      console.error('Error placing order:', error)
      // Handle error or dispatch an action to handle the error
      Swal.fire('Error', 'Failed to place order', 'error')
    }
  }

  const ShowCart = () => {
    let subtotal = 0
    let totalItems = 0

    state.forEach(item => {
      subtotal += item.product.price * item.qty
      totalItems += item.qty
    })

    return (
      <>
        <section className='h-100 gradient-custom'>
          <div className='container py-5'>
            <div className='row d-flex justify-content-center my-4'>
              <div className='col-md-8'>
                <div className='card mb-4'>
                  <div className='card-header py-3'>
                    <h5 className='mb-0'>Item List</h5>
                  </div>
                  <div className='card-body'>
                    {state.map(item => (
                      <div key={item.id}>
                        <div className='row d-flex align-items-center'>
                          <div className='col-lg-3 col-md-12'>
                            <div
                              className='bg-image rounded'
                              data-mdb-ripple-color='light'
                            >
                              <img
                                src={`${import.meta.env.VITE_API_URL}uploads/${
                                  item.product.image
                                }`}
                                alt={item.title}
                                style={{
                                  height: '400px',
                                  objectFit: 'cover'
                                }}
                              />
                            </div>
                          </div>
                          <div className='col-lg-5 col-md-6'></div>
                          <div className='col-lg-4 col-md-6'>
                            <p>
                              <strong>{item.product.name}</strong>
                            </p>
                            <div
                              className='d-flex mb-4'
                              style={{ maxWidth: '300px' }}
                            >
                              <button
                                className='btn px-3'
                                onClick={() => {
                                  removeItem(item)
                                }}
                              >
                                <i className='fas fa-minus'></i>
                              </button>
                              <p className='mx-5'>{item.qty}</p>
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
                                <span className='text-muted'>{item.qty}</span> x
                                Rp. {item.product.price}
                              </strong>
                            </p>
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
                        <span>Rp. {Math.round(subtotal)}</span>
                      </li>
                      <li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3'>
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>Rp. {Math.round(subtotal)}</strong>
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
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  )
}

export default Cart
