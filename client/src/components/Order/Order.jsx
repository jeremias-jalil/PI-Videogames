import React, { useState } from 'react'
import { faSortAlphaDown, faSortAlphaDownAlt, faSortNumericDown, faSortNumericDownAlt, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from 'react-redux';

import style from './Order.module.css'

import { orderAlphAsc, orderAlphDes, orderRatingAsc, orderRatingDes, resetOrders } from '../../redux/actions';


export default function Order({ handlePostPerPage }) {
    const dispatch = useDispatch()

    const { orderAlph, orderRating } = useSelector(state => state)

    const [orderAlphMenu, setOrderAlpha] = useState(false)
    const [orderRatingMenu, setOrderRating] = useState(false)

    function handleOrderAlpha() {
        setOrderAlpha(!orderAlphMenu)
        setOrderRating(false)
    }
    function handleOrderRating() {
        setOrderRating(!orderRatingMenu)
        setOrderAlpha(false)
    }

    function reset(){
        dispatch(resetOrders())
        setOrderAlpha(false)
        setOrderRating(false)
    }

    return (
        <div className={style.contenedor} >
            <div className={style.ico}>
                <FontAwesomeIcon icon={faMinus} onClick={() => reset()} />
            </div>
            <div className={orderAlph ? style.icoActive : style.ico}>
                {!orderAlphMenu ? <FontAwesomeIcon icon={faSortAlphaDown} onClick={() => {
                    handleOrderAlpha()
                    dispatch(orderAlphAsc())
                }} /> :
                    <FontAwesomeIcon icon={faSortAlphaDownAlt} onClick={() => {
                        handleOrderAlpha()
                        dispatch(orderAlphDes())
                    }} />}
            </div>
            <div className={orderRating ? style.icoActive : style.ico}>
                {!orderRatingMenu ? <FontAwesomeIcon icon={faSortNumericDown} onClick={() => {
                    handleOrderRating()
                    dispatch(orderRatingAsc())
                }} /> :
                    <FontAwesomeIcon icon={faSortNumericDownAlt} onClick={() => {
                        handleOrderRating()
                        dispatch(orderRatingDes())
                    }} />}
            </div>
            <div className={style.ico}>
                <select name="Pagination" onChange={(e) => handlePostPerPage(e.target.value)} defaultValue="9">
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                </select>
            </div>
        </div>
    )
}
