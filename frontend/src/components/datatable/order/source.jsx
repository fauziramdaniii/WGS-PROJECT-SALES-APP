import useOrderStores from '../../../stores/order/OrderStore'

const fetchOrder = async () => {
  const { getOrder, getOrderProduct } = useOrderStores()
  try {
    // get order
    const response = await getOrder()
    const orders = response.data
    console.log(orders, 'ini header')
    // get order detail
    const resProduct = await getOrderProduct()
    const orderProducts = resProduct.data

    console.log(orderProducts, 'ini detail')
    const orderColumnOrders = [
      { name: 'No', title: 'No', width: 70 },
      { name: 'id_user', title: 'id_user', width: 70 },
      { name: 'total_amount', title: 'Total', width: 70 },
      { name: 'payment_method', title: 'Payment', width: 70 },
      { name: 'total_quantity', title: 'Quantity', width: 70 }
    ]

    const orderColumnOrderDetails = [
      { name: 'No', title: 'No', width: 70 },
      { name: 'id_user', title: 'id_user', width: 70 },
      { name: 'image', title: 'Image', width: 70 }, // adjust columns as needed
      { name: 'order_date', title: 'Order Date', width: 70 },
      { name: 'status', title: 'Status', width: 70 },
      { name: 'price', title: 'Price', width: 70 }
    ]

    const orderRows = orders.map((order, index) => ({
      No: index + 1,
      id_user: order.id_user,
      payment_method: order.payment_method,
      total_amount: order.total_amount,
      total_quantity: order.total_quantity
    }))

    const orderDetailsRows = orders.map((order, index) => {
      const details = orderProducts.find(
        product => product.id === order.id_product
      )

      return {
        No: index + 1,
        id_user: order.id_user,
        image: details?.image || 'N/A', // handle the case where details are not found
        order_date: details?.order_date || 'N/A',
        status: details?.status || 'N/A',
        price: details?.price || 'N/A'
      }
    })

    return {
      orderColumnOrders,
      orderColumnOrderDetails,
      orderRows,
      orderDetailsRows
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
    throw error
  }
}

export default fetchOrder
