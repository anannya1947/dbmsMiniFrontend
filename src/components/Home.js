import React, { useState, useEffect } from 'react'
import landingPageImg from '../assets/landingPageImg.jpg'
import axios from 'axios'
import Detail from './Detail'

export const Home = () => {
    useEffect(() => {
        const trendingMedia = () => {
            const api = process.env.REACT_APP_API_KEY
            axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${api}`)
                .then(res => {
                    console.log(res.data)
                    setTrending(res.data.results)
                    setFlag(true)
                })
                .catch(err => console.log(err))
        }
        trendingMedia()
    }, [])
    const [trending, setTrending] = useState([])
    const [flag, setFlag] = useState(false)
    return (
        <div>
            <div class="hero">
                <div class="bg_image"
                    style={{
                        top: "0px",
                        backgroundImage: `url(${landingPageImg})`,
                        backgroundSize: "cover",
                        filter: "brightness(100%)",
                        height: "45vh",
                        color: "#f5f5f5",
                    }}>
                    <div class="hero-content-area"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "orange",
                            filter: "brightness(100%)",
                            backgroundColor: "white",
                            padding: "0px 10px 10px 10px",
                            borderRadius: "15px",
                            borderStyle: "solid",
                            textAlign: "center",
                            fontFamily: "font-family: 'Work Sans', sans-serif;"
                        }}>
                        <h1
                            style={{
                                fontWeight: "bold",
                                fontSize: "60px",
                                textAlign: "center"
                            }}>Welcome.</h1>
                        <h3>Keep track of what you watch</h3>
                        <a href="/search" class="btn">Search</a>
                    </div>
                </div>
            </div>

            <div class="mov-cards"
                style={{
                    top: "0px",
                    //backgroundColor: "white"
                }}>
                <h1
                    style={{
                        fontWeight: "bold",
                        padding: "5px 5px"
                    }}>Trending</h1>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {/* <Detail key={details.id} props={details} /> */}
                </div>
                {
                    flag ?
                        trending.map(details => {
                            if (details.media_type === "tv" || details.media_type === "movie")
                                return (

                                    <Detail key={details.id} props={details} />

                                )

                        }) : <></>
                }
            </div>
        </div>
    )
}