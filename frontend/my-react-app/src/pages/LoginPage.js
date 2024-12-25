import React, { useContext, useEffect } from 'react'
import { AuthContext } from './../Context/Authentication';

function LoginPage() {
    const { handleSubmitLogin, handleChange, userForm, error } = useContext(AuthContext)

    // useEffect(() => {
    //     console.log("Child useEFfect")
    // })

    return (
        <div>
            {error && alert(error)}
            <form onSubmit={handleSubmitLogin}>
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







