import React, { useState } from 'react'
import bgImg from '../assets/bgImg.jpg'
import { useNavigate } from 'react-router-dom'

function ProfileUpdate({ fn }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        // const cred = {
        //     username: username,
        //     password: password
        // }
        // axios.post('http://localhost:5001/db/login', cred)
        //     .then(res => {

        //         fn(res.data, true)
        //         navigate("/watchlist")
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         console.log(err.response.data)
        //     })

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
                    marginTop: "50px",
                    backgroundImage: `url(${bgImg})`,
                    filter: "brightness(100%)",
                    backgroundSize: "cover",
                    width: "500px",
                    height: "500px",
                    borderRadius: "10px"
                }}>
                <h1
                    style={{
                        textAlign: "center",
                        color: "yellow",
                        textShadow: "0 0 10px black",
                        paddingTop: "40px",
                        fontWeight: "bold",
                        marginTop: "-20px",
                        marginBottom: "40px"
                    }}>Update Profile Details</h1>
                <form onSubmit={handleLogin}>
                    <div className='login-div'
                        style={{
                            textAlign: "center"
                        }}>
                        <input type="text" placeholder="username"
                            style={{
                                marginBottom: "10px"
                            }}
                            // onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <br />

                        <input type="password" placeholder="password"
                            style={{
                                marginBottom: "10px"
                            }}
                            //onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <br />
                        <p
                            style={{
                                fontWeight: "bold",
                                color: "yellow",
                                marginTop: "35px"
                            }}>New Details</p>
                        <input type="text" placeholder="new username"
                            style={{
                                marginBottom: "10px"
                            }}
                            required />
                        <br />
                        <input type="password" placeholder="new password"
                            style={{
                                marginBottom: "10px"
                            }}
                            required
                        />
                        <br />
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </section>
        </div>
    )
}

export default ProfileUpdate
