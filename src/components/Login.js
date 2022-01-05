import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Login = ({ fn }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const cred = {
            username: username,
            password: password
        }
        axios.post('http://localhost:5001/db/login', cred)
            .then(res => {

                fn(res.data, true)
                navigate("/watchlist")
            })
            .catch(err => {
                console.log(err)
                console.log(err.response.data)
            })

    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className='login-div'>
                    <input type="text" placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <br />
                    <input type="password" placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <input type="submit" value="Login" className="btn btn-primary" />
                    <h6>Don't have an account? <a href='/Signup'>Signup</a></h6>
                </div>
            </form>
        </div>
    )
}
