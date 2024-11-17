import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../Context/Authentication';


function PrivateRoute({ Component }) {

    const { userAuth } = useContext(AuthContext)

    return userAuth ? <Component /> : <Navigate to='/login' />;
}

export default PrivateRoute
