import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import landingPageImg from '../assets/landingPageImg.jpg'
import jwt from 'jsonwebtoken'

export const Login = ({ fn, ft }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const cred = {
            username: username,
            password: password
        }
        axios.post('https://tempusapi.herokuapp.com/db/login', cred)
            .then(res => {

                fn(res.data, true)

                let token = res.data
                let secret = process.env.REACT_APP_SECRET
                let result = jwt.verify(token, secret)


                let expireTime = result.exp * 1000
                const d = new Date()
                const t = d.getTime()

                expireTime = Math.floor((expireTime - t))
                // expireTime = 10000
                const timer = setTimeout(() => {
                    fn('', false)
                    alert("Session Expired Login again")
                }, expireTime)
                ft(timer)
                navigate("/profile")
            })
            .catch(err => {
                alert("invalid username or password")
                console.log(err)

            })

    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <section
                style={{
                    marginTop: "100px",
                    backgroundImage: `url(${landingPageImg})`,
                    filter: "brightness(100%)",
                    backgroundSize: "cover",
                    width: "500px",
                    height: "300px",
                    borderRadius: "10px"
                }}>
                <h1
                    style={{
                        textAlign: "center",
                        color: "orange",
                        textShadow: "0 0 6px black",
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

        </div>
    )
}
