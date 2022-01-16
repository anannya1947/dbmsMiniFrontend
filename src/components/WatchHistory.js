import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Detail from './Detail'
import bgImg from '../assets/bgImg.jpg'
import DetailHistory from './DetailHistory'

function WatchHistory({ tk }) {

    const submitForm = (event) => {
        event.preventDefault();
        const api = process.env.REACT_APP_API_KEY
        // axios.get(`http://localhost:5001/db/watch_history`, {
        //     headers: {
        //         authorization: `bearer ${tk}`
        //     }
        // })
        //     .then(res => {


        //         let day = date.substring(8, 10)
        //         let month = date.substring(5, 7)
        //         let year = date.substring(0, 4)

        //         let ds = month + "-" + day + "-" + year

        //         var dateH = new Date(ds);
        //         var json = JSON.stringify(dateH)


        //         const filter = res.data.filter(function (entry) {
        //             return `"${entry.timestamp}"` === json
        //         })



        //         setResult(filter)
        //         console.log("act result", result)

        //         setFlag(true)
        //     })
        //     .catch(err => console.log(err))

        let body = {
            date: date
        }
        axios.post(`http://localhost:5001/db/watch_history_get`, body, {
            headers: {
                authorization: `bearer ${tk}`
            }
        })
            .then(res => {
                setResult(res.data)
                console.log("TES:", res)
                setFlag(true)
            }

            ).catch(err => console.log(err))
    }

    const [flag, setFlag] = useState(false)
    const [date, setDate] = useState("")
    const [result, setResult] = useState([])

    // var json = `"${result.timestamp}"`
    // var dateStr = JSON.parse(json)
    // var date = new Date(dateStr)
    // let year = date.getFullYear().toString()
    // let month = (date.getMonth() + 1).toString()
    // let day = date.getDate().toString()
    // let d = day + "-" + month + "-" + year




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
                    }} type='date'
                        placeholder='Select date for watch_history'
                        onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Search Database" className="btn btn-primary" />
                </div>
            </form>
            <div>
                {
                    flag ?
                        result.map(details => {
                            if (details.media_type === "tv" || details.media_type === "movie")
                                return (

                                    <DetailHistory key={details.media_id} props={details} />

                                )

                        }) : <div></div>
                }
            </div>




        </div>
    )
}

export default WatchHistory
