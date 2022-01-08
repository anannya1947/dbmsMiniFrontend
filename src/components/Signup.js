import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import landingPageImg from '../assets/landingPageImg.jpg'

export const Signup = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState(0)

    const submitRegister = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:5001/db/register', {
            name: name,
            age: age,
            username: username,
            email: email,
            password: password,
        })
            .then(() => {
                alert("successful insert")
                navigate("/search")
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <section
                style={{
                    marginTop: "40px",
                    backgroundImage: `url(${landingPageImg})`,
                    filter: "brightness(100%)",
                    backgroundSize: "cover",
                    width: "600px",
                    height: "500px",
                    marginLeft: "28%",
                    borderRadius: "10px",
                    marginBottom: "60px"
                }}>
                <h1
                    style={{
                        textAlign: "center",
                        color: "orange",
                        paddingTop: "40px",
                        fontWeight: "bold",
                    }}>Register</h1>
                <form onSubmit={submitRegister}>
                    <div className='signup-div'
                        style={{
                            textAlign: "center"
                        }}>
                        <input
                            style={{
                                marginBottom: "10px"
                            }}
                            type="text" placeholder="name" onChange={(e) => {
                                setName(e.target.value)
                            }} />
                        <br />
                        <input
                            style={{
                                marginBottom: "10px"
                            }}
                            type="number" placeholder="age" onChange={(e) => {
                                setAge(e.target.value)
                            }} />
                        <br />
                        <input
                            style={{
                                marginBottom: "10px"
                            }}
                            type="text" placeholder="username" onChange={(e) => {
                                setUsername(e.target.value)
                            }} />
                        <br />
                        <input
                            style={{
                                marginBottom: "10px"
                            }}
                            type="email" placeholder="email" onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                        <br />
                        <input
                            style={{
                                marginBottom: "10px"
                            }}
                            type="password" placeholder="password" onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                        <br />
                        <input
                            style={{
                                marginBottom: "10px"
                            }}
                            type="submit" value="Register" className="btn btn-primary" />
                    </div>
                </form>
            </section>
            <section className="footer"
                style={{
                    left: "0",
                    bottom: "0",
                    width: "100%",
                    backgroundColor: "black",
                    color: "lightgreen",
                    textAlign: "center",
                    height: "70px",
                    paddingTop: "20px"
                }}>
                Copyright © 2022 by Tempus
            </section>

        </div>
    )
    //comment
}