// fetchLog.js
import useLogStores from '../../../stores/log/LogActivity'

const fetchLog = async () => {
  const { getLog } = useLogStores()

  try {
    const response = await getLog()
    const logData = response.data

    const columns = [
      { field: 'No', headerName: 'No', width: 70 },
      { field: 'user', headerName: 'id_user', width: 150 },
      { field: 'activityType', headerName: 'Activity', width: 150 },
      { field: 'status', headerName: 'status', width: 150 },
      { field: 'timestamp', headerName: 'Time', width: 220 },
      { field: 'ipAddress', headerName: 'IP Address', width: 170 }
    ]

    const rows = logData.map((logItem, index) => ({
      id: logItem.id,
      No: index + 1,
      ...logItem
    }))

    return { columns, rows }
  } catch (error) {
    console.error('Error fetching log data:', error)
    throw error
  }
}

export default fetchLog
