import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="inner-content">
                    <div className="brand">
                        <Link to="/">Watchlist</Link>
                    </div>

                    <ul className='nav-links'>
                        <li>
                            <Link to="/">Watch List</Link>
                        </li>

                        <li>
                            <Link to="/watched">Watched</Link>
                        </li>
                        <li>
                            <Link to="/search">Search</Link>
                        </li>

                        <li>
                            <Link to="/add" className='btn'>+ Add</Link>
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
