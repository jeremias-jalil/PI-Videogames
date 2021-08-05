import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import style from './Cards.module.css'

import { filter } from '../../functions/filters';
import { orderAlphFunc, orderRatingFunc } from '../../functions/orders';

import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import Order from '../Order/Order';

export default function Cards({ games }) {


    const { currentPage, platformFilter, genreFilter, sourceFilter, orderAlph, orderRating, loading } = useSelector(state => state)


    const [postPerPage, setPostPerPage] = useState(9)
   
    const indexLastPost = currentPage * postPerPage
    const indexFirstPost = indexLastPost - postPerPage
   
    const [currentGame, setCurrentGame] = useState(games.slice(indexFirstPost, indexLastPost))
    const [totalGame, setTotalGame] = useState(games.length)


    useEffect(() => {

        async function set() {
            let gameFilter = await filter(games, platformFilter, genreFilter, sourceFilter)
            gameFilter = orderAlphFunc(gameFilter, orderAlph)
            gameFilter = orderRatingFunc(gameFilter, orderRating)
            setCurrentGame(gameFilter.slice(indexFirstPost, indexLastPost))
            setTotalGame(gameFilter.length)
        }
        if (platformFilter || genreFilter || sourceFilter) {
            set()
        }
        else {
            games = orderAlphFunc(games, orderAlph)
            games = orderRatingFunc(games, orderRating)
            setCurrentGame(games.slice(indexFirstPost, indexLastPost))
            setTotalGame(games.length)
        }

    }, [platformFilter, genreFilter, sourceFilter, currentPage, loading, orderAlph, orderRating, games.length])

    function handlePostPerPage(number) {
        setPostPerPage(number)
    }

    return (
        <div className={style.contenedor}>
            <div className={style.order}>
                <Order handlePostPerPage={handlePostPerPage} />
            </div>
            <div className={style.cards}>
                {currentGame.length > 0 ? currentGame?.map(e => <Card game={e} key={e.id} />) : <h3>No game found</h3>}
            </div>

            <div className={style.pagination}>
                <Pagination totalGame={totalGame} postPerPage={postPerPage} />
            </div>
        </div>)
}
