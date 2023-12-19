// useCategoryStore

import apiService from '../../utils/apiService'

const useCategoryStore = () => {
  const getCategory = async () => {
    try {
      const response = await apiService.byGetData('api/category')
      console.log(response)
      return response
    } catch (error) {
      console.error('Error fetching category:', error)
      throw error
    }
  }

  const deleteCategory = async id => {
    try {
      const response = await apiService.byDeleteData(`api/category/${id}`)
      return response
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }

  const createCategory = async userData => {
    try {
      const response = await apiService.byPostData('api/category', userData)
      return response
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  const updateCategory = async id => {
    try {
      const response = await apiService.byPutData(`api/category/${id}`)
      console.log(response)
      return response
    } catch (error) {
      console.error('Error Updating User:', error)
      throw error
    }
  }

  return {
    getCategory,
    deleteCategory,
    createCategory,
    updateCategory
  }
}

export default useCategoryStore
