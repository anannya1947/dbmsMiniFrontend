import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Detail from './Detail'

function Search() {

    const submitForm = (event) => {
        event.preventDefault();
        axios.get(`https://api.themoviedb.org/3/search/multi?api_key=2866a6acd32642defa706bf7b57cf045&language=en-US&query=${field}&page=1&include_adult=false`)
            .then(res => setResult(res.data))
            .catch(err => console.log(err))
        setTimeout(() => {
            if (result)
                setFlag(true)
        }, 400);
    }

    const [flag, setFlag] = useState(false)
    const [field, setField] = useState("")
    const [result, setResult] = useState([])

    return (
        <div>

            <form align="center" width="50%" margin-left="25%" onSubmit={submitForm}>
                <div className='pa2'>
                    <input className='pa4 ba b--green bg-lightest-blue' type='search'
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
                        return (
                            <Detail key={details.id} props={details} />
                        )
                    }) : <></>
            }



        </div>
    )
}

export default Search
