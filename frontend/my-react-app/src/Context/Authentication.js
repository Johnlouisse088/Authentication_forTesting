import React, { createContext } from 'react'

export const AuthContext = createContext()

function Authentication({ children }) {
  return (
    <AuthContext.Provider value={{ 'name': 'John' }}>
      {children}
    </AuthContext.Provider>
  )
}

export default Authentication
