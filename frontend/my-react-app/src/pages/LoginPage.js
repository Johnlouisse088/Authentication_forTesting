import React, { useContext } from 'react'
import { AuthContext } from './../Context/Authentication';



function LoginPage() {
    const { name } = useContext(AuthContext)
    return (
        <div>
            <p>Hello {name}</p>
            <form>
                <input type='text' name='username' placeholder='Enter username' />
                <input type='password' name='password' placeholder='Enter password' />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default LoginPage




