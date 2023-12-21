import useProductStore from '../../../stores/product/ProductStore'

const fetchProduct = async () => {
  const { getProduct } = useProductStore()

  try {
    const response = await getProduct()
    const products = response.data
    const productColoumn = [
      // Define your columns based on the structure of the data
      { field: 'No', headerName: 'No', width: 70 },
      { field: 'name', headerName: 'Name', width: 120 },
      { field: 'price', headerName: 'Price', width: 120 },
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
      },
      { field: 'description', headerName: 'Description', width: 120 },
      { field: 'stock', headerName: 'Stock', width: 120 },
      {
        field: 'category',
        headerName: 'Category',
        valueGetter: params => {
          if (params.row.category) {
            return params.row.category.name
          } else {
            return 'N/A'
          }
        }
      }
    ]

    const productRows = products.map((product, index) => ({
      id: product.id,
      No: index + 1,
      ...product
    }))

    console.log(productRows)
    return { productColoumn, productRows }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error // Rethrow the error to be caught by the calling component
  }
}

export default fetchProduct
