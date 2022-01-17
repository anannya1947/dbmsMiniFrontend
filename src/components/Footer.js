import React from 'react'
import tmdbLogo from '../assets/tmdbLogo.jpg'
import tmdb from '../assets/download.jfif'
function Footer() {
    return (

        <div className="footer"
            style={{
                position: "relative",
                left: "0",
                bottom: "0",
                marginTop: "700px",
                width: "100%",
                backgroundImage: "radial-gradient(at 30% top, #031d33 0%, rgba(3,37,65) 70%)",
                color: "white",
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
                src={tmdb} alt="tmdb Logo"></img>
            Copyright © 2022 by Tempus
        </div >

    )
}

export default Footer
