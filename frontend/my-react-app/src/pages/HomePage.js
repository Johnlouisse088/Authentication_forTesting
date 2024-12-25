import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/Authentication'

function HomePage() {
    const { userAuth, authTokens, handleSubmitLogout } = useContext(AuthContext)
    const [notes, setNotes] = useState([])

    useEffect(() => {
        console.log("Child useEffect")
        async function getData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/notes/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access)
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    setNotes(data)
                } else if (response.statusText === "Unauthorized") {
                    handleSubmitLogout()
                }

            } catch (error) {
                console.error(error)
            }
        }
        getData()
    }, [])

    return (
        <div>
            {userAuth && <p>Hello {userAuth.username}</p>}
            <h2>You are now in HomePage</h2>
            <p>Notes</p>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>{note.body}</li>
                ))}
            </ul>
        </div>
    )
}

export default HomePage


