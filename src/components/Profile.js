import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DetailRecomm from './DetailRecomm'
import bgImg from '../assets/bgImg.jpg'
import { Navigate } from 'react-router-dom'
//import avatar from '../assets/avatar.png'
export const Profile = ({ token, tk }) => {
    useEffect(() => {
        async function getProfile() {
            try {
                let res = await axios.get("http://localhost:5001/db/profile", {
                    headers: {
                        authorization: `bearer ${tk}`
                    }
                })
                setResult(res.data[0])
                console.log(res.data)
                setFlag(true)
            }
            catch (error) {
                console.log(error);
            }

        }
        getProfile()
        async function getRecomm() {
            try {
                let res = await axios.get("http://localhost:5001/db/recomm", {
                    headers: {
                        authorization: `bearer ${tk}`
                    }
                })
                setRecomm(res.data)
                console.log(res.data)


            }
            catch (error) {
                console.log(error);
            }

        }
        getRecomm()
        async function getTime() {
            try {
                let res = await axios.get("http://localhost:5001/db/total_time", {
                    headers: {
                        authorization: `bearer ${tk}`
                    }
                })
                setTime(res.data[0])
                console.log("time date", res.data[0])


            }
            catch (error) {
                console.log(error);
            }

        }
        getTime()

    }, [])

    const [result, setResult] = useState([])
    const [recomm, setRecomm] = useState([])
    const [time, setTime] = useState([])
    const [flag, setFlag] = useState(false)
    var json = `"${result.created_on}"`
    var dateStr = JSON.parse(json)
    var date = new Date(dateStr)
    let year = date.getFullYear().toString()
    let month = (date.getMonth() + 1).toString()
    let day = date.getDate().toString()
    let d = day + "-" + month + "-" + year
    // var dateStr = JSON.parse(result.created_on);
    // var date = new Date(dateStr);
    function wastedShowTime(num) {
        var d = Math.floor(num / 1440);
        var h = Math.floor((num - (d * 1440)) / 60);
        var m = Math.round(num % 60);

        if (d > 0) {
            return (d + " days, " + h + " hours, " + m + " minutes");
        } else {
            return (h + " hours, " + m + " minutes");
        }
    }
    //let bannerUrl = "https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=A&size=100" 
    return (
        <div>
            {
                flag ? <div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundImage: `url(${bgImg})`,
                                height: "150px",
                                width: "100%"
                            }}>

                            <img
                                style={{
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    display: "flex",
                                    marginLeft: "50px"
                                }} src={`https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=${result.viewer_name}&size=100`} alt="ava" />
                            <div
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    marginLeft: "100px",
                                    color: "black"
                                }}>
                                <p
                                    style={{
                                        marginLeft: "-60px",
                                        marginTop: "15px",
                                        fontSize: "40px",
                                        color: "white",
                                        textShadow: "0 0 10px #000000"

                                    }}>{result.viewer_name.toUpperCase()}</p>
                            </div>
                            <a className='btn'
                                style={{
                                    height: "35px",
                                    marginLeft: "650px",
                                    marginTop: "90px"
                                }}
                                href='/WatchHistory'>WATCH HISTORY</a>
                        </div>
                        <p></p>
                        <p></p>
                        <h4>Date joined: {d}</h4>
                        <table
                            style={{
                                width: "60%",
                                marginTop: "30px"
                            }}>
                            <tr
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "20px"
                                }}>
                                <td>Count Parameters</td>
                                <td>Shows</td>
                                <td>Movies</td>
                            </tr>
                            <tr>
                                <td>Watchlist media</td>
                                <td>{result.tv_wishlisted}</td>
                                <td>{result.movie_wishlisted}</td>
                            </tr>
                            <tr>
                                <td>Watched media</td>
                                <td>{time.tv_watched}</td>
                                <td>{time.movie_watched}</td>
                            </tr>
                            <tr>
                                <td>Time consumed</td>
                                <td>{wastedShowTime(time.tv_time)}</td>
                                <td>{wastedShowTime(time.movie_time)}</td>
                            </tr>
                        </table>
                        <div>
                            <p
                                style={{
                                    marginTop: "30px",
                                    fontWeight: "bold",
                                    fontSize: "35px"
                                }}>Total watch time: {wastedShowTime(time.tv_time + time.movie_time)}</p>
                        </div>
                    </div>
                    <br></br>
                    <div>
                        <h2 style={{ textAlign: "center" }}>Recommendations:</h2>
                        <div>
                            {
                                recomm.map(details => {
                                    if (details.media_type === "tv" || details.media_type === "movie")
                                        return (

                                            <DetailRecomm key={details.entry_id} props={details} btn={"true"} token={token} tk={tk} />

                                        )

                                })
                            }
                        </div>
                    </div>
                </div> : <></>
            }
        </div>
    )
}