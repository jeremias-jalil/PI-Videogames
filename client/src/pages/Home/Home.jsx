import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';

import PageBase from '../PageBase/PageBase';
import SearchBar from '../../components/SearchBar/SearchBar'
import NavBar from '../../components/NavBar/NavBar'
import Cards from '../../components/Cards/Cards'
import Loading from '../../components/Loading/Loading';

import { getAllGame } from '../../redux/actions'

export default function Home() {
    const { gamesBackUp, allGames, loading } = useSelector(state => state)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!loading){
        dispatch(getAllGame(gamesBackUp))} // eslint-disable-next-line
    }, [loading]) 

    return (
        <PageBase title='All your games' topBar={<SearchBar />} leftBar={<NavBar />} body={loading?<Loading/>:<Cards allGames={allGames} />} />

    )
}
