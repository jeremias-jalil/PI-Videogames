import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import style from './Cards.module.css'

import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import Order from '../Order/Order';

export default function Cards({ games }) {


    const currentPage = useSelector(state => state.page)

    const [postPerPage, setPostPerPage] = useState(9)

    const indexLastPost = currentPage * postPerPage
    const indexFirstPost = indexLastPost - postPerPage
    const currentGame = games?.slice(indexFirstPost, indexLastPost)

    function handlePostPerPage(number){
        setPostPerPage(number)
    }

    return (
        <div className={style.contenedor}>
            <div className={style.order}>
                <Order handlePostPerPage={handlePostPerPage}/>
            </div>
            <div className={style.cards}>
                {currentGame?.map(e => <Card game={e} key={e.id}/>)}
            </div>

            <div className={style.pagination}>
                <Pagination totalGame={games.length} postPerPage={postPerPage} currentPage={currentPage} />
            </div>
        </div>)
}
