import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import PageBase from '../PageBase/PageBase'
import GameDetail from '../../components/GameDetail/GameDetail'
import SearchBar from '../../components/SearchBar/SearchBar'
import NavBar from '../../components/NavBar/NavBar'
import Loading from '../../components/Loading/Loading'

import { getGameById, resetGame } from '../../redux/actions';


export default function Game(props) {
    const id = props.match.params.id
    const { loading } = useSelector(state => state)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGameById(id))// eslint-disable-next-line
    }, [])

    useEffect(() => {
        return()=>{
            dispatch(resetGame())
        }// eslint-disable-next-line
    }, [])

    return (
        <PageBase title='Game detail' topBar={<SearchBar />} leftBar={<NavBar />} body={loading ? <Loading /> : <GameDetail id={id} />} />
    )
}
