// Default And Authentication
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import withAuth from './WithAuth'

// Menu Users
import Home from '../pages/admin/users/home/Home'
import List from '../pages/admin/users/lists/List'
import Single from '../pages/admin/users/single/Single'

// Menu Category
import ListCategory from '../pages/admin/category/lists/ListCategory'

// Menu Product
import ListProduct from '../pages/admin/products/lists/ListProduct'

// Menu Order List
import ListOrder from '../pages/admin/orders/lists/ListOrder'

const Admin = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='users'>
        <Route index element={<List />} />
        <Route path=':userId' element={<Single />} />
      </Route>
      <Route path='category'>
        <Route index element={<ListCategory />} />
        <Route path=':userId' element={<Single />} />
      </Route>
      <Route path='product'>
        <Route index element={<ListProduct />} />
        <Route path=':productId' element={<Single />} />
      </Route>
      <Route path='order'>
        <Route index element={<ListOrder />} />
        <Route path=':orderId' element={<Single />} />
      </Route>
    </Routes>
  )
}

export default withAuth(Admin)
