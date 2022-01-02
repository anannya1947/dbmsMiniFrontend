import React from 'react'

export const Profile = ({ token }) => {
    return (
        <div>
            <h1>Profile </h1>
            <p>{token.username}</p>
            <p>{token.auth}</p>
            <p>{token.id}</p>

        </div>
    )
}