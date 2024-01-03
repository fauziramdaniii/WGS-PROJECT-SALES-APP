// store.js
import { configureStore } from '@reduxjs/toolkit'
import rootReducers from './reducer/reducer'

const store = configureStore({
  reducer: rootReducers
})

export default store
