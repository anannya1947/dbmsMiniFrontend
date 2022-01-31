import React from 'react'

function Menu({ fn }) {
    return (
        <div>
            <button className='btn' onClick={() => fn(false, "watched")}>Watched</button>
            <span>  </span>
            <button className='btn' onClick={() => fn(false, "watchlist")}>Watchlist</button>
        </div>
    )
}

export default Menu
