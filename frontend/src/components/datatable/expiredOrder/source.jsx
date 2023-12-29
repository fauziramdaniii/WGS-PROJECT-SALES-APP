import useSettingStores from '../../../stores/setting/useSettingStores'

const fetchTermCondition = async () => {
  const { getExpiredOrder } = useSettingStores()

  try {
    const response = await getExpiredOrder()
    const expired = response.data
    const expiredColoumns = [
      // Define your columns based on the structure of the data
      { field: 'No', headerName: 'No', width: 70 },
      { field: 'expiredOrder', headerName: 'Expired Order', width: 270 }
    ]

    const expiredRows = expired.map(expired => ({
      id: expired.id,
      ...expired
    }))
    console.log(expiredRows)
    return { expiredColoumns, expiredRows }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error // Rethrow the error to be caught by the calling component
  }
}

export default fetchTermCondition
