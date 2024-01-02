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

// Menu Log
import ListLog from '../pages/admin/log/lists/listLog'

// Menu Term n Condition
import ListTerm from '../pages/admin/termCondition/lists/ListTerm'

// Menu Setting/Config
import ListConfig from '../pages/admin/config/ListConfig'

const Admin = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='dashboard'>
        <Route index element={<Home />} />
      </Route>
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
      <Route path='log'>
        <Route index element={<ListLog />} />
        <Route path=':orderId' element={<Single />} />
      </Route>
      <Route path='term-condition'>
        <Route index element={<ListTerm />} />
        <Route path=':orderId' element={<Single />} />
      </Route>
      <Route path='setting'>
        <Route index element={<ListConfig />} />
      </Route>
    </Routes>
  )
}

export default withAuth(Admin)
