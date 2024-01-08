import apiService from '../../utils/apiService'

const useTermAndConditionStores = () => {
  const getTerm = async () => {
    try {
      const response = await apiService.byGetData('api/term-conditions')
      console.log('getTerm response:', response)
      return response
    } catch (error) {
      console.error('Error fetching term:', error)
      throw error
    }
  }

  const updateTerm = async (id, updatedData) => {
    try {
      const response = await apiService.byPutData(
        `api/term-conditions/${id}`,
        updatedData
      )
      console.log('updateTerm response:', response)
      return response
    } catch (error) {
      console.error('Error updating term:', error)
      throw error
    }
  }

  return {
    getTerm,
    updateTerm
  }
}

export default useTermAndConditionStores
