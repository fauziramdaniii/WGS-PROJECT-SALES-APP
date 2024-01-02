import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/superadmin/home/Home'
import List from '../pages/superadmin/lists/List'
import Single from '../pages/superadmin/single/Single'
import ListLog from '../pages/admin/log/lists/listLog'
import withAuth from './WithAuth'

const Superadmin = () => {
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
      <Route path='log'>
        <Route index element={<ListLog />} />
        <Route path=':orderId' element={<Single />} />
      </Route>
    </Routes>
  )
}

export default withAuth(Superadmin)
