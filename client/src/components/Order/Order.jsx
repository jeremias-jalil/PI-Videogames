import React, { useState } from 'react'
import { faSortAlphaDown, faSortAlphaDownAlt, faSortNumericDown, faSortNumericDownAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from 'react-redux';

import style from './Order.module.css'

import { orderAlphAsc, orderAlphDes, orderRatingAsc, orderRatingDes } from '../../redux/actions';


export default function Order({ handlePostPerPage }) {
    const dispatch = useDispatch()

    const [orderAlpha, setOrderAlpha] = useState(true)
    const [orderRating, setOrderRating] = useState(false)

    function handleOrderAlpha() {
        setOrderAlpha(!orderAlpha)
    }
    function handleOrderRating() {
        setOrderRating(!orderRating)
    }

    return (
        <div className={style.contenedor} >
            <div className={style.ico}>
                {orderAlpha ? <FontAwesomeIcon icon={faSortAlphaDown} onClick={() => (handleOrderAlpha(), dispatch(orderAlphAsc()))} /> :
                    <FontAwesomeIcon icon={faSortAlphaDownAlt} onClick={() => (handleOrderAlpha(), dispatch(orderAlphDes()))} />}
            </div>
            <div className={style.ico}>
                {orderRating ? <FontAwesomeIcon icon={faSortNumericDown} onClick={() => (handleOrderRating(), dispatch(orderRatingAsc()))} /> :
                    <FontAwesomeIcon icon={faSortNumericDownAlt} onClick={() => (handleOrderRating(), dispatch(orderRatingDes()))} />}
            </div>
            <div className={style.ico}>
                <select name="Pagination" onChange={(e)=>(handlePostPerPage(e.target.value),console.log(e))}>
                    <option value="6">6</option>
                    <option value="9" selected>9</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                </select>
            </div>
        </div>
    )
}
