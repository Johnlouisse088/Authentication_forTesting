
import React, { useState, createContext, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()

function Authentication({ children }) {

  const navigate = useNavigate()                // for redirection of the link

  const [authTokens, setAuthTokens] = useState(null)  // access and refresh tokens
  const [userAuth, setUserAuth] = useState(null)      // access token
  const [userForm, setUserForm] = useState({          // login form
    'username': '',
    'password': ''
  })
  const [error, setError] = useState(null)            // error message


  const handleChange = (event) => {
    const { name, value } = event.target
    setUserForm(currentForm => {
      return { ...currentForm, [name]: value }
    })
  }

  // login
  async function handleSubmitLogin(event) {
    event.preventDefault()
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm)
      })

      if (response.ok) {                                           // if the user successfully log-in
        setUserForm({ 'username': '', 'password': '' })            // reset the form
        const data = await response.json()
        localStorage.setItem('authTokens', JSON.stringify(data))   // set authTokens in local storage (obj to string)
        setAuthTokens(data)                                        // set access and refresh tokens in authTokens
        setUserAuth(jwtDecode(data.access))                        // set access token in userAuth
        navigate('/')                                              // redirect in homepage
      } else {                                             // if user failed to log-in
        const errorResponse = await response.json()
        setError(errorResponse.detail || 'Login Failed')   // set error if failed
        setUserForm({ 'username': '', 'password': '' })    // reset the form
      }
    } catch (error) {
      console.error(error)
    }
  }

  // logout 
  const handleSubmitLogout = () => {
    setUserAuth(null)
    setAuthTokens(null)
    localStorage.removeItem('authTokens')
    navigate('/login')
  }

  // refresh the tokens
  async function refreshTokens() {
    try {
      console.log('refreshed')
      const response = await fetch(`http://127.0.0.1:8000/api/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: authTokens.refresh })     // sending object from frontend to backend
      })
      if (response.ok) {                                          // successfully refresh the tokens
        const data = await response.json()
        setAuthTokens(data)                                       // set new access and refresh tokens in authTokens
        setUserAuth(jwtDecode(data.access))                       // set new access token in userAuth
        localStorage.setItem('authTokens', JSON.stringify(data))  // set new access token in local storage (obj to string)
      } else {                                              // refresh token has been expired
        handleSubmitLogout()                                // automatically log-out
        setError('Session expired. Please log-in again')    // set the error message
      }
    } catch (error) {
      console.error(error)
    }
  }

  // resetting the tokens every 5 seconds
  useEffect(() => {
    if (authTokens) {
      const interval = setInterval(refreshTokens, 5000)   // every 5 seconds the tokens will refresh
      return () => clearInterval(interval)                // clear the previous interval
    }
  }, [authTokens])

  // re-setting the states when browser reload
  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem('authTokens'))     // get the tokens from local storage
    if (tokens) {
      const { access, refresh } = tokens                              // destructuring the tokens
      const decodedToken = jwtDecode(access)                          // decode the access token using jwtDecode
      setAuthTokens(tokens)                                           // set again the authTokens
      setUserAuth(decodedToken)                                       // set again the userAuth
    }

  }, [])


  const contextData = {
    handleSubmitLogin: handleSubmitLogin,
    handleChange: handleChange,
    userAuth: userAuth,
    userForm: userForm,
    handleSubmitLogout: handleSubmitLogout,
    error: error
  }


  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}


export default Authentication