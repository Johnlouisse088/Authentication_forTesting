import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/Authentication';

function Header() {
    const { userAuth, handleSubmitLogout } = useContext(AuthContext);
    return (
        <div>
            <Link to='/'>Homepage</Link>
            <span> | </span>
            {userAuth ? <button onClick={handleSubmitLogout}>Logout</button> : <Link to='/login'>Login</Link>}
        </div>
    )
}

export default Header


