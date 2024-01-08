// CartStores.jsx
import axios from 'axios'
import { addToCart } from '../../redux/action/action'

const API_URL = `${import.meta.env.VITE_API_URL}api`

const addToCartAsync = (productId, quantity, userId) => {
  return async dispatch => {
    try {
      if (!userId) {
        console.log('Authenticated False')
        // Handle the case where the user is not authenticated
        return
      }

      const response = await axios.post(`${API_URL}/cart`, {
        id_user: parseInt(userId),
        id_product: parseInt(productId),
        quantity: parseInt(quantity)
      })

      console.log(response)
      dispatch(addToCart(response.data))
    } catch (error) {
      console.log('Error adding to cart:', error.message)
      throw error
    }
  }
}

export default addToCartAsync
