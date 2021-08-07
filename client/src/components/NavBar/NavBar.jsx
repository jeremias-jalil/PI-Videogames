import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import style from './NavBar.module.css'
import { useHistory, Route } from 'react-router-dom';

import { getAllGenre, getAllPlatform, getAllGame } from '../../redux/actions'
import getIconPlataforms from '../../functions/IcoRef/platformIcoRef'
import getIconGenre from '../../functions/IcoRef/genreIcoRef'
import getIconSource from '../../functions/IcoRef/sourceIcon'
import FilterIcon from '../FilterIcon/FilterIcon'

export default function NavBar() {

    const dispatch = useDispatch()
    const history = useHistory()

    const { platforms, genres, gamesBackUp } = useSelector(state => state)


    useEffect(() => {
        dispatch(getAllPlatform())
        dispatch(getAllGenre())
    }, [])

    const source = [
        { id: 'api' },
        { id: 'db' },
    ]

    function goHome(e) {
        e.preventDefault()
        history.push('/home')
        dispatch(getAllGame(gamesBackUp))

    }

    function addGame(e) {
        e.preventDefault()
        history.push('/newgame')
    }

    return (
        <div className={style.contenedor}>
            <h2 onClick={(e) => goHome(e)}>Home</h2>
            <h2 onClick={(e) => addGame(e)}>Add Game</h2>
            <Route path='/home' >
                <FilterIcon title="Owner" list={source} iconConverter={getIconSource} filter="Source" />
                <FilterIcon title="Platforms" list={platforms} iconConverter={getIconPlataforms} filter="Platforms" />
                <FilterIcon title="Genres" list={genres} iconConverter={getIconGenre} filter="Genres" />
            </Route>
        </div>
    )
}
