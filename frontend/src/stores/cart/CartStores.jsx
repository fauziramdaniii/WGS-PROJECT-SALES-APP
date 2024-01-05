import axios from 'axios'
import { addToCart } from '../../redux/action/action'

const API_URL = `${import.meta.env.VITE_API_URL}api`

const addToCartAsync = (productId, quantity) => {
  return async dispatch => {
    try {
      const userId = localStorage.getItem('id_user')

      if (!userId) {
        console.log('Authenticaded False')
      }

      const response = await axios.post(`${API_URL}/cart`, {
        id_user: parseInt(userId), // Pastikan mengonversi ke integer jika dibutuhkan
        id_product: parseInt(productId), // Pastikan mengonversi ke integer jika dibutuhkan
        quantity: parseInt(quantity) // Pastikan mengonversi ke integer jika dibutuhkan
      })

      dispatch(addToCart(response.data)) // Dispatch action ke reducer
    } catch (error) {
      console.error('Error adding to cart:', error.message)
      throw error
    }
  }
}

export default addToCartAsync
