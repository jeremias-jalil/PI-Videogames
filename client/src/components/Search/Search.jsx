import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import style from './Search.module.css'
import { useHistory } from 'react-router-dom';

import { getGameByName } from '../../redux/actions';

import { resetFilters, setPage } from '../../redux/actions';

export default function Search() {

    const dispatch = useDispatch()
    const history = useHistory()
    const [searchWord, setSearchWord] = useState("")
    
    function submit(e){
        e.preventDefault()
        dispatch(getGameByName(searchWord))
        setSearchWord('')
        dispatch(resetFilters())
        dispatch(setPage(1))
        history.push('/home')
    }


    return (
        <div className={style.contenedor}>
            <form onSubmit={(e)=>submit(e)}>
                <input value={searchWord} onChange={(e)=>setSearchWord(e.target.value)} placeholder='Search a game'/>
                <button type='submit'>Search</button>
            </form>
          
        </div>
    )
}
