import excludeVariablesFromRoot from '@mui/material/styles/excludeVariablesFromRoot'

// handle cart
const cart = []

const handleCart = (state = cart, action) => {
  const product = action.payload
  switch (action.type) {
    case 'ADDITEM':
      console.log('Handling ADDITEM action:', action.payload)

      const existingProductIndex = state.findIndex(x => x.id === product.id)

      if (existingProductIndex !== -1) {
        // If product already exists in the cart, update quantity
        return state.map((item, index) =>
          index === existingProductIndex ? { ...item, qty: item.qty + 1 } : item
        )
      } else {
        // If product doesn't exist, add it to the cart
        return [...state, { ...product, qty: 1 }]
      }
      break
    case 'DELITEM':
      const exist2 = state.find(x => x.id === product.id)
      if (exist2.qty === 1) {
        return state.filter(x => x.id !== exist2.id)
      } else {
        return state.map(x =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        )
      }
      break

    default:
      return state
      break
  }
}

export default handleCart
