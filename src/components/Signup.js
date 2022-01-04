import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react'
import Axios from 'axios'

export const Signup = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState(0)

    const submitRegister = (e) =>{
        e.preventDefault()
        Axios.post('http://localhost:5001/db/register', {
            name: name,
            age : age,
            username: username,
            email: email,
            password: password,
          })
          .then(()=>{
            alert("successful insert")
            navigate("/search")
          })
          .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={submitRegister}>
            <div className='login-div'>
                <input type="text" placeholder="name" onChange={(e)=>{
                    setName(e.target.value)
                }}/>
                <br/>
                <input type="number" placeholder="age" onChange={(e)=>{
                    setAge(e.target.value)
                }}/>
                <br/>
                <input type="text" placeholder="username" onChange={(e)=>{
                    setUsername(e.target.value)
                }}/>
                <br/>
                <input type="email" placeholder="email" onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
                <br/>
                <input type="password" placeholder="password" onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <br/>
                <input type="submit" value="Register" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}