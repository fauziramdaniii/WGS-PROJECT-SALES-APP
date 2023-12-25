import apiService from '../../utils/apiService'

const useOrderStores = () => {
  const getOrder = async () => {
    try {
      const response = await apiService.byGetData('api/order')
      return response.data
    } catch (error) {
      console.error('Error fetching Order:', error)
      throw error
    }
  }

  const getOrderProduct = async () => {
    try {
      const response = await apiService.byGetData('api/order/product')
      return response.data
    } catch (error) {
      console.error('Error fetching Order:', error)
      throw error
    }
  }

  return { getOrder, getOrderProduct }
}

export default useOrderStores
