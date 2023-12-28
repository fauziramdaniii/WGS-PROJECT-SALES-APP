import apiService from '../../utils/apiService'

const useTermAndConditionStores = () => {
  const getTerm = async () => {
    try {
      const response = await apiService.byGetData('api/term-conditions')
      return response
    } catch (error) {
      console.error('Error fetching term:', error)
      throw error
    }
  }

  const getTermById = async id => {
    try {
      const response = await apiService.byGetData('api/term-conditions/' + id)
      return response
    } catch (error) {
      console.error('Error fetching term:', error)
      throw error
    }
  }

  const createTerm = async userData => {
    try {
      const response = await apiService.byPostData(
        'api/term-conditions',
        userData
      )
      return response
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  const updateTerm = async (id, updatedData) => {
    try {
      const response = await apiService.byPutData(
        `api/term-conditions/${id}`,
        updatedData
      )

      return response
    } catch (error) {
      console.error('Error updating term:', error)
      throw error
    }
  }

  const deleteTerm = async id => {
    try {
      const response = await apiService.byDeleteData(
        `api/term-conditions/${id}`
      )
      return response
    } catch (error) {
      console.error('Error Deleting term:', error)
      throw error
    }
  }

  return {
    getTerm,
    getTermById,
    createTerm,
    updateTerm,
    deleteTerm
  }
}

export default useTermAndConditionStores
