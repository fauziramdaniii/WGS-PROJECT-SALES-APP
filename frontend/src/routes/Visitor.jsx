import ProductDetail from '../pages/users/products/ProductDetail'
import Landing from '../pages/users/landing/Landing'
import ProductList from '../pages/users/products/productList'
import Template from '../components/userVisitor/Template'

import React from 'react'
import { Routes, Route } from 'react-router-dom'
const Visitor = () => {
  return (
    <div>
      <Routes>
        <Template>
          <Route index element={<ProductList />} />
          <Route path=':productId' element={<ProductDetail />} />
          <Route index element={<Landing />} />
        </Template>
      </Routes>
    </div>
  )
}

export default Visitor
