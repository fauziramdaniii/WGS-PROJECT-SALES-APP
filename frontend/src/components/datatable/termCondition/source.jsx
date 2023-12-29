import useTermAndConditionStores from '../../../stores/termCondition/TermAndConditionStores'

const fetchTermCondition = async () => {
  const { getTerm } = useTermAndConditionStores()

  try {
    const response = await getTerm()
    const termAndConditions = response.data
    console.log(termAndConditions, 'test')
    const termAndContditionColoumns = [
      // Define your columns based on the structure of the data
      { field: 'No', headerName: 'No', width: 70 },
      { field: 'title', headerName: 'Title', width: 270 },
      {
        field: 'content',
        headerName: 'Content',
        width: 270
      }
    ]

    const termAndConditionRows = termAndConditions.map(termCondition => ({
      id: termCondition.id,
      ...termCondition
    }))
    console.log(termAndConditionRows)
    return { termAndContditionColoumns, termAndConditionRows }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error // Rethrow the error to be caught by the calling component
  }
}

export default fetchTermCondition
