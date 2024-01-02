import apiService from '../utils/apiService'

const getDashboard = async () => {
  try {
    const response = await apiService.byGetData('api/dashboard')
    return response.data
  } catch (error) {}
}

export default getDashboard
