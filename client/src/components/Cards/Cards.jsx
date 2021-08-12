import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import style from './Cards.module.css'

import { filter } from '../../functions/filters';
import { orderAlphFunc, orderRatingFunc } from '../../functions/orders';
import { setPage } from '../../redux/actions';

import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import Order from '../Order/Order';
import NoGameFound from '../NoGameFound/NoGameFound';

export default function Cards({ allGames }) {



    const dispatch = useDispatch()
    const { currentPage, platformFilter, genreFilter, sourceFilter, orderAlph, orderRating, loading } = useSelector(state => state)

    const [postPerPage, setPostPerPage] = useState(9)
    
    const indexLastPost = currentPage * postPerPage
    const indexFirstPost = indexLastPost - postPerPage
    
    const [games, setGames] = useState([...allGames])
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

        else if (orderAlph || orderRating) {
            setGames([...orderAlphFunc(games, orderAlph)])
            setGames([...orderRatingFunc(games, orderRating)])

        }

        else {
            setGames([...allGames])

        }// eslint-disable-next-line
    }, [platformFilter, genreFilter, sourceFilter, currentPage, loading, orderAlph, orderRating, games.length, postPerPage,allGames])

    useEffect(() => {
        setCurrentGame(games.slice(indexFirstPost, indexLastPost))
        setTotalGame(games.length)// eslint-disable-next-line
    }, [games,loading])


    function handlePostPerPage(number) {
        setPostPerPage(number)
        dispatch(setPage(1))
    }



    return (
        <div className={style.contenedor}>

            <div className={style.pagination}>
                <Pagination totalGame={totalGame} postPerPage={postPerPage} />
                <Order handlePostPerPage={handlePostPerPage} />
            </div>
            <div className={style.cards}>
                {currentGame.length > 0 ? currentGame?.map(e => <Card game={e} key={e.id} />) : <NoGameFound />}
            </div>

        </div>)
}
