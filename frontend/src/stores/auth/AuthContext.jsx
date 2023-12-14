import React, { createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const storedUserRole = localStorage.getItem('roles')
    if (storedUserRole) {
      setUserRole(storedUserRole)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('roles')
    setUserRole(null)
  }

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
