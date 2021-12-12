import React from 'react'

function Detail({ props }) {
    return (
        <div className='bg-light-blue dib  br4 pd4 ma3 grow bw3 shadow=7'>
            <img alt='robots' src={`https://image.tmdb.org/t/p/w200/${props.backdrop_path}`} />
            <div className=' f5 tc'>
                <h2>{props.original_title} </h2>
                <p>{props.media_type}</p>
            </div>
        </div>
    )
}

export default Detail
