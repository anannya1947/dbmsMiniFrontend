import axios from 'axios'
import React from 'react'
import { useState, useEffect, useContext, useRef } from 'react'
import "./detail.css"
import { GlobalContext } from '../context/GlobalState'
import { Watchlist } from './Watchlist'
import Menu from './Menu'

function DetailRecomm({ props, btn, token, tk }) {

    const { addMovieToWatchlist, watchlist } = useContext(GlobalContext)

    function handleAdd() {
        let date = new Date()
        let year = date.getFullYear().toString()
        let month = (date.getMonth() + 1).toString()
        let day = date.getDate().toString()
        let d = year + "-" + month + "-" + day
        let details = {
            title: title,
            imgurl: imgUrl,
            media_type: props.media_type,
            media_id: media.id,
            viewer_id: token.id,
            duration: duration,
            time: d,
            status: status
        }
        console.log(details)
        axios.post("http://localhost:5001/db/add", details)
            .then(res => {
                console.log(res)
                let rec = {
                    media_id: media.id,
                    media_type: props.media_type
                }
                let dur = {
                    media_type: props.media_type,
                    duration: duration
                }
                console.log("rewc:", rec)
                let del = {
                    recom_id: props.recom_id
                }
                let hist = {
                    media_type: props.media_type,
                    media_id: media_id
                }
                axios.post("http://localhost:5001/db/recommD", del, {
                    headers: {
                        authorization: `bearer ${tk}`
                    }
                }).then(resD => console.log('del from rec', resD))
                    .catch(errD => console.log("LETSEE:", errD))

                if (status === "watched") {
                    axios.post("http://localhost:5001/db/recomm", rec, {
                        headers: {
                            authorization: `bearer ${tk}`
                        }
                    }).then(res2 => console.log("sucess", res2))
                        .catch(error2 => console.log(error2))

                    axios.put("http://localhost:5001/db/duration", dur, {
                        headers: {
                            authorization: `bearer ${tk}`
                        }

                    }).then(res3 => console.log("success for duration", res3))
                        .catch(error3 => console.log(error3))
                    axios.post("http://localhost:5001/db/watch_history", hist, {
                        headers: {
                            authorization: `bearer ${tk}`
                        }
                    }).then(res4 =>
                        console.log("sucess in history entry", res4))
                        .catch(error4 => console.log(error4))
                }
                if (status === "watchlist") {
                    const wish = {
                        media_type: props.media_type
                    }
                    axios.put("http://localhost:5001/db/profile", wish, {
                        headers: {
                            authorization: `bearer ${tk}`
                        }

                    }).then(res4 => console.log("success for duration", res4))
                        .catch(error4 => console.log(error4))
                }

            })
            .catch(error => console.log(error))
    }

    //let storedMovie = watchlist.find(o => o.id === props.id)
    //const watchlistDisabled = storedMovie? true: false
    const [media, setMedia] = useState({})
    const [menu, setMenu] = useState(false)
    const [status, setStatus] = useState("")
    const [flag, setFlag] = useState(btn)
    const api = process.env.REACT_APP_API_KEY
    const type = props.media_type
    var media_id = props.recom_id
    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        handleAdd()
    }, [status])

    async function menuStatus(m, s) {
        console.log("status passd", s)
        setMenu(m)
        setStatus(s)
        console.log("status set:", status)
        // handleAdd()
    }
    useEffect(() => {

        async function getData() {
            if (props.media_type === "tv") {
                try {
                    const cData = await axios.get(`https://api.themoviedb.org/3/tv/${media_id}?api_key=${api}&language=en-US`)
                    setMedia(cData.data)
                    console.log(cData.data)
                } catch (err) {
                    console.log(err)
                }


            }
            if (props.media_type === "movie") {
                try {
                    const cData = await axios.get(`https://api.themoviedb.org/3/movie/${media_id}?api_key=${api}&language=en-US`)
                    setMedia(cData.data)
                    console.log(cData.data)
                } catch (err) {
                    console.log(err)
                }
            }
        }

        getData()

    }, [])

    var duration
    var title

    if (type === "tv" || type === "movie") {

        if (type === "tv") {
            title = media.name
            let epRunTime = 0
            if (Array.isArray(media.episode_run_time)) {
                epRunTime = media.episode_run_time[0]
            }
            else {
                epRunTime = media.episode_run_time
            }
            let noOfEp = media.number_of_episodes
            duration = epRunTime * noOfEp
            if (!duration) {
                duration = 0
            }
            if (title === null)
                title = media.original_name
        }
        if (type === "movie") {
            title = media.title
            duration = media.runtime
            if (title === null)
                title = media.original_title
        }
    }
    const imgUrl = (media.backdrop_path) ? media.backdrop_path : media.poster_path
    const whichone = (media.backdrop_path) ? "backdrop" : "poster"
    return (

        <div className=' standard bg-blue dib br4  pd4 ma3 grow bw3 shadow=7'>


            <img className={`${whichone}`} alt='Not Available' src={`https://image.tmdb.org/t/p/original/${imgUrl}`} />

            <div className=' f5 tc'>
                <h4>{title} </h4>
                <p>{props.media_type}</p>
                <p>{duration} min  </p>
                {flag ? <button
                    className='btn'
                    //disabled={watchlistDisabled} 
                    onClick={() => {
                        setFlag(false)
                        setMenu(true)
                    }}
                >ADD</button> : <></>}
                {
                    menu ? <Menu fn={menuStatus} /> : <></>
                }
            </div>
        </div>
    )
}

export default DetailRecomm
