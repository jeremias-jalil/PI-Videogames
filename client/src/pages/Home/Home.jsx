import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import { useSelector, useDispatch } from 'react-redux';

import PageBase from '../PageBase/PageBase';
import SearchBar from '../../components/SearchBar/SearchBar'
import NavBar from '../../components/NavBar/NavBar'
import Cards from '../../components/Cards/Cards'

import { getAllGame } from '../../redux/actions'

export default function Home() {
    const { gamesBackUp, games } = useSelector(state => state)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllGame(gamesBackUp))
    }, [])


    return (
        <PageBase title='All your games' topBar={<SearchBar />} leftBar={<NavBar />} body={<Cards games={games} />} />

    )
}
