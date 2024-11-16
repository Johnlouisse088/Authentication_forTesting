import React, { useContext } from 'react'
import { AuthContext } from './../Context/Authentication';



function LoginPage() {
    const { handleSubmit, handleChange, userAuth, userForm } = useContext(AuthContext)

    return (
        <div>
            {userAuth && <p>Hello {userAuth.username}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    onChange={handleChange}
                    name='username'
                    value={userForm.username}
                    placeholder='Enter username'
                />
                <input
                    type='password'
                    onChange={handleChange}
                    name='password'
                    value={userForm.password}
                    placeholder='Enter password'
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
export default LoginPage




