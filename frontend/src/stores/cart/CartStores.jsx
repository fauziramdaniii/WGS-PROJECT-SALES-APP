// cartService.js
const API_URL = 'http://localhost:3000/api'

const addToCart = async (productId, quantity, userId, token) => {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        id_product: productId,
        quantity,
        id_user: userId
      })
    })

    if (!response.ok) {
      throw new Error('Failed to add item to cart')
    }

    return response.json()
  } catch (error) {
    console.error('Error adding item to cart:', error)
    throw error
  }
}

export default addToCart
