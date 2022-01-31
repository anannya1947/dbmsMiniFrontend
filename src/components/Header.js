import React from 'react'
import { Link } from 'react-router-dom'

export const Header = ({ fn, t }) => {
    return (
        <header>
            <div className="container" style={{
                "-webkit-text-size-adjust": "100%"

            }}>
                <div className="inner-content">
                    <div className="brand" style={{
                        "padding": "18px"
                    }}>
                        <Link to="/">Tempus</Link>
                    </div>

                    <ul className='nav-links'>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/watchlist">Watch List</Link>
                        </li>

                        <li>
                            <Link to="/watched">Watched</Link>
                        </li>
                        <li>
                            <Link to="/searchReg">Search</Link>
                        </li>
                        <li>
                            <button className='btn'
                                onClick={() => {
                                    fn('', false)
                                    clearTimeout(t)
                                }
                                }>Logout</button>
                        </li>







                    </ul>
                </div>
            </div>
        </header >
    )
}
