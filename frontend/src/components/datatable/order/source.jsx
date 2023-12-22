import useOrderStores from '../../../stores/order/OrderStore'

const fetchOrder = async () => {
  const { getOrder } = useOrderStores()

  try {
    const response = await getOrder()
    const orders = response.data.data
    // console.log(orders)
    const orderColoumns = [
      { field: 'No', headerName: 'No', width: 70 },
      { field: 'id_user', headerName: 'id_user', width: 70 },
      { field: 'order_date', headerName: 'Order Date', width: 70 },
      { field: 'quantity', headerName: 'Quantity', width: 70 },
      { field: 'status', headerName: 'Status', width: 70 },
      { field: 'image', headerName: 'Image', width: 70 },
      { field: 'price', headerName: 'Price', width: 70 },
      { field: 'payment_method', headerName: 'Payment', width: 70 },
      { field: 'total_amount', headerName: 'Total', width: 70 },
      { field: 'product', headerName: 'Product', width: 70 }
    ]

    const orderRows = orders.map((order, index) => ({
      id: order.id,
      No: index + 1,
      id_user: order.id_user,
      order_date: order.order_date,
      quantity: order.quantity,
      status: order.status,
      total_amount: order.total_amount,
      payment_method: order.payment_method,
      product: order.product.name,
      image: order.product.image,
      price: order.product.price
    }))

    console.log(orderRows)
    return { orderColoumns, orderRows }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error // Rethrow the error to be caught by the calling component
  }
}

export default fetchOrder
