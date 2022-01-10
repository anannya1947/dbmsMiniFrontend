import React from 'react'
import tmdbLogo from '../assets/tmdbLogo.jpg'

function Footer() {
    return (

        <div className="footer"
            style={{
                position: "relative",
                bottom: "-700px",
                width: "100%",
                backgroundColor: "black",
                color: "lightgreen",
                textAlign: "center",
                height: "70px",
            }}>
            <img
                style={{
                    marginTop: "10px",
                    marginRight: "30px",
                    height: "45px",
                    width: "45px"
                }}
                src={tmdbLogo} alt="tmdb Logo"></img>
            Copyright © 2022 by Tempus
        </div >

    )
}

export default Footer
