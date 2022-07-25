import './common/common.css'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Login from './pages/login'
import Store from './pages/store'
import OrderHistory from './pages/order-history'
import Checkout from './pages/checkout'
import { useEffect, useState } from 'react'
import UserContext from './UserContext'

const App = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const userId = window.localStorage.getItem('user-id')
    if (userId) {
      setUser({ userId })
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          {user?.userId ? (
            <>
              <Route path='/' element={<Store />} />
              <Route path='/order-history' element={<OrderHistory />} />
              <Route path='/checkout' element={<Checkout />} />
            </>
          ) : (
            <>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </>
          )}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
