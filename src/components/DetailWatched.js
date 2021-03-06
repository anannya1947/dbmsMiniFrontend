import axios from 'axios'
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import "./detail.css"
import { GlobalContext } from '../context/GlobalState'
import { Watchlist } from './Watchlist'

function DetailWatch({ props, btn, token, tk }) {

    const { addMovieToWatchlist, watchlist } = useContext(GlobalContext)

    function handleRemove() {
        setButton(false)
        let details = {
            entry_id: entry_id,
            status: 'watched',
            media_id: media_id,
            media_type: type,
            duration: duration,
            id: props.viewer_id
        }
        console.log("deatils:", details)

        axios.post("https://tempusapi.herokuapp.com/db/remove", details, {
            headers: {
                authorization: `bearer ${tk}`
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))

    }

    //let storedMovie = watchlist.find(o => o.id === props.id)
    //const watchlistDisabled = storedMovie? true: false
    const [media, setMedia] = useState({})
    const [button, setButton] = useState(btn)
    const api = process.env.REACT_APP_API_KEY
    const type = props.media_type
    var media_id = props.media_id
    var entry_id = props.entry_id

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
            if (!duration) {
                duration = 0
            }
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
                {button ? <button
                    className='btnR'

                    onClick={() => handleRemove()}
                >Remove</button> : <></>}
            </div>
        </div>
    )
}

export default DetailWatch
