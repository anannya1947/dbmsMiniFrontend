import React from 'react'

export const Watchlist = ({ token }) => {
    return (
        <div>
            <h1>Watchlist Page</h1>

            <p>{token.username}</p>
            <p>{token.id}</p>
        </div>
    )
}
