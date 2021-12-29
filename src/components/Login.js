import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Login = ({ fn }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleLogin() {

        const cred = {
            username: username,
            password: password
        }
        axios.post('http://localhost:5001/db/login', cred)
            .then(res => {

                fn(true, res.data)
                navigate("/watchlist")
            })
            .catch(err => console.log(err))

    }

    return (
        <div>
            <h1>Login</h1>
            <div className='login-div'>
                <input type="text" placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <input type="text" placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button className='btn'
                    onClick={() => {
                        handleLogin()
                    }
                    }>Login</button>
                <h6>Don't have an account? <a href='/Signup'>Signup</a></h6>
            </div>
        </div>
    )
}
