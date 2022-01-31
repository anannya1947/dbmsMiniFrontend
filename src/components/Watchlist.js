import axios from 'axios'
import React, { useState, useEffect } from 'react'
import DetailWatchList from './DetailWatchList'

export const Watchlist = ({ token, tk }) => {
    const [flag, setFlag] = useState(false)
    const [result, setResult] = useState([])

    useEffect(() => {
        async function getWatch() {
            try {
                let res = await axios.get("https://tempusapi.herokuapp.com/db/add/1", {
                    headers: {
                        authorization: `bearer ${tk}`
                    }
                })
                setResult(res.data)
                setFlag(true)
            }
            catch (error) {
                console.log(error);
            }

        }
        getWatch()
    }, [])
    return (
        <div>
            <h1>Watchlist Page</h1>

            {
                flag ?
                    result.map(details => {
                        if (details.media_type === "tv" || details.media_type === "movie")
                            return (

                                <DetailWatchList key={details.id} props={details} btn={"true"} token={token} tk={tk} />

                            )

                    }) : <></>
            }
        </div>
    )
}
