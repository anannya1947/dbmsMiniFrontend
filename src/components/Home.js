import React, { useState } from 'react'
import landingPageImg from '../assets/landingPageImg.jpg'
import axios from 'axios'
import Detail from './Detail'

export const Home = () => {
    const trendingMedia = (event) => {
        event.preventDefault();
        const api = process.env.REACT_APP_API_KEY
        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${api}`)
            .then(res => {
                setTrending(res.data)
            })
            .catch(err => console.log(err))
    }

    const [trending, setTrending] = useState([])
    return ( 
        <div>          
        <section class="hero">
            <div class="bg_image"
                 style={{
                 top: "0px",
                 backgroundImage: `url(${landingPageImg})`,
                 backgroundSize: "cover",
                 filter: "brightness(100%)",
                 height: "80vh",
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
                    // borderStyle: "solid",
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
        </section>

  <section class="mov-cards"
   style={{
    top: "0px",
    height: "70vh",
    backgroundColor: "white"
    }}>
    <h1
    style={{
        color:"black",
        fontWeight: "bold",
        padding: "20px 20px"
    }}>Trending</h1>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* <Detail key={details.id} props={details} /> */}
    </div>
    {/* {
        flag ?
             trending.results.map(details => {
                 if ()
                        return (

                             <Detail key={details.id} props={details} btn={"true"} />

                        )

                }) : <></>
    } */}
  </section>

  <section className="footer"
            style={{
                left: "0",
                bottom: "0",
                width: "100%",
                backgroundColor: "black",
                color: "lightgreen",
                textAlign: "center",
                height: "70px",
                paddingTop: "20px"
            }}>
                Copyright © 2022 by Tempus
            </section>
  </div>  
    )
}