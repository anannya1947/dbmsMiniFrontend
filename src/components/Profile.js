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
                console.log("tiem date", res.data[0])


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
                        <table
                            style={{
                                width: "100%",
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
                                <td>Time consumed(mins)</td>
                                <td>{time.tv_time}</td>
                                <td>{time.movie_time}</td>
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