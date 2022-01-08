import axios from 'axios'
import React, { useState, useEffect } from 'react'
import DetailWatch from './DetailWatch'

export const Watchlist = ({ token, tk }) => {
    const [flag, setFlag] = useState(false)
    const [result, setResult] = useState([])

    useEffect(() => {
        async function getWatch() {
            try {
                let res = await axios.get("http://localhost:5001/db/add", {
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

                                <DetailWatch key={details.id} props={details} btn={"true"} token={token} />

                            )

                    }) : <></>
            }
        </div>
    )
}
