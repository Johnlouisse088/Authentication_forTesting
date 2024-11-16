import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'


function PrivateRoute({ Component }) {

    const authenticated = false
    return authenticated ? <Component /> : <Navigate to='/login' />;
}

export default PrivateRoute
