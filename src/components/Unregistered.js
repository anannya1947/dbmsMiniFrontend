import React from 'react'
import { Link } from 'react-router-dom'

export const Unregistered = () => {
    return (
        <header>
            <div className="container">
                <div className="inner-content">
                    <div className="brand">
                        <Link to="/home">Tempus</Link>
                    </div>

                    <ul className='nav-links'>

                        <li>
                            <Link to="/search">Search</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>

                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </header>
    )
}
