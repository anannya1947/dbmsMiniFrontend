import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Detail from './Detail'
import bgImg from '../assets/bgImg.jpg'

function SearchReg({ token, tk }) {

    const submitForm = (event) => {
        event.preventDefault();
        const api = process.env.REACT_APP_API_KEY
        axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${api}&language=en-US&query=${field}&page=1&include_adult=false`)
            .then(res => {
                setResult(res.data)
                setFlag(true)
            })
            .catch(err => console.log(err))

        //     setTimeout(() => {
        //     if (result)
        //         setFlag(true)
        // }, 1000);
    }

    const [flag, setFlag] = useState(false)
    const [field, setField] = useState("")
    const [result, setResult] = useState([])

    return (
        <div>

            <form align="center" width="50%" margin-left="25%" onSubmit={submitForm}
                style={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundPositionX: "200px",
                    backgroundPositionY: "0px",
                    height: "180px"
                }}>
                <div className='pa2'>
                    <input style={{
                        height: "60px",
                        width: "250px",
                        textAlign: "center",
                        marginTop: "20px",
                    }} type='search'
                        placeholder='Search for Movies/Shows'
                        onChange={(e) => setField(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Search Database" className="btn btn-primary" />
                </div>
            </form>
            {
                flag ?
                    result.results.map(details => {
                        if (details.media_type === "tv" || details.media_type === "movie")
                            return (

                                <Detail key={details.id} props={details} btn={"true"} token={token} tk={tk} />

                            )

                    }) : <></>
            }



        </div>
    )
}

export default SearchReg
