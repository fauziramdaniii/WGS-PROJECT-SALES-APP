import apiService from '../../utils/apiService'
const useLogStores = () => {
  const getLog = async () => {
    const response = await apiService.byGetData('api/log')
    // console.log(response)
    return response
  }

  return {
    getLog
  }
}

export default useLogStores
