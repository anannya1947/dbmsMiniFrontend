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

    }, [])

    const [result, setResult] = useState([])
    const [recomm, setRecomm] = useState([])
    const [flag, setFlag] = useState(false)
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
                                result.created_on
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
                    </div>
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
                </div> : <></>
            }
        </div>
    )
}