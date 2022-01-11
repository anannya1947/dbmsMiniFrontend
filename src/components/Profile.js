import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DetailRecomm from './DetailRecomm'
import bgImg from '../assets/bgImg.jpg'
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
        var d = Math.floor(num / 1440); // 60*24
        var h = Math.floor((num - (d * 1440)) / 60);
        var m = Math.round(num % 60);

        if (d > 0) {
            return (d + " days, " + h + " hours, " + m + " minutes");
        } else {
            return (h + " hours, " + m + " minutes");
        }
    }
    return (
        <div>
            {
                flag ? <div
                    style={{
                        //backgroundImage: `url(${bgImg})`,
                        backgroundPositionX: "200px",
                        backgroundPositionY: "0px",
                        height: "180px"
                    }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row"
                            }}>
                            <div>
                                <p>User Name:
                                    {
                                        result.viewer_name
                                    }
                                </p>
                                <p>
                                    Date joined:
                                    {
                                        d
                                    }
                                </p>
                            </div>
                            <button className='btn'
                                style={{
                                    height: "35px"
                                }}>UPDATE PROFILE</button>
                        </div>
                        <table
                            style={{
                                width: "60%",
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
                    </div>
                    <br></br>
                    <div>
                        <h2>Recommendations</h2>
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