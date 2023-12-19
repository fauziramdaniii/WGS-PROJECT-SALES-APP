// addUserStore
import apiService from '../../utils/apiService'

const useUserStore = () => {
  const getUser = async () => {
    try {
      const response = await apiService.byGetData('api/users')
      return response
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  const deleteUser = async id => {
    try {
      const response = await apiService.byDeleteData(`api/users/${id}`)
      return response
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }

  const createUser = async userData => {
    try {
      const response = await apiService.byPostData('api/users', userData)
      return response
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  const updateUser = async id => {
    try {
      const response = await apiService.byPutData(`api/users/${id}`)
      console.log(response)
      return response
    } catch (error) {
      console.error('Error Updating User:', error)
      throw error
    }
  }

  const resetPassword = async email => {
    try {
      const response = await apiService.byPostData('api/reset-password', {
        email
      })
      return response.data
    } catch (error) {
      console.error('Error resetting password:', error)
      throw error
    }
  }

  return { getUser, deleteUser, createUser, updateUser, resetPassword }
}

export default useUserStore
