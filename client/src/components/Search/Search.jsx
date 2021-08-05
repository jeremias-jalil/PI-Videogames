import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { getGameByName } from '../../redux/actions';

export default function Search() {

    const dispatch = useDispatch()
    const [searchWord, setSearchWord] = useState("")
    
    function submit(e){
        e.preventDefault()
        dispatch(getGameByName(searchWord))
        setSearchWord('')
    }


    return (
        <div>
            <form onSubmit={(e)=>submit(e)}>
                <input value={searchWord} onChange={(e)=>setSearchWord(e.target.value)}/>
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}
