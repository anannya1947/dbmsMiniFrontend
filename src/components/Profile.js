import React from 'react'

export const Profile = ({ token }) => {
    return (
        <div>
            <h1>Profile </h1>
            <p>{token.name}</p>
            <p>{token.id}</p>

        </div>
    )
}