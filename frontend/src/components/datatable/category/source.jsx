import useCategoryStore from '../../../stores/category/CategoryStore'

const fetchCategory = async () => {
  const { getCategory } = useCategoryStore()

  try {
    const response = await getCategory()
    const categories = response.data
    const categoryColoumn = [
      // Define your columns based on the structure of the data
      { field: 'No', headerName: 'No', width: 70 },
      {
        field: 'name',
        headerName: 'Name',
        width: 150
      }
    ]

    const categoryRows = categories.map(category => ({
      id: category.id,
      ...category
    }))
    console.log(categoryRows)
    return { categoryColoumn, categoryRows }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error // Rethrow the error to be caught by the calling component
  }
}

export default fetchCategory
