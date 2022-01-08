import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import landingPageImg from '../assets/landingPageImg.jpg'

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
            <section
                style={{
                    marginTop: "100px",
                    backgroundImage: `url(${landingPageImg})`,
                    filter: "brightness(100%)",
                    backgroundSize: "cover",
                    width: "500px",
                    height: "300px",
                    marginLeft: "28%",
                    borderRadius: "10px"
                }}>
                <h1
                    style={{
                        textAlign: "center",
                        color: "orange",
                        paddingTop: "40px",
                        fontWeight: "bold",
                    }}>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className='login-div'
                        style={{
                            textAlign: "center"
                        }}>
                        <input type="text" placeholder="username"
                            style={{
                                marginBottom: "10px"
                            }}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <br />
                        <input type="password" placeholder="password"
                            style={{
                                marginBottom: "10px"
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <br />
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </section>

            <section>
                <h6
                    style={{
                        paddingTop: "40px",
                        paddingBottom: "40px",
                        textAlign: "center"
                    }}>Don't have an account? <a href='/Signup'
                        style={{
                            color: "lightgreen"
                        }}>Signup</a></h6>
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
}
