import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import style from './NavBar.module.css'
import { useHistory, Route } from 'react-router-dom';

import { getAllGenre, getAllPlatform, getAllGame, filterByGenre, filterBySource, filterByPlatform, setPage, resetFilters } from '../../redux/actions'
import getIconPlataforms from '../../functions/IcoRef/platformIcoRef'
import getIconGenre from '../../functions/IcoRef/genreIcoRef'
import getIconSource from '../../functions/IcoRef/sourceIcon'
import getIconAbout from '../../functions/IcoRef/aboutIconRef';
import FilterIcon from '../FilterIcon/FilterIcon'
import { source, dbList, backList, frontList, deploy, developer } from '../../functions/constants';


export default function NavBar() {

    const dispatch = useDispatch()
    const history = useHistory()

    const { platforms, genres, gamesBackUp } = useSelector(state => state)


    useEffect(() => {
        if (platforms.length === 0) {
            dispatch(getAllPlatform())
        }
        if (genres.length === 0) {
            dispatch(getAllGenre())
        }
        // eslint-disable-next-line
    }, [])

    function goHome(e) {
        e.preventDefault()
        history.push('/home')
        dispatch(setPage(1))
        dispatch(resetFilters())
        dispatch(getAllGame(gamesBackUp))
    }

    function addGame(e) {
        e.preventDefault()
        history.push('/newgame')
    }

    function about(e) {
        e.preventDefault()
        history.push('/about/Proyect')
    }

    return (
        <div className={style.contenedor}>
            <h2 onClick={(e) => goHome(e)}>Home</h2>
            <h2 onClick={(e) => addGame(e)}>Add Game</h2>
            <Route path='/home' >
                <FilterIcon title="Owner" list={source} iconConverter={getIconSource} filterAction={filterBySource} />
                <FilterIcon title="Platforms" list={platforms} iconConverter={getIconPlataforms} filterAction={filterByPlatform} />
                <FilterIcon title="Genres" list={genres} iconConverter={getIconGenre} filterAction={filterByGenre} />
            </Route>
            <Route path='/about' >
                <FilterIcon title="DataBase" list={dbList} iconConverter={getIconAbout} routeAction={'/about'} />
                <FilterIcon title="BackEnd" list={backList} iconConverter={getIconAbout} routeAction={'/about'} />
                <FilterIcon title="FrontEnd" list={frontList} iconConverter={getIconAbout} routeAction={'/about'} />
                <FilterIcon title="Deployment" list={deploy} iconConverter={getIconAbout} routeAction={'/about'} />
                <FilterIcon title="Developer" list={developer} iconConverter={getIconAbout} routeAction={'/about'} />
            </Route>
            <h2 onClick={(e) => about(e)}>About</h2>

        </div>
    )
}
