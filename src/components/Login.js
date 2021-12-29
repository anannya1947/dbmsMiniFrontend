import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('user-info')){
            navigate.push("/add")
        }
    }, [])
    function login(){
        console.warn(email,password)
    }
    return (
        <div>
            <h1>Login</h1>
            <div className='login-div'>
                <input type="text" placeholder="email" 
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <br/>
                <input type="text" placeholder="password"
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <br/>
                <button className='btn' 
                        onClick={() => {
                            login()
                            navigate("/search")
                        }

                }>Login</button>
                <h6>Don't have an account? <a href='/Signup'>Signup</a></h6>
            </div>
        </div>
    )
}
