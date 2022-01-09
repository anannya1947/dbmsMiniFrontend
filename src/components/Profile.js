import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
    }, [])

    const [result, setResult] = useState([])
    const [flag, setFlag] = useState(false)
    return (
        <div>
            {
                flag ? <div>
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

                </div> : <></>
            }
        </div>
    )
}