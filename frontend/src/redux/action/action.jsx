import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}api`

const addToCartSuccess = product => ({
  type: 'ADD_TO_CART',
  payload: product
})

const getCartSuccess = cartItems => ({
  type: 'GET_CART_SUCCESS',
  payload: cartItems
})

const getCartFailure = error => ({
  type: 'GET_CART_FAILURE',
  payload: error
})

const addToCart = product => {
  return async (dispatch, getState) => {
    try {
      // Your existing logic to add item to the cart
      dispatch(addToCartSuccess(product))

      // Save the updated cart state to local storage
      const updatedCart = getState().cart.cartItems.length
      console.log(updatedCart)
    } catch (error) {
      console.error('Error adding to cart:', error.message)
      // Handle error, misalnya menampilkan notifikasi error kepada pengguna
    }
  }
}

const removeFromCartFailure = error => ({
  type: 'REMOVE_FROM_CART_FAILURE',
  payload: error
})

const getCart = () => {
  return async dispatch => {
    try {
      const id_user = localStorage.getItem('id_user')
      const response = await axios.get(`${API_URL}/cart/${id_user}`)
      if (response.data.success) {
        dispatch(getCartSuccess(response.data.data))
      } else {
        throw new Error(response.data.error || 'Failed to get cart')
      }
    } catch (error) {
      console.error('Error getting cart:', error.message)
      dispatch(getCartFailure(error.message))
    }
  }
}

const incrementItemQuantity = productId => ({
  type: 'INCREMENT_ITEM_QUANTITY',
  payload: productId
})

const decrementItemQuantity = productId => ({
  type: 'DECREMENT_ITEM_QUANTITY',
  payload: productId
})

export {
  addToCart,
  getCartSuccess,
  getCartFailure,
  getCart,
  incrementItemQuantity,
  decrementItemQuantity
}
