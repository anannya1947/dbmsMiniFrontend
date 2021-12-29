import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Register</h1>
            <div className='login-div'>
                <input type="text" placeholder="name"/>
                <br/>
                <input type="text" placeholder="username"/>
                <br/>
                <input type="text" placeholder="email"/>
                <br/>
                <input type="text" placeholder="password"/>
                <br/>
                <input type="text" placeholder="re-enter password"/>
                <br/>
                <button className='btn' 
                        onClick={() => {
                            navigate("/search")
                        }
                }>Submit</button>
                </div>
        </div>
    )
}
