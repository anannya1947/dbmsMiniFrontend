import React from 'react'

function Detail({ props }) {


    const type = props.media_type
    var title


    if (type === "tv" || type === "movie") {

        if (type === "tv") {
            title = props.name
            if (title === null)
                title = props.original_name
        }
        if (type === "movie") {
            title = props.title
            if (title === null)
                title = props.original_title
        }
    }
    const imgUrl = (props.backdrop_path) ? props.backdrop_path : props.poster_path

    return (

        <div className='bg-light-blue dib  br4 pd4 ma3 grow bw3 shadow=7'>
            <img alt='robots' src={`https://image.tmdb.org/t/p/w200/${imgUrl}`} />
            <div className=' f5 tc'>
                <h2>{title} </h2>
                <p>{props.media_type}</p>
            </div>
        </div>
    )
}

export default Detail
