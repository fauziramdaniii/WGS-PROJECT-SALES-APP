import apiService from '../../utils/apiService'

const useSettingStores = () => {
  const getExpiredOrder = async () => {
    const response = await apiService.byGetData('api/expired-order')
    return response
  }
  const updateExpiredOrder = async id => {
    const response = await apiService.byPutData(`api/expired-order/${id}`)
    return response
  }

  return {
    getExpiredOrder,
    updateExpiredOrder
  }
}

export default useSettingStores
