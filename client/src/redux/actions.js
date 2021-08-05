import {
    LOADING, ERROR, PAGE, PLATFORMS, GENRE,
    GET_GAMES, GET_GAMES_BY_NAME, GET_GAMES_BY_ID,
    RESET_FILTER, FILTER_BY_GENRE, FILTER_BY_SOURCE, FILTER_BY_PLATFORM,
    ORDER_ALPHABETICALLY_ASC, ORDER_ALPHABETICALLY_DES, ORDER_BY_RATING_ASC, ORDER_BY_RATING_DES
} from './constants'

import { getAllGameApi, getAllGenreApi, getAllPlatformApi } from '../functions/api'


//------------  CONTEXT  -----> LOADING, ERROR, PAGE, PLATFORMS, GENRE,

export function setPage(page) {
    return (dispatch => dispatch({ type: PAGE, payload: page }))
}

export function getAllGenre() {
    return (dispatch => (

        getAllGenreApi()
            .then(res => {
                return (
                    dispatch({
                        type: GENRE,
                        payload: res
                    })

                )
            }
            )
            .catch(err => dispatch({ type: ERROR, payload: err }))
    ))
}

export function getAllPlatform() {
    return (dispatch => (

        getAllPlatformApi()
            .then(res => {
                return (
                    dispatch({
                        type: PLATFORMS,
                        payload: res
                    })

                )
            }
            )
            .catch(err => dispatch({ type: ERROR, payload: err }))
    ))
}


//------------  GET  --------> GET_GAMES, GET_GAMES_BY_NAME, GET_GAMES_BY_ID

export function getAllGame() {
    return (dispatch => {
        dispatch({ type: LOADING })
        getAllGameApi()
            .then(res => {

                dispatch({
                    type: GET_GAMES,
                    payload: res
                })
                dispatch({ type: LOADING })
            }
            )
            .catch(err => dispatch({ type: ERROR, payload: err }))
    })
}


//------------  FILTERS  -----> RESET_FILTER, FILTER_BY_GENRE, FILTER_BY_SOURCE, FILTER_BY_PLATFORM,

export function resetFilters() {

    return (
        dispatch => {
            dispatch({ type: LOADING })
            dispatch({ type: RESET_FILTER })
            dispatch({ type: LOADING })
        }
    )
}


export function filterByGenre(id) {

    return (
        dispatch => {
            dispatch({ type: LOADING })
            dispatch({ type: FILTER_BY_GENRE, payload: id })
            dispatch({ type: LOADING })
        }
    )
}

export function filterBySource(id) {

    return (dispatch => dispatch({ type: FILTER_BY_SOURCE, payload: id }))
}

export function filterByPlatform(id) {

    return (
        dispatch => {
            dispatch({ type: LOADING })
            dispatch({ type: FILTER_BY_PLATFORM, payload: id })
            dispatch({ type: LOADING })
        }
    )
}





//------------  ORDER  ---------> ORDER_ALPHABETICALLY_ASC, ORDER_ALPHABETICALLY_DES, ORDER_BY_RATING_ASC, ORDER_BY_RATING_DES
export function orderAlphAsc() {

    return (dispatch => dispatch({ type: ORDER_ALPHABETICALLY_ASC }))
}

export function orderAlphDes() {

    return (dispatch => dispatch({ type: ORDER_ALPHABETICALLY_DES }))
}

export function orderRatingAsc() {

    return (dispatch => dispatch({ type: ORDER_BY_RATING_ASC }))
}

export function orderRatingDes() {

    return (dispatch => dispatch({ type: ORDER_BY_RATING_DES }))
}


