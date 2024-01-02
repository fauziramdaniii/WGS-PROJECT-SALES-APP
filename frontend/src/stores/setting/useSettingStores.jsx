import apiService from '../../utils/apiService'

const useSettingStores = () => {
  const getCanceledStatus = async () => {
    const response = await apiService.byGetData('api/config')
    return response
  }

  const updateCanceledStatus = async cancellationTimeoutDays => {
    const response = await apiService.byPutData(`api/config`, {
      cancellation_timeout_days: parseInt(cancellationTimeoutDays, 10)
    })
    console.log(response, 'api')
    return response
  }

  return {
    getCanceledStatus,
    updateCanceledStatus
  }
}

export default useSettingStores
