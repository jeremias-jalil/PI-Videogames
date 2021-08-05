import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import style from './NavBar.module.css'

import { getAllGenre, getAllPlatform, getAllGame } from '../../redux/actions'
import getIconPlataforms from '../../functions/IcoRef/platformIcoRef'
import getIconGenre from '../../functions/IcoRef/genreIcoRef';
import FilterIcon from '../FilterIcon/FilterIcon'

export default function NavBar() {
    
    const dispatch = useDispatch()

    const {platforms, genres, gamesBackUp} = useSelector(state => state)
    
    useEffect(() => {
        dispatch(getAllPlatform())
        dispatch(getAllGenre())
    },[])

   
    return (
        <div className={style.contenedor}>
            <a onClick={()=>dispatch(getAllGame(gamesBackUp))}>Home</a>
            <FilterIcon title="Platforms" list={platforms} iconConverter={getIconPlataforms} filter="Platforms"/>
            <FilterIcon title="Genres" list={genres} iconConverter={getIconGenre} filter="Genres"/>
        </div>
    )
}
