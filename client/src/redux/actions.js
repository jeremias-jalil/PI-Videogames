import {
    LOADING, ERROR, PAGE,
    GET_GAMES, GET_GAMES_BY_NAME, GET_GAMES_BY_ID,
    FILTER_BY_GENRE, FILTER_BY_SOURCE, FILTER_BY_PLATFORM,
    ORDER_ALPHABETICALLY_ASC, ORDER_ALPHABETICALLY_DES, ORDER_BY_RATING_ASC, ORDER_BY_RATING_DES
}  from './constants'
import { getAllGameApi } from '../functions/api'

export function getAllGame() {
    return (dispatch => (
        dispatch({ type: LOADING }),
        getAllGameApi()
            .then(res => {
                return (
                    dispatch({
                        type: GET_GAMES,
                        payload: res
                    }),
                    dispatch({ type: LOADING })
                )
            }
            )
            .catch(err => dispatch({ type: ERROR, payload: err }))
    ))
}

export function setPage(page){
    return (dispatch => dispatch({ type: PAGE, payload: page }))
}

export function orderAlphAsc(){
    
    return (dispatch => dispatch({ type: ORDER_ALPHABETICALLY_ASC }))
}

export function orderAlphDes(){
    
    return (dispatch => dispatch({ type: ORDER_ALPHABETICALLY_DES }))
}

export function orderRatingAsc(){
    
    return (dispatch => dispatch({ type: ORDER_BY_RATING_ASC }))
}

export function orderRatingDes(){
    
    return (dispatch => dispatch({ type: ORDER_BY_RATING_DES }))
}

