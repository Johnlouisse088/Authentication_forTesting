import React, { useState, createContext } from 'react'
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext()

function Authentication({ children }) {
  const [userAuth, setUserAuth] = useState(null)
  const [userForm, setUserForm] = useState({
    'username': '',
    'password': ''
  })

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm)
      })
      if (response.ok) {
        const data = await response.json()
        setUserAuth(jwtDecode(data.access))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setUserForm(currentForm => {
      return { ...currentForm, [name]: value }
    })

  }

  const contextData = {
    handleSubmit: handleSubmit,
    handleChange: handleChange,
    userAuth: userAuth,
    userForm: userForm
  }


  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}

export default Authentication
