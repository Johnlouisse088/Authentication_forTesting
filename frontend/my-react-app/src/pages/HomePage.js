import React, { useContext } from 'react'
import { AuthContext } from '../Context/Authentication'

function HomePage() {
    const { userAuth } = useContext(AuthContext)
    return (
        <div>
            {userAuth && <p>Hello {userAuth.username}</p>}
            <p>You are now in HomePage</p>
        </div>
    )
}

export default HomePage


