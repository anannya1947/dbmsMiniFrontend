import axios from 'axios'
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import "./detail.css"
import { GlobalContext } from '../context/GlobalState'
import { Watchlist } from './Watchlist'

function Detail({ props, btn }) {

    const { addMovieToWatchlist, watchlist } = useContext(GlobalContext)

    //let storedMovie = watchlist.find(o => o.id === props.id)
    //const watchlistDisabled = storedMovie? true: false
    const [media, setMedia] = useState({})
    const api = process.env.REACT_APP_API_KEY
    const type = props.media_type
    var media_id = props.id


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
            title = props.name
            let epRunTime = media.episode_run_time
            let noOfEp = media.number_of_episodes
            duration = epRunTime * noOfEp
            if (title === null)
                title = props.original_name
        }
        if (type === "movie") {
            title = props.title
            duration = media.runtime
            if (title === null)
                title = props.original_title
        }
    }
    const imgUrl = (props.backdrop_path) ? props.backdrop_path : props.poster_path
    const whichone = (props.backdrop_path) ? "backdrop" : "poster"
    return (

        <div className=' standard bg-blue dib br4  pd4 ma3 grow bw3 shadow=7'>


            <img className={`${whichone}`} alt='Not Available' src={`https://image.tmdb.org/t/p/original/${imgUrl}`} />

            <div className=' f5 tc'>
                <h4>{title} </h4>
                <p>{props.media_type}</p>
                <p>{duration} min  </p>
                {btn ? <button 
                        className='btn'
                        //disabled={watchlistDisabled} 
                        onClick={()=> <Watchlist props={props}/>}
                        >Watch</button> : <></>}
            </div>
        </div>
    )
}

export default Detail
