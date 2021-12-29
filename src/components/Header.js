import React from 'react'
import { Link } from 'react-router-dom'

export const Header = ({ fn }) => {
    return (
        <header>
            <div className="container">
                <div className="inner-content">
                    <div className="brand">
                        <Link to="/">Tempus</Link>
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
                            <button className='btn'
                                onClick={() => {
                                    fn(false, {}, '')
                                }
                                }>Logout</button>
                        </li>







                    </ul>
                </div>
            </div>
        </header>
    )
}
