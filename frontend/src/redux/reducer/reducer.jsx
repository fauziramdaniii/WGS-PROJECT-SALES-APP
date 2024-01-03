// reducer
import { combineReducers } from 'redux'
import cartReducer from './cartReducer' // Buat file cartReducer.js

const rootReducer = combineReducers({
  cart: cartReducer
  // Tambahkan reducer lain jika diperlukan
})

export default rootReducer
