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
      },
      {
        field: 'image',
        headerName: 'Image',
        width: 120,
        renderCell: params => (
          <img
            src={`${import.meta.env.VITE_API_URL}uploads/${params.value}`}
            alt={params.value}
            style={{ width: '50px', height: '50px', borderRadius: '50%' }} // Adjust the size as needed
          />
        )
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
