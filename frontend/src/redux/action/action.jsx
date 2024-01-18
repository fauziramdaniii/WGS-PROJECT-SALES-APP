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
      throw error
    }
  }
}

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

const incrementItemQuantitySuccess = productId => ({
  type: 'INCREMENT_ITEM_QUANTITY',
  payload: productId
})

const incrementItemQuantityApi = productId => {
  return async dispatch => {
    try {
      const response = await axios.put(`${API_URL}/cart/increment/${productId}`)

      // Check if the API request was successful
      if (response.data.success) {
        // Dispatch the success action to update the state locally
        dispatch(incrementItemQuantitySuccess(productId))
        // Additionally, fetch the updated cart after successful increment
        dispatch(getCart())
      } else {
        throw new Error(
          response.data.error || 'Failed to increment item quantity'
        )
      }
    } catch (error) {
      console.error('Error incrementing item quantity:', error.message)
      // Dispatch the failure action to handle errors
      dispatch(incrementItemQuantityFailure(error.message))
    }
  }
}

const decrementItemQuantitySuccess = productId => ({
  type: 'DECREMENT_ITEM_QUANTITY',
  payload: productId
})

const decrementItemQuantityApi = productId => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const item = state.cart.cartItems.find(item => item.id === productId)

      if (item && item.quantity > 1) {
        // Make an API request to decrement the item quantity on the server
        const response = await axios.put(
          `${API_URL}/cart/decrement/${productId}`
        )

        // Check if the API request was successful
        if (response.data.success) {
          // Dispatch the success action to update the state locally
          dispatch(decrementItemQuantitySuccess(productId))
          // Additionally, fetch the updated cart after successful decrement
          dispatch(getCart())
        } else {
          throw new Error(
            response.data.error || 'Failed to decrement item quantity'
          )
        }
      } else if (item) {
        // If the quantity is already 1, remove the item from the cart
        const id_cart = item.id
        dispatch(removeFromCartApi(id_cart))
      }
    } catch (error) {
      console.error('Error decrementing item quantity:', error.message)
      // Dispatch the failure action to handle errors
      dispatch(decrementItemQuantityFailure(error.message))
    }
  }
}

const removeFromCartSuccess = productId => ({
  type: 'REMOVE_FROM_CART',
  payload: productId
})

const removeFromCartApi = id_cart => {
  return async dispatch => {
    try {
      // Make an API request to remove the item from the server
      const response = await axios.delete(`${API_URL}/cart/${id_cart}`)

      // Check if the API request was successful
      if (response.data.success) {
        // Dispatch the success action to update the state locally
        dispatch(removeFromCartSuccess(id_cart))
        // Additionally, fetch the updated cart after successful removal
        dispatch(getCart())
      } else {
        throw new Error(
          response.data.error || 'Failed to remove item from the cart'
        )
      }
    } catch (error) {
      console.error('Error removing from cart:', error.message)
      // Dispatch the failure action to handle errors
      dispatch(removeFromCartFailure(error.message))
    }
  }
}

export {
  addToCart,
  getCartSuccess,
  getCartFailure,
  getCart,
  incrementItemQuantitySuccess,
  incrementItemQuantityApi,
  decrementItemQuantitySuccess,
  decrementItemQuantityApi,
  removeFromCartApi
}
