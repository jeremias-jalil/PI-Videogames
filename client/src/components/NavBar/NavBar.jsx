import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import style from './NavBar.module.css'

import { getAllGenre, getAllPlatform } from '../../redux/actions'
import getIconPlataforms from '../../functions/IcoRef/platformIcoRef'
import getIconGenre from '../../functions/IcoRef/genreIcoRef';
import FilterIcon from '../FilterIcon/FilterIcon'

export default function NavBar() {
    
    const dispatch = useDispatch()

    const platforms = useSelector(state => state.platforms)
    const genre = useSelector(state => state.genres)

    useEffect(() => {
        dispatch(getAllPlatform())
        dispatch(getAllGenre())
    },[])



    return (
        <div className={style.contenedor}>
            NavBar
            <FilterIcon title="Platforms" list={platforms} iconConverter={getIconPlataforms} filter="Platforms"/>
            <FilterIcon title="Genre" list={genre} iconConverter={getIconGenre} filter="Genre"/>
        </div>
    )
}
