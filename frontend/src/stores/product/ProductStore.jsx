import apiService from '../../utils/apiService'

const useProductStore = () => {
  const getProduct = async () => {
    try {
      const response = await apiService.byGetData('api/products')
      return response
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  }

  const getProductId = async id => {
    try {
      const response = await apiService.byGetData('api/products/' + id)
      return response
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  }

  const deleteProduct = async id => {
    try {
      const response = await apiService.byDeleteData(`api/products/${id}`)
      return response
    } catch (error) {
      console.error('Error Deleting Product:', error)
      throw error
    }
  }

  const createProduct = async userData => {
    try {
      const response = await apiService.byPostData('api/products', userData)
      return response
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  const updateProduct = async (id, updatedData) => {
    try {
      const response = await apiService.byPutData(
        `api/products/${id}`,
        updatedData
      )

      return response
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  }

  return {
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductId
  }
}

export default useProductStore
