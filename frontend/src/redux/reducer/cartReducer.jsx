// cart reducer
const initialState = {
  cartItems: []
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      }
    case 'GET_CART_SUCCESS':
      return {
        ...state,
        cartItems: action.payload
      }
    case 'INCREMENT_ITEM_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

    case 'DECREMENT_ITEM_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      }

    default:
      return state
  }
}

export default cartReducer
