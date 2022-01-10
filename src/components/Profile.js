import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DetailRecomm from './DetailRecomm'
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
                flag ? <div>
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
                        <p>
                            Number of wishlisted movies:
                            {
                                result.movies_wishlisted
                            }
                        </p>
                        <p>
                            Number of wishlisted shows:
                            {
                                result.shows_wishlisted
                            }
                        </p>
                        <p>
                            Number of watched shows:
                            {
                                time.shows_watched
                            }
                        </p>
                        <p>
                            Number of watched movies:
                            {
                                time.movies_watched
                            }
                        </p>
                        <p>
                            Time wasted on shows:
                            {
                                time.tv_time
                            }
                        </p>
                        <p>
                            Time wasted on movies:
                            {
                                time.movie_time
                            }
                        </p>
                    </div>
                    <br></br>
                    <div>
                        <h2>Recommendations</h2>
                        <div>
                            {
                                recomm.map(details => {
                                    if (details.media_type === "tv" || details.media_type === "movie")
                                        return (

                                            <DetailRecomm key={details.entry_id} props={details} btn={"true"} token={token} />

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