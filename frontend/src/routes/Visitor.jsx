import React from 'react'
// import '../node_modules/font-awesome/css/font-awesome.min.css'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'

// import withAuth from './WithAuth'
import Home from '../pages/visitor/Home'
import Product from '../pages/visitor/Product'
import Products from '../pages/visitor/Products'
import AboutPage from '../pages/visitor/AboutPage'
import ContactPage from '../pages/visitor/ContactPage'
import Cart from '../pages/visitor/Cart'
import Login from '../pages/visitor/Login'
import Register from '../pages/visitor/Register'
import Checkout from '../pages/visitor/Checkout'
import PageNotFound from '../pages/visitor/PageNotFound'

const Visitor = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/product' element={<Products />} />
      <Route path='/product/:id' element={<Product />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='*' element={<PageNotFound />} />
      <Route path='/product/*' element={<PageNotFound />} />
    </Routes>
  )
}

export default Visitor