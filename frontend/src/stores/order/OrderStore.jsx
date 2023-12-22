import apiService from '../../utils/apiService'

const useOrderStores = () => {
  const getOrder = async () => {
    try {
      const response = await apiService.byGetData('api/order')
      // console.log(response)
      return response
    } catch (error) {
      console.error('Error fetching Order:', error)
      throw error
    }
  }

  return { getOrder }
}

export default useOrderStores
