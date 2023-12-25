// For Add Item to Cart action.jsx
import addToCart from '../../stores/cart/CartStores'

const addCart = (product, userId, token) => {
  return async dispatch => {
    try {
      // Check the value of product before making the API call
      console.log('Product:', product)

      if (!product || !product.id) {
        throw new Error('Product ID is undefined')
      }

      const response = await addToCart(
        product.id,
        1, // Assuming quantity is always 1 for this example
        userId,
        token
      )

      console.log(response)
      dispatch({
        type: 'ADDITEM',
        payload: response.data // Assuming the response structure is correct
      })
    } catch (error) {
      console.error('Error adding item to cart:', error)
      // Handle error or dispatch an action to handle the error
    }
  }
}

// For Delete Item to Cart
const delCart = product => {
  return {
    type: 'DELITEM',
    payload: product
  }
}

export { addCart, delCart }
