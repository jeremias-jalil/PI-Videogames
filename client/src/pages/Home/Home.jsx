import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import { useSelector, useDispatch } from 'react-redux';

import SearchBar from '../../components/SearchBar/SearchBar'
import NavBar from '../../components/NavBar/NavBar'
import Cards from '../../components/Cards/Cards'

import { getAllGame } from '../../redux/actions'

export default function Home() {

    const games = useSelector(state => state.games)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllGame())
    },[])

    return (
        <div className={style.home}>
            <div className={style.searchBar}>
                <SearchBar />
            </div>
            <div className={style.navBar}>
                <NavBar />
            </div>
            <div className={style.cards}>
                <h1>All your games</h1>
                <Cards games={games} />
            </div>
        </div>
    )
}
